import express from 'express';
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
  getCompanySettings,
  getDashboardStats
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
 * Dashboard & Analytics
 */
router.get('/dashboard/stats', getDashboardStats);

/**
 * Gallery Management Routes
 */
router.get('/gallery', getAllGallery);
router.post('/gallery', uploadGalleryImage, createGallery);
router.get('/gallery/stats', getGalleryStats);
router.get('/gallery/:id', getGalleryById);
router.put('/gallery/:id', uploadGalleryImageOptional, updateGallery);
router.delete('/gallery/:id', deleteGallery);
router.put('/gallery/:id/publish', togglePublish);

/**
 * Company Management Routes
 */
router.get('/company', getCompany);
router.put('/company', updateCompany);
router.post('/company/logo', uploadLogoMiddleware, uploadLogo);
router.get('/company/settings', getCompanySettings);

/**
 * Customer Inquiries Routes
 */
router.get('/inquiries', getAllInquiries);
router.get('/inquiries/:id', getInquiryById);
router.put('/inquiries/:id/read', markAsRead);
router.delete('/inquiries/:id', deleteInquiry);

export default router;
