import express from 'express';
import { body } from 'express-validator';
import {
  submitContact,
  getAllContacts,
  getContact,
  updateContact,
  deleteContact
} from '../controllers/contactController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import { contactLimiter } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

// Validation rules for contact form
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s\.\-']+$/)
    .withMessage('Name can only contain letters, spaces, dots, hyphens, and apostrophes'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .matches(/^[\+]?[0-9\s\-\(\)]{8,15}$/)
    .withMessage('Please provide a valid phone number (8-15 digits)'),
  
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
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
];

// Public routes
router.post('/', contactLimiter, contactValidation, submitContact);

// Protected routes (Admin only)
router.use(protect, restrictTo('admin', 'super-admin'));

router.route('/')
  .get(getAllContacts);

router.route('/:id')
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

export default router;
