import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validationResult } from 'express-validator';
import Gallery from '../models/Gallery.js';
import { AppError, catchAsync } from '../middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @route   GET /api/admin/gallery
 * @desc    Get all gallery images for admin's company (paginated)
 * @access  Private
 */
export const getAllGallery = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const category = req.query.category;
  const isPublished = req.query.isPublished;

  // Build query
  const query = { companyId: req.user.companyId };
  
  if (category) {
    query.category = category;
  }
  
  if (isPublished !== undefined) {
    query.isPublished = isPublished === 'true';
  }

  // Get total count
  const total = await Gallery.countDocuments(query);

  // Get gallery items
  const gallery = await Gallery.find(query)
    .populate('createdBy', 'fullName email')
    .sort({ displayOrder: 1, createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    data: {
      gallery,
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
 * @route   POST /api/admin/gallery
 * @desc    Upload new gallery image
 * @access  Private
 */
export const createGallery = catchAsync(async (req, res, next) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  if (!req.file) {
    return next(new AppError('Please upload an image file', 400));
  }

  const { title, description, category, displayOrder, isPublished } = req.body;

  // Validate category
  const validCategories = ['radium-cutting', 'printing', 'banners', 'car-glass', 'logo-design', 'boards'];
  if (!validCategories.includes(category)) {
    return next(new AppError('Invalid category', 400));
  }

  // Create gallery item
  const gallery = await Gallery.create({
    companyId: req.user.companyId,
    title,
    description,
    imageUrl: req.file.path,
    category,
    displayOrder: displayOrder || 0,
    isPublished: isPublished === 'true' || isPublished === true,
    createdBy: req.user.id
  });

  await gallery.populate('createdBy', 'fullName email');

  res.status(201).json({
    success: true,
    data: {
      gallery
    }
  });
});

/**
 * @route   GET /api/admin/gallery/:id
 * @desc    Get single gallery image details
 * @access  Private
 */
export const getGalleryById = catchAsync(async (req, res, next) => {
  const gallery = await Gallery.findOne({
    _id: req.params.id,
    companyId: req.user.companyId
  }).populate('createdBy', 'fullName email');

  if (!gallery) {
    return next(new AppError('Gallery image not found', 404));
  }

  res.status(200).json({
    success: true,
    data: {
      gallery
    }
  });
});

/**
 * @route   PUT /api/admin/gallery/:id
 * @desc    Update gallery image
 * @access  Private
 */
export const updateGallery = catchAsync(async (req, res, next) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const gallery = await Gallery.findOne({
    _id: req.params.id,
    companyId: req.user.companyId
  });

  if (!gallery) {
    return next(new AppError('Gallery image not found', 404));
  }

  const { title, description, category, displayOrder, isPublished } = req.body;

  // Update fields
  if (title) gallery.title = title;
  if (description !== undefined) gallery.description = description;
  if (category) {
    const validCategories = ['radium-cutting', 'printing', 'banners', 'car-glass', 'logo-design', 'boards'];
    if (!validCategories.includes(category)) {
      return next(new AppError('Invalid category', 400));
    }
    gallery.category = category;
  }
  if (displayOrder !== undefined) gallery.displayOrder = displayOrder;
  if (isPublished !== undefined) gallery.isPublished = isPublished === 'true' || isPublished === true;

  // Handle new image upload if provided
  if (req.file) {
    // Delete old image file
    if (gallery.imageUrl) {
      const oldImagePath = path.join(__dirname, '../..', gallery.imageUrl);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    gallery.imageUrl = req.file.path;
  }

  await gallery.save();
  await gallery.populate('createdBy', 'fullName email');

  res.status(200).json({
    success: true,
    data: {
      gallery
    }
  });
});

/**
 * @route   DELETE /api/admin/gallery/:id
 * @desc    Delete gallery image and its file
 * @access  Private
 */
export const deleteGallery = catchAsync(async (req, res, next) => {
  const gallery = await Gallery.findOne({
    _id: req.params.id,
    companyId: req.user.companyId
  });

  if (!gallery) {
    return next(new AppError('Gallery image not found', 404));
  }

  // Delete image file
  if (gallery.imageUrl) {
    const imagePath = path.join(__dirname, '../..', gallery.imageUrl);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  await gallery.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Gallery image deleted successfully'
  });
});

/**
 * @route   PUT /api/admin/gallery/:id/publish
 * @desc    Toggle publish status
 * @access  Private
 */
export const togglePublish = catchAsync(async (req, res, next) => {
  const gallery = await Gallery.findOne({
    _id: req.params.id,
    companyId: req.user.companyId
  });

  if (!gallery) {
    return next(new AppError('Gallery image not found', 404));
  }

  gallery.isPublished = !gallery.isPublished;
  await gallery.save();
  await gallery.populate('createdBy', 'fullName email');

  res.status(200).json({
    success: true,
    data: {
      gallery
    }
  });
});

/**
 * @route   GET /api/admin/gallery/stats
 * @desc    Get gallery stats
 * @access  Private
 */
export const getGalleryStats = catchAsync(async (req, res, next) => {
  const stats = await Gallery.getStats(req.user.companyId);

  res.status(200).json({
    success: true,
    data: {
      stats
    }
  });
});

