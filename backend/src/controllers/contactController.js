import Contact from '../models/Contact.js';
import { validationResult } from 'express-validator';
import { sendContactNotification } from '../services/emailService.js';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, phone, service, message } = req.body;

    // Get client info
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    // Create new contact
    const contact = await Contact.create({
      name,
      email,
      phone,
      service,
      message,
      ipAddress,
      userAgent
    });

    // Send notification email to admin (don't wait for it)
    sendContactNotification(contact).catch(err => {
      console.error('Email notification failed:', err.message);
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you within 24 hours.',
      data: {
        id: contact._id,
        submittedAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get all contacts (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
export const getAllContacts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      service,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = {};
    
    if (status) query.status = status;
    if (service) query.service = service;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const contacts = await Contact.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get single contact (Admin only)
// @route   GET /api/contact/:id
// @access  Private/Admin
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update contact status (Admin only)
// @route   PUT /api/contact/:id
// @access  Private/Admin
export const updateContact = async (req, res) => {
  try {
    const { status, priority, notes } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, priority, notes },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Delete contact (Admin only)
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });

  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
