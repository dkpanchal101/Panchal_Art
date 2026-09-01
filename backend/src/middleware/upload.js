import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Local Upload Middleware
 * Stores files directly in local uploads/ directory for maximum performance
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
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
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
    cb(null, `logo-${uniqueSuffix}${ext}`);
  }
});

// File filter for images (jpg, jpeg, png, webp)
const imageFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const allowedExts = /\.(jpg|jpeg|png|webp)$/i;
  
  const isValidMime = allowedMimes.includes(file.mimetype);
  const isValidExt = allowedExts.test(path.extname(file.originalname));
  
  if (isValidMime && isValidExt) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, JPEG, PNG, and WEBP images are allowed.'));
  }
};

const maxFileSize = parseInt(process.env.MAX_FILE_SIZE) || 10 * 1024 * 1024; // 10MB

const galleryUpload = multer({
  storage: galleryStorage,
  limits: { fileSize: maxFileSize, files: 1 },
  fileFilter: imageFilter
});

const logoUpload = multer({
  storage: logoStorage,
  limits: { fileSize: maxFileSize, files: 1 },
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
    
    if (req.file) {
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
    
    req.file.path = `/uploads/logo/${req.file.filename}`;
    next();
  });
};

// Backwards compatibility alias
export const uploadGalleryImageToCloudinary = uploadGalleryImage;
