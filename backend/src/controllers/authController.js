import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import Admin from '../models/Admin.js';
import Company from '../models/Company.js';
import { AppError, catchAsync } from '../middleware/errorHandler.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || '7d'
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
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

export const register = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const { email, password, fullName, role, companyId } = req.body;

  const existingUser = await Admin.findOne({ email });
  if (existingUser) {
    return next(new AppError('User with this email already exists', 400));
  }

  if (companyId) {
    const company = await Company.findById(companyId);
    if (!company) {
      return next(new AppError('Company not found', 404));
    }
  }

  const admin = await Admin.create({
    email,
    password,
    fullName,
    role: role || 'admin',
    companyId: companyId || null
  });

  if (admin.companyId) {
    await admin.populate('companyId');
  }

  createSendToken(admin, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const { email, password } = req.body;

  const user = await Admin.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    if (user) {
      await user.incLoginAttempts();
    }
    return next(new AppError('Incorrect email or password', 401));
  }

  if (user.isLocked) {
    return next(new AppError('Account is temporarily locked due to too many failed login attempts', 423));
  }

  if (!user.isActive) {
    return next(new AppError('Your account has been deactivated', 401));
  }

  await user.resetLoginAttempts();

  if (user.companyId) {
    await user.populate('companyId');
  }

  createSendToken(user, 200, res);
});

export const logout = catchAsync(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

export const refreshToken = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('No token provided', 401));
  }

  try {
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        decoded = jwt.decode(token);
      } else {
        return next(new AppError('Invalid token', 401));
      }
    }

    const user = await Admin.findById(decoded.id);
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    if (!user.isActive) {
      return next(new AppError('Your account has been deactivated', 401));
    }

    if (user.isLocked) {
      return next(new AppError('Account is temporarily locked', 423));
    }

    if (user.companyId) {
      await user.populate('companyId');
    }

    createSendToken(user, 200, res);
  } catch (error) {
    return next(new AppError('Token refresh failed', 401));
  }
});

export const getMe = catchAsync(async (req, res, next) => {
  const user = await Admin.findById(req.user.id);
  
  if (!user) {
    return next(new AppError('User not found', 404));
  }

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

export const updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return next(new AppError('Please provide current and new password', 400));
  }

  const user = await Admin.findById(req.user.id).select('+password');
  if (!user || !(await user.correctPassword(currentPassword, user.password))) {
    return next(new AppError('Current password is incorrect', 401));
  }

  user.password = newPassword;
  await user.save();

  createSendToken(user, 200, res);
});
