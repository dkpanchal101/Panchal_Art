import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import Admin from '../models/Admin.js';
import Company from '../models/Company.js';
import { AppError, catchAsync } from '../middleware/errorHandler.js';

/**
 * Generate JWT Token
 */
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || '7d'
  });
};

/**
 * Create and send token response
 */
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  
  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    data: {
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        companyId: user.companyId
      }
    }
  });
};

/**
 * @route   POST /api/admin/auth/register
 * @desc    Register new admin (superadmin only)
 * @access  Private (superadmin)
 */
export const register = catchAsync(async (req, res, next) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const { email, password, fullName, role, companyId } = req.body;

  // Check if user already exists
  const existingUser = await Admin.findOne({ email });
  if (existingUser) {
    return next(new AppError('User with this email already exists', 400));
  }

  // If companyId is provided, verify it exists
  if (companyId) {
    const company = await Company.findById(companyId);
    if (!company) {
      return next(new AppError('Company not found', 404));
    }
  }

  // Create new admin
  const admin = await Admin.create({
    email,
    password,
    fullName,
    role: role || 'admin',
    companyId: companyId || null
  });

  // Populate company if exists
  if (admin.companyId) {
    await admin.populate('companyId');
  }

  createSendToken(admin, 201, res);
});

/**
 * @route   POST /api/admin/auth/login
 * @desc    Admin login
 * @access  Public
 */
export const login = catchAsync(async (req, res, next) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const { email, password } = req.body;

  // Find user and include password
  const user = await Admin.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    // Increment login attempts
    if (user) {
      await user.incLoginAttempts();
    }
    return next(new AppError('Incorrect email or password', 401));
  }

  // Check if account is locked
  if (user.isLocked) {
    return next(new AppError('Account is temporarily locked due to too many failed login attempts', 423));
  }

  // Check if account is active
  if (!user.isActive) {
    return next(new AppError('Your account has been deactivated', 401));
  }

  // Reset login attempts on successful login
  await user.resetLoginAttempts();

  // Populate company if exists
  if (user.companyId) {
    await user.populate('companyId');
  }

  createSendToken(user, 200, res);
});

/**
 * @route   POST /api/admin/auth/logout
 * @desc    Logout (client-side token removal, server-side can track if needed)
 * @access  Private
 */
export const logout = catchAsync(async (req, res, next) => {
  // In a stateless JWT system, logout is handled client-side
  // Server can track blacklisted tokens if needed
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

/**
 * @route   POST /api/admin/auth/refresh-token
 * @desc    Refresh JWT token
 * @access  Private
 */
export const refreshToken = catchAsync(async (req, res, next) => {
  // Get token from header
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('No token provided', 401));
  }

  try {
    // Verify token (even if expired, we'll allow refresh)
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        // For expired tokens, decode without verification to get user ID
        decoded = jwt.decode(token);
      } else {
        return next(new AppError('Invalid token', 401));
      }
    }

    // Get user
    const user = await Admin.findById(decoded.id);
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    // Check if user is active
    if (!user.isActive) {
      return next(new AppError('Your account has been deactivated', 401));
    }

    // Check if user is locked
    if (user.isLocked) {
      return next(new AppError('Account is temporarily locked', 423));
    }

    // Populate company if exists
    if (user.companyId) {
      await user.populate('companyId');
    }

    // Generate new token
    createSendToken(user, 200, res);
  } catch (error) {
    return next(new AppError('Token refresh failed', 401));
  }
});

/**
 * @route   GET /api/admin/auth/me
 * @desc    Get current user
 * @access  Private
 */
export const getMe = catchAsync(async (req, res, next) => {
  const user = await Admin.findById(req.user.id);
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Populate company if exists
  if (user.companyId) {
    await user.populate('companyId');
  }

  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        companyId: user.companyId,
        isActive: user.isActive
      }
    }
  });
});

