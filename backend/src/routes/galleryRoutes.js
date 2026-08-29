import express from 'express';
import Gallery from '../models/Gallery.js';
import Company from '../models/Company.js';
import { protect } from '../middleware/auth.js';
import { uploadGalleryImage } from '../middleware/upload.js';
import { catchAsync } from '../middleware/errorHandler.js';
import { AppError } from '../middleware/errorHandler.js';

const router = express.Router();

/**
 * @route   GET /api/gallery
 * @desc    Get all gallery images (public route)
 * @access  Public
 */
router.get('/', catchAsync(async (req, res, next) => {
  const query = { isPublished: true };
  if (req.query.category && req.query.category !== 'ALL WORK' && req.query.category !== 'All Work') {
    query.category = req.query.category;
  }

  const gallery = await Gallery.find(query)
    .select('-createdBy -companyId')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: {
      gallery,
      count: gallery.length
    }
  });
}));

/**
 * @route   POST /api/gallery/admin/add
 * @desc    Upload new gallery image (admin only - local storage)
 * @access  Private (Admin)
 */
router.post('/admin/add', 
  protect,
  uploadGalleryImage,
  catchAsync(async (req, res, next) => {
    if (!req.file) {
      return next(new AppError('Please upload an image file', 400));
    }

    const { title, category, description } = req.body;

    let companyId = req.user.companyId;
    if (!companyId) {
      const defaultCompany = await Company.findOne().sort({ createdAt: 1 });
      if (!defaultCompany) {
        return next(new AppError('No company found. Please create a company first.', 400));
      }
      companyId = defaultCompany._id;
    }

    const gallery = await Gallery.create({
      companyId: companyId,
      title: title || 'Custom Signage Asset',
      description: description || '',
      imageUrl: req.file.path, // Local path e.g. /uploads/gallery/filename.jpg
      category: (category && category.trim()) ? category.trim() : 'General',
      isPublished: true,
      createdBy: req.user.id
    });

    await gallery.populate('createdBy', 'fullName email');

    res.status(201).json({
      success: true,
      data: {
        gallery
      }
    });
  })
);

export default router;
