import Quote from '../models/Quote.js';
import { validationResult } from 'express-validator';
import { sendQuoteNotification } from '../services/emailService.js';

// @desc    Submit quote request
// @route   POST /api/quotes
// @access  Public
export const submitQuote = async (req, res) => {
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

    const { name, phone, email, service, description } = req.body;

    // Get client info
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    // Handle file upload if present
    let imageData = null;
    if (req.file) {
      imageData = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        // For now, store local file path. Later we'll integrate Cloudinary
        cloudinaryUrl: `/uploads/${req.file.filename}`,
        cloudinaryPublicId: req.file.filename
      };
    }

    // Create new quote request
    const quote = await Quote.create({
      name,
      phone,
      email,
      service,
      description,
      image: imageData,
      ipAddress,
      userAgent
    });

    // Send notification email to admin (don't wait for it)
    sendQuoteNotification(quote).catch(err => {
      console.error('Quote notification email failed:', err.message);
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your quote request! We will review it and get back to you within 24 hours.',
      data: {
        id: quote._id,
        quoteNumber: quote.quoteNumber,
        submittedAt: quote.createdAt
      }
    });

  } catch (error) {
    console.error('Quote submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit quote request. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get all quotes (Admin only)
// @route   GET /api/quotes
// @access  Private/Admin
export const getAllQuotes = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      service,
      priority,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = {};
    
    if (status) query.status = status;
    if (service) query.service = service;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const quotes = await Quote.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const total = await Quote.countDocuments(query);

    res.status(200).json({
      success: true,
      data: quotes,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get quotes error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quotes',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get single quote (Admin only)
// @route   GET /api/quotes/:id
// @access  Private/Admin
export const getQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    res.status(200).json({
      success: true,
      data: quote
    });

  } catch (error) {
    console.error('Get quote error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quote',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update quote (Admin only)
// @route   PUT /api/quotes/:id
// @access  Private/Admin
export const updateQuote = async (req, res) => {
  try {
    const { 
      status, 
      priority, 
      estimatedPrice, 
      estimatedDuration, 
      adminNotes,
      followUpDate
    } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (estimatedPrice) updateData.estimatedPrice = estimatedPrice;
    if (estimatedDuration) updateData.estimatedDuration = estimatedDuration;
    if (adminNotes) updateData.adminNotes = adminNotes;
    if (followUpDate) updateData.followUpDate = new Date(followUpDate);

    // Set quote sent timestamp when status changes to 'quoted'
    if (status === 'quoted' && req.body.status !== 'quoted') {
      updateData.quoteSentAt = new Date();
    }

    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Quote updated successfully',
      data: quote
    });

  } catch (error) {
    console.error('Update quote error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update quote',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Delete quote (Admin only)
// @route   DELETE /api/quotes/:id
// @access  Private/Admin
export const deleteQuote = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    // TODO: Delete associated file from Cloudinary if exists

    res.status(200).json({
      success: true,
      message: 'Quote deleted successfully'
    });

  } catch (error) {
    console.error('Delete quote error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete quote',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
