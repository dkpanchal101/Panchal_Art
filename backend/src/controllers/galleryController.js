import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Gallery from '../models/Gallery.js';
import Company from '../models/Company.js';
import { AppError, catchAsync } from '../middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Helper to get active companyId for current admin user
 */
const getActiveCompanyId = async (req) => {
  if (req.user && req.user.companyId) {
    return req.user.companyId;
  }
  const defaultCompany = await Company.findOne().sort({ createdAt: 1 });
  return defaultCompany ? defaultCompany._id : null;
};

/**
 * @route   GET /api/admin/gallery
 * @desc    Get all gallery images for admin
 * @access  Private
 */
export const getAllGallery = catchAsync(async (req, res, next) => {
  const category = req.query.category;
  const isPublished = req.query.isPublished;

  const query = {};
  
  if (category && category !== 'all' && category !== 'ALL WORK' && category !== 'All Work') {
    query.category = category;
  }
  
  if (isPublished !== undefined) {
    query.isPublished = isPublished === 'true';
  }

  // Fetch all gallery items from database
  const gallery = await Gallery.find(query)
    .populate('createdBy', 'fullName email')
    .sort({ displayOrder: 1, createdAt: -1 });

  res.status(200).json({
    success: true,
    data: {
      gallery,
      count: gallery.length
    }
  });
});

/**
 * @route   POST /api/admin/gallery
 * @desc    Upload new gallery image (local disk storage)
 * @access  Private
 */
export const createGallery = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please upload an image file', 400));
  }

  const { title, description, category, displayOrder, isPublished } = req.body;

  const companyId = await getActiveCompanyId(req);

  const gallery = await Gallery.create({
    companyId: companyId || undefined,
    title: (title && title.trim()) ? title.trim() : 'Custom Signage Project',
    description: description ? description.trim() : '',
    imageUrl: req.file.path,
    category: (category && category.trim()) ? category.trim() : 'General',
    displayOrder: displayOrder ? parseInt(displayOrder) : 0,
    isPublished: isPublished === 'false' ? false : true,
    createdBy: req.user._id || req.user.id
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
  const gallery = await Gallery.findById(req.params.id).populate('createdBy', 'fullName email');

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
  const gallery = await Gallery.findById(req.params.id);

  if (!gallery) {
    return next(new AppError('Gallery image not found', 404));
  }

  const { title, description, category, displayOrder, isPublished } = req.body;

  if (title !== undefined) gallery.title = title.trim();
  if (description !== undefined) gallery.description = description.trim();
  if (category !== undefined && category.trim()) gallery.category = category.trim();
  if (displayOrder !== undefined) gallery.displayOrder = parseInt(displayOrder);
  if (isPublished !== undefined) gallery.isPublished = isPublished === 'true' || isPublished === true;

  if (req.file) {
    if (gallery.imageUrl && !gallery.imageUrl.startsWith('http')) {
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
  const gallery = await Gallery.findById(req.params.id);

  if (!gallery) {
    return next(new AppError('Gallery image not found', 404));
  }

  if (gallery.imageUrl && !gallery.imageUrl.startsWith('http')) {
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
  const gallery = await Gallery.findById(req.params.id);

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
  const companyId = await getActiveCompanyId(req);
  const stats = await Gallery.getStats(companyId);

  res.status(200).json({
    success: true,
    data: {
      stats
    }
  });
});
