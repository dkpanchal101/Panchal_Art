import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  logout,
  refreshToken,
  getMe,
  updatePassword
} from '../controllers/authController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

const registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  body('role')
    .optional()
    .isIn(['admin', 'superadmin'])
    .withMessage('Role must be either admin or superadmin')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

router.post('/register', protect, restrictTo('superadmin'), registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/logout', protect, logout);
router.post('/refresh-token', protect, refreshToken);
router.get('/me', protect, getMe);
router.put('/update-password', protect, updatePassword);

export default router;
