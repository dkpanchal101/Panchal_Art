import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validationResult } from 'express-validator';
import Company from '../models/Company.js';
import { AppError, catchAsync } from '../middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @route   GET /api/admin/company
 * @desc    Get company details
 * @access  Private
 */
export const getCompany = catchAsync(async (req, res, next) => {
  // Superadmin can access any company, regular admin only their own
  let companyId = req.user.companyId;
  
  if (req.user.role === 'superadmin' && req.query.companyId) {
    companyId = req.query.companyId;
  }

  if (!companyId) {
    return next(new AppError('No company associated with this account', 404));
  }

  const company = await Company.findById(companyId);

  if (!company) {
    return next(new AppError('Company not found', 404));
  }

  res.status(200).json({
    success: true,
    data: {
      company
    }
  });
});

/**
 * @route   PUT /api/admin/company
 * @desc    Update company details
 * @access  Private
 */
export const updateCompany = catchAsync(async (req, res, next) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  let companyId = req.user.companyId;
  
  if (req.user.role === 'superadmin' && req.body.companyId) {
    companyId = req.body.companyId;
    delete req.body.companyId; // Remove from update data
  }

  if (!companyId) {
    return next(new AppError('No company associated with this account', 404));
  }

  const company = await Company.findById(companyId);

  if (!company) {
    return next(new AppError('Company not found', 404));
  }

  // Update allowed fields
  const allowedFields = [
    'companyName',
    'description',
    'website',
    'phone',
    'email',
    'address',
    'city',
    'state',
    'country',
    'primaryColor',
    'secondaryColor'
  ];

  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      company[field] = req.body[field];
    }
  });

  await company.save();

  res.status(200).json({
    success: true,
    data: {
      company
    }
  });
});

/**
 * @route   POST /api/admin/company/logo
 * @desc    Upload company logo
 * @access  Private
 */
export const uploadLogo = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('Please upload a logo image file', 400));
  }

  let companyId = req.user.companyId;
  
  if (req.user.role === 'superadmin' && req.body.companyId) {
    companyId = req.body.companyId;
  }

  if (!companyId) {
    return next(new AppError('No company associated with this account', 404));
  }

  const company = await Company.findById(companyId);

  if (!company) {
    return next(new AppError('Company not found', 404));
  }

  // Delete old logo if exists
  if (company.logo) {
    const oldLogoPath = path.join(__dirname, '../..', company.logo);
    if (fs.existsSync(oldLogoPath)) {
      fs.unlinkSync(oldLogoPath);
    }
  }

  // Update logo path
  company.logo = req.file.path;
  await company.save();

  res.status(200).json({
    success: true,
    data: {
      company
    }
  });
});

/**
 * @route   GET /api/admin/company/settings
 * @desc    Get company branding settings
 * @access  Private
 */
export const getCompanySettings = catchAsync(async (req, res, next) => {
  let companyId = req.user.companyId;
  
  if (req.user.role === 'superadmin' && req.query.companyId) {
    companyId = req.query.companyId;
  }

  if (!companyId) {
    return next(new AppError('No company associated with this account', 404));
  }

  const company = await Company.findById(companyId).select('companyName logo primaryColor secondaryColor');

  if (!company) {
    return next(new AppError('Company not found', 404));
  }

  res.status(200).json({
    success: true,
    data: {
      settings: {
        companyName: company.companyName,
        logo: company.logo,
        primaryColor: company.primaryColor,
        secondaryColor: company.secondaryColor
      }
    }
  });
});

