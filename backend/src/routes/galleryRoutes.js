import express from 'express';
import Gallery from '../models/Gallery.js';
import Company from '../models/Company.js';
import { protect } from '../middleware/auth.js';
import { uploadGalleryImageToCloudinary } from '../middleware/upload.js';
import { catchAsync } from '../middleware/errorHandler.js';
import { AppError } from '../middleware/errorHandler.js';

const router = express.Router();

/**
 * @route   GET /api/gallery
 * @desc    Get all gallery images (public route)
 * @access  Public
 * @returns All gallery documents sorted by createdAt (newest first)
 */
router.get('/', catchAsync(async (req, res, next) => {
  // Get all published gallery images, sorted by createdAt (newest first)
  const gallery = await Gallery.find({ isPublished: true })
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
 * @desc    Upload new gallery image (admin only)
 * @access  Private (Admin)
 * @body    multipart/form-data:
 *          - image: File (required)
 *          - title: String (optional)
 *          - category: String (optional, default "All Work")
 */
router.post('/admin/add', 
  protect,
  uploadGalleryImageToCloudinary,
  catchAsync(async (req, res, next) => {
    if (!req.file) {
      return next(new AppError('Please upload an image file', 400));
    }

    const { title, category } = req.body;

    // Get companyId from admin user, or get default company
    let companyId = req.user.companyId;
    if (!companyId) {
      // Get the first/default company if user doesn't have one
      const defaultCompany = await Company.findOne().sort({ createdAt: 1 });
      if (!defaultCompany) {
        return next(new AppError('No company found. Please create a company first.', 400));
      }
      companyId = defaultCompany._id;
    }

    // Validate category if provided
    const validCategories = ['All Work', 'radium-cutting', 'printing', 'banners', 'car-glass', 'logo-design', 'boards'];
    const finalCategory = category && validCategories.includes(category) ? category : 'All Work';

    // Create gallery item
    const gallery = await Gallery.create({
      companyId: companyId,
      title: title || undefined,
      imageUrl: req.file.path, // Cloudinary URL
      category: finalCategory,
      isPublished: true, // Auto-publish for new uploads
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
