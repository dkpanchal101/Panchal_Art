import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { uploadToCloudinary } from '../config/cloudinary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Upload Middleware
 * Handles image uploads with validation and optimization
 */

// Ensure upload directories exist
const ensureUploadDirs = () => {
  const galleryDir = path.join(__dirname, '../../uploads/gallery');
  const logoDir = path.join(__dirname, '../../uploads/logo');
  
  if (!fs.existsSync(galleryDir)) {
    fs.mkdirSync(galleryDir, { recursive: true });
  }
  if (!fs.existsSync(logoDir)) {
    fs.mkdirSync(logoDir, { recursive: true });
  }
};

ensureUploadDirs();

// Configure multer storage for gallery images
const galleryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/gallery'));
  },
  filename: function (req, file, cb) {
    // Generate unique filename: timestamp-random-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    const name = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '-');
    cb(null, `gallery-${uniqueSuffix}${ext}`);
  }
});

// Configure multer storage for company logos
const logoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/logo'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    const name = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '-');
    cb(null, `logo-${uniqueSuffix}${ext}`);
  }
});

// File filter for images only (jpg, jpeg, png)
const imageFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png'];
  const allowedExts = /\.(jpg|jpeg|png)$/i;
  
  const isValidMime = allowedMimes.includes(file.mimetype);
  const isValidExt = allowedExts.test(path.extname(file.originalname));
  
  if (isValidMime && isValidExt) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, JPEG, and PNG images are allowed.'));
  }
};

// Get max file size from env or default to 5MB
const maxFileSize = parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024; // 5MB

// Configure multer for gallery images
const galleryUpload = multer({
  storage: galleryStorage,
  limits: {
    fileSize: maxFileSize,
    files: 1
  },
  fileFilter: imageFilter
});

// Configure multer for company logos
const logoUpload = multer({
  storage: logoStorage,
  limits: {
    fileSize: maxFileSize,
    files: 1
  },
  fileFilter: imageFilter
});

/**
 * Middleware for single gallery image upload (required)
 */
export const uploadGalleryImage = (req, res, next) => {
  const uploadMiddleware = galleryUpload.single('image');
  
  uploadMiddleware(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: `File too large. Maximum size is ${maxFileSize / (1024 * 1024)}MB.`
        });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          success: false,
          message: 'Too many files. Only 1 file allowed.'
        });
      }
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded. Please select an image file.'
      });
    }
    
    // Add file path to request
    req.file.path = `/uploads/gallery/${req.file.filename}`;
    next();
  });
};

/**
 * Middleware for optional gallery image upload (for updates)
 */
export const uploadGalleryImageOptional = (req, res, next) => {
  const uploadMiddleware = galleryUpload.single('image');
  
  uploadMiddleware(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: `File too large. Maximum size is ${maxFileSize / (1024 * 1024)}MB.`
        });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          success: false,
          message: 'Too many files. Only 1 file allowed.'
        });
      }
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    
    // File is optional for updates
    if (req.file) {
      // Add file path to request
      req.file.path = `/uploads/gallery/${req.file.filename}`;
    }
    
    next();
  });
};

/**
 * Middleware for company logo upload
 */
export const uploadLogo = (req, res, next) => {
  const uploadMiddleware = logoUpload.single('logo');
  
  uploadMiddleware(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: `File too large. Maximum size is ${maxFileSize / (1024 * 1024)}MB.`
        });
      }
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded. Please select an image file.'
      });
    }
    
    // Add file path to request
    req.file.path = `/uploads/logo/${req.file.filename}`;
    next();
  });
};

/**
 * Cloudinary Upload Middleware for Gallery Images
 * Uses memory storage and uploads directly to Cloudinary
 */
const cloudinaryMemoryStorage = multer.memoryStorage();

const cloudinaryGalleryUpload = multer({
  storage: cloudinaryMemoryStorage,
  limits: {
    fileSize: maxFileSize,
    files: 1
  },
  fileFilter: imageFilter
});

/**
 * Middleware for gallery image upload to Cloudinary (required)
 */
export const uploadGalleryImageToCloudinary = async (req, res, next) => {
  const uploadMiddleware = cloudinaryGalleryUpload.single('image');
  
  uploadMiddleware(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: `File too large. Maximum size is ${maxFileSize / (1024 * 1024)}MB.`
        });
      }
      if (err.code === 'LIMIT_FILE_COUNT') {
        return res.status(400).json({
          success: false,
          message: 'Too many files. Only 1 file allowed.'
        });
      }
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded. Please select an image file.'
      });
    }
    
    try {
      // Upload to Cloudinary
      const result = await uploadToCloudinary(req.file.buffer, req.file.originalname);
      
      // Store Cloudinary URL in req.file.path for compatibility
      req.file.path = result.secure_url;
      req.file.cloudinaryId = result.public_id;
      
      next();
    } catch (cloudinaryError) {
      return res.status(500).json({
        success: false,
        message: 'Failed to upload image to Cloudinary',
        error: cloudinaryError.message
      });
    }
  });
};

