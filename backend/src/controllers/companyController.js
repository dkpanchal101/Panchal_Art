import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validationResult } from 'express-validator';
import Company from '../models/Company.js';
import Gallery from '../models/Gallery.js';
import Quote from '../models/Quote.js';
import Contact from '../models/Contact.js';
import { AppError, catchAsync } from '../middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @route   GET /api/admin/company
 * @desc    Get company details
 * @access  Private
 */
export const getCompany = catchAsync(async (req, res, next) => {
  let companyId = req.user.companyId;
  
  if (req.user.role === 'superadmin' && req.query.companyId) {
    companyId = req.query.companyId;
  }

  if (!companyId) {
    // If no companyId is set on admin user, fallback to the first company in database
    const defaultCompany = await Company.findOne();
    if (defaultCompany) {
      companyId = defaultCompany._id;
    } else {
      return next(new AppError('No company associated with this account', 404));
    }
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
    delete req.body.companyId;
  }

  if (!companyId) {
    const defaultCompany = await Company.findOne();
    if (defaultCompany) {
      companyId = defaultCompany._id;
    } else {
      return next(new AppError('No company associated with this account', 404));
    }
  }

  const company = await Company.findById(companyId);

  if (!company) {
    return next(new AppError('Company not found', 404));
  }

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
    const defaultCompany = await Company.findOne();
    if (defaultCompany) {
      companyId = defaultCompany._id;
    } else {
      return next(new AppError('No company associated with this account', 404));
    }
  }

  const company = await Company.findById(companyId);

  if (!company) {
    return next(new AppError('Company not found', 404));
  }

  if (company.logo) {
    const oldLogoPath = path.join(__dirname, '../..', company.logo);
    if (fs.existsSync(oldLogoPath)) {
      fs.unlinkSync(oldLogoPath);
    }
  }

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
    const defaultCompany = await Company.findOne();
    if (defaultCompany) {
      companyId = defaultCompany._id;
    } else {
      return next(new AppError('No company associated with this account', 404));
    }
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

/**
 * @route   GET /api/admin/dashboard/stats
 * @desc    Get aggregated real dashboard stats
 * @access  Private
 */
export const getDashboardStats = catchAsync(async (req, res, next) => {
  let companyId = req.user.companyId;
  if (!companyId) {
    const defaultCompany = await Company.findOne();
    if (defaultCompany) companyId = defaultCompany._id;
  }

  const [totalGallery, totalQuotes, pendingQuotes, totalInquiries, unreadInquiries, company, recentQuotes, recentInquiries] = await Promise.all([
    Gallery.countDocuments(companyId ? { companyId } : {}),
    Quote.countDocuments(),
    Quote.countDocuments({ status: 'pending' }),
    Contact.countDocuments(companyId ? { companyId } : {}),
    Contact.countDocuments({ ...(companyId ? { companyId } : {}), isRead: false }),
    Company.findById(companyId),
    Quote.find().sort({ createdAt: -1 }).limit(5),
    Contact.find(companyId ? { companyId } : {}).sort({ createdAt: -1 }).limit(5)
  ]);

  res.status(200).json({
    success: true,
    data: {
      stats: {
        totalGallery,
        totalQuotes,
        pendingQuotes,
        totalInquiries,
        unreadInquiries
      },
      company,
      recentQuotes,
      recentInquiries
    }
  });
});
