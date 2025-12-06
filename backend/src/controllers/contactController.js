import { validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import Company from '../models/Company.js';
import { AppError, catchAsync } from '../middleware/errorHandler.js';

/**
 * @route   GET /api/admin/inquiries
 * @desc    Get all customer inquiries (paginated, with filters)
 * @access  Private
 */
export const getAllInquiries = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const isRead = req.query.isRead;
  const service = req.query.service;

  // Build query
  const query = { companyId: req.user.companyId };
  
  if (isRead !== undefined) {
    query.isRead = isRead === 'true';
  }
  
  if (service) {
    query.service = service;
  }

  // Get total count
  const total = await Contact.countDocuments(query);

  // Get inquiries
  const inquiries = await Contact.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    data: {
      inquiries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

/**
 * @route   GET /api/admin/inquiries/:id
 * @desc    Get single inquiry details
 * @access  Private
 */
export const getInquiryById = catchAsync(async (req, res, next) => {
  const inquiry = await Contact.findOne({
    _id: req.params.id,
    companyId: req.user.companyId
  });

  if (!inquiry) {
    return next(new AppError('Inquiry not found', 404));
  }

  res.status(200).json({
    success: true,
    data: {
      inquiry
    }
  });
});

/**
 * @route   PUT /api/admin/inquiries/:id/read
 * @desc    Mark inquiry as read
 * @access  Private
 */
export const markAsRead = catchAsync(async (req, res, next) => {
  const inquiry = await Contact.findOne({
    _id: req.params.id,
    companyId: req.user.companyId
  });

  if (!inquiry) {
    return next(new AppError('Inquiry not found', 404));
  }

  inquiry.isRead = true;
  await inquiry.save();

  res.status(200).json({
    success: true,
    data: {
      inquiry
    }
  });
});

/**
 * @route   DELETE /api/admin/inquiries/:id
 * @desc    Delete inquiry
 * @access  Private
 */
export const deleteInquiry = catchAsync(async (req, res, next) => {
  const inquiry = await Contact.findOne({
    _id: req.params.id,
    companyId: req.user.companyId
  });

  if (!inquiry) {
    return next(new AppError('Inquiry not found', 404));
  }

  await inquiry.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Inquiry deleted successfully'
  });
});

/**
 * @route   POST /api/public/contact
 * @desc    Submit customer inquiry
 * @access  Public
 */
export const submitContact = catchAsync(async (req, res, next) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const { companyId, name, email, phone, message, service } = req.body;

  // Validate companyId exists
  const company = await Company.findById(companyId);
  
  if (!company) {
    return next(new AppError('Company not found', 404));
  }

  // Validate service category
  const validServices = ['radium-cutting', 'printing', 'banners', 'car-glass', 'logo-design', 'boards'];
  if (!validServices.includes(service)) {
    return next(new AppError('Invalid service category', 400));
  }

  // Create contact inquiry
  const contact = await Contact.create({
    companyId,
    name,
    email,
    phone,
    message,
    service,
    isRead: false
  });

  res.status(201).json({
    success: true,
    message: 'Your inquiry has been submitted successfully. We will contact you soon.',
    data: {
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email
      }
    }
  });
});
