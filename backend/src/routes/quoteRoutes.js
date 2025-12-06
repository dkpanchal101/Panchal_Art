import express from 'express';
import { body } from 'express-validator';
import {
  submitQuote,
  getAllQuotes,
  getQuote,
  updateQuote,
  deleteQuote
} from '../controllers/quoteController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import { quoteLimiter } from '../middleware/rateLimitMiddleware.js';
import { uploadSingle } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Validation rules for quote form
const quoteValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('phone')
    .matches(/^[\+]?[0-9\s\-\(\)]{10,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('service')
    .isIn([
      'Radium Cutting & Custom Design',
      'Stylish Name Printing & Lettering',
      'Multi-color Radium Boards & Cutting',
      'Car Glass Film Pasting',
      'Shop & Stage Banners & Posters',
      'Logo & Poster Design, Digital Design'
    ])
    .withMessage('Please select a valid service'),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters')
];

// Public routes
router.post('/', quoteLimiter, uploadSingle('image'), quoteValidation, submitQuote);

// Protected routes (Admin only)
router.use(protect, restrictTo('admin', 'super-admin'));

router.route('/')
  .get(getAllQuotes);

router.route('/:id')
  .get(getQuote)
  .put(updateQuote)
  .delete(deleteQuote);

export default router;
