import express from 'express';
import { body, param } from 'express-validator';
import { submitContact } from '../controllers/contactController.js';
import Gallery from '../models/Gallery.js';
import Company from '../models/Company.js';
import { catchAsync } from '../middleware/errorHandler.js';
import { AppError } from '../middleware/errorHandler.js';

const router = express.Router();

/**
 * @route   GET /api/public/gallery/:companyId
 * @desc    Get all published gallery images for a company (by category filter optional)
 * @access  Public
 */
router.get('/gallery/:companyId', 
  param('companyId').isMongoId().withMessage('Invalid company ID'),
  catchAsync(async (req, res, next) => {
    const { companyId } = req.params;
    const { category } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Verify company exists
    const company = await Company.findById(companyId);
    if (!company) {
      return next(new AppError('Company not found', 404));
    }

    // Build query
    const query = { companyId, isPublished: true };
    
    if (category) {
      const validCategories = ['radium-cutting', 'printing', 'banners', 'car-glass', 'logo-design', 'boards'];
      if (!validCategories.includes(category)) {
        return next(new AppError('Invalid category', 400));
      }
      query.category = category;
    }

    // Get total count
    const total = await Gallery.countDocuments(query);

    // Get gallery items
    const gallery = await Gallery.find(query)
      .select('-createdBy -companyId')
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
  })
);

/**
 * @route   GET /api/public/gallery/:companyId/categories
 * @desc    Get all available categories with image count
 * @access  Public
 */
router.get('/gallery/:companyId/categories',
  param('companyId').isMongoId().withMessage('Invalid company ID'),
  catchAsync(async (req, res, next) => {
    const { companyId } = req.params;

    // Verify company exists
    const company = await Company.findById(companyId);
    if (!company) {
      return next(new AppError('Company not found', 404));
    }

    // Get category counts
    const categories = await Gallery.aggregate([
      { $match: { companyId: companyId, isPublished: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Format response
    const categoryMap = {
      'radium-cutting': 'Radium Cutting',
      'printing': 'Printing',
      'banners': 'Banners',
      'car-glass': 'Car Glass',
      'logo-design': 'Logo Design',
      'boards': 'Boards'
    };

    const formattedCategories = categories.map(cat => ({
      category: cat._id,
      displayName: categoryMap[cat._id] || cat._id,
      count: cat.count
    }));

    res.status(200).json({
      success: true,
      data: {
        categories: formattedCategories
      }
    });
  })
);

/**
 * @route   GET /api/public/company/:companyId
 * @desc    Get public company details
 * @access  Public
 */
router.get('/company/:companyId',
  param('companyId').isMongoId().withMessage('Invalid company ID'),
  catchAsync(async (req, res, next) => {
    const { companyId } = req.params;

    const company = await Company.findById(companyId).select(
      'companyName description website phone email address city state country logo primaryColor secondaryColor'
    );

    if (!company) {
      return next(new AppError('Company not found', 404));
    }

    res.status(200).json({
      success: true,
      data: {
        company
      }
    });
  })
);

/**
 * @route   POST /api/public/contact
 * @desc    Submit customer inquiry
 * @access  Public
 */
const contactValidation = [
  body('companyId')
    .isMongoId()
    .withMessage('Invalid company ID'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .matches(/^[\+]?[0-9\s\-\(\)]{10,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
  body('service')
    .isIn(['radium-cutting', 'printing', 'banners', 'car-glass', 'logo-design', 'boards'])
    .withMessage('Invalid service category')
];

router.post('/contact', contactValidation, submitContact);

export default router;

