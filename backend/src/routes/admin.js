import express from 'express';
import { body, query } from 'express-validator';
import { protect, checkCompanyAccess } from '../middleware/auth.js';
import {
  getAllGallery,
  createGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
  togglePublish,
  getGalleryStats
} from '../controllers/galleryController.js';
import {
  getCompany,
  updateCompany,
  uploadLogo,
  getCompanySettings
} from '../controllers/companyController.js';
import {
  getAllInquiries,
  getInquiryById,
  markAsRead,
  deleteInquiry
} from '../controllers/contactController.js';
import { uploadGalleryImage, uploadGalleryImageOptional, uploadLogo as uploadLogoMiddleware } from '../middleware/upload.js';

const router = express.Router();

// All admin routes require authentication
router.use(protect);
router.use(checkCompanyAccess);

/**
 * Gallery Management Routes
 */

// Validation for gallery creation
const galleryCreateValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('category')
    .isIn(['radium-cutting', 'printing', 'banners', 'car-glass', 'logo-design', 'boards'])
    .withMessage('Invalid category'),
  body('displayOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Display order must be a non-negative integer'),
  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('isPublished must be a boolean')
];

// Validation for gallery update
const galleryUpdateValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('category')
    .optional()
    .isIn(['radium-cutting', 'printing', 'banners', 'car-glass', 'logo-design', 'boards'])
    .withMessage('Invalid category'),
  body('displayOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Display order must be a non-negative integer'),
  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('isPublished must be a boolean')
];

/**
 * @route   GET /api/admin/gallery
 * @desc    Get all gallery images (paginated)
 */
router.get('/gallery', getAllGallery);

/**
 * @route   POST /api/admin/gallery
 * @desc    Upload new gallery image
 */
router.post('/gallery', uploadGalleryImage, galleryCreateValidation, createGallery);

/**
 * @route   GET /api/admin/gallery/stats
 * @desc    Get gallery stats
 */
router.get('/gallery/stats', getGalleryStats);

/**
 * @route   GET /api/admin/gallery/:id
 * @desc    Get single gallery image details
 */
router.get('/gallery/:id', getGalleryById);

/**
 * @route   PUT /api/admin/gallery/:id
 * @desc    Update gallery image
 */
router.put('/gallery/:id', uploadGalleryImageOptional, galleryUpdateValidation, updateGallery);

/**
 * @route   DELETE /api/admin/gallery/:id
 * @desc    Delete gallery image
 */
router.delete('/gallery/:id', deleteGallery);

/**
 * @route   PUT /api/admin/gallery/:id/publish
 * @desc    Toggle publish status
 */
router.put('/gallery/:id/publish', togglePublish);

/**
 * Company Management Routes
 */

// Validation for company update
const companyUpdateValidation = [
  body('companyName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Company name must be between 1 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('website')
    .optional()
    .isURL()
    .withMessage('Please provide a valid website URL'),
  body('phone')
    .optional()
    .matches(/^[\+]?[0-9\s\-\(\)]{10,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('primaryColor')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Please provide a valid hex color'),
  body('secondaryColor')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Please provide a valid hex color')
];

/**
 * @route   GET /api/admin/company
 * @desc    Get company details
 */
router.get('/company', getCompany);

/**
 * @route   PUT /api/admin/company
 * @desc    Update company details
 */
router.put('/company', companyUpdateValidation, updateCompany);

/**
 * @route   POST /api/admin/company/logo
 * @desc    Upload company logo
 */
router.post('/company/logo', uploadLogoMiddleware, uploadLogo);

/**
 * @route   GET /api/admin/company/settings
 * @desc    Get company branding settings
 */
router.get('/company/settings', getCompanySettings);

/**
 * Customer Inquiries Routes
 */

/**
 * @route   GET /api/admin/inquiries
 * @desc    Get all customer inquiries (paginated, with filters)
 */
router.get('/inquiries', getAllInquiries);

/**
 * @route   GET /api/admin/inquiries/:id
 * @desc    Get single inquiry details
 */
router.get('/inquiries/:id', getInquiryById);

/**
 * @route   PUT /api/admin/inquiries/:id/read
 * @desc    Mark inquiry as read
 */
router.put('/inquiries/:id/read', markAsRead);

/**
 * @route   DELETE /api/admin/inquiries/:id
 * @desc    Delete inquiry
 */
router.delete('/inquiries/:id', deleteInquiry);

export default router;

