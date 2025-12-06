import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Company from '../models/Company.js';

/**
 * Authentication Middleware
 * Verifies JWT token and checks user permissions
 */

/**
 * Protect routes - verify JWT token
 */
export const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route. Please provide a token.'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      const currentUser = await Admin.findById(decoded.id).select('+password');

      if (!currentUser) {
        return res.status(401).json({
          success: false,
          message: 'The user belonging to this token no longer exists'
        });
      }

      // Check if user is active
      if (!currentUser.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Your account has been deactivated'
        });
      }

      // Check if user is locked
      if (currentUser.isLocked) {
        return res.status(423).json({
          success: false,
          message: 'Account is temporarily locked due to too many failed login attempts'
        });
      }

      // Check if user changed password after token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return res.status(401).json({
          success: false,
          message: 'User recently changed password. Please log in again'
        });
      }

      // Populate company if exists
      if (currentUser.companyId) {
        await currentUser.populate('companyId');
      }

      // Grant access to protected route
      req.user = currentUser;
      next();

    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token. Please log in again.'
        });
      }
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Token expired. Please log in again.'
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    });
  }
};

/**
 * Restrict to certain roles
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action'
      });
    }
    next();
  };
};

/**
 * Check if user belongs to company
 * Ensures admin can only access their own company's data
 */
export const checkCompanyAccess = async (req, res, next) => {
  try {
    // Superadmin can access all companies
    if (req.user.role === 'superadmin') {
      return next();
    }

    // Regular admin must have a companyId
    if (!req.user.companyId) {
      return res.status(403).json({
        success: false,
        message: 'You are not associated with any company'
      });
    }

    // Check if accessing company-specific resource
    const companyId = req.params.companyId || req.body.companyId || req.query.companyId;
    
    if (companyId) {
      // Verify the companyId matches the user's company
      if (companyId.toString() !== req.user.companyId.toString()) {
        return res.status(403).json({
          success: false,
          message: 'You do not have access to this company\'s resources'
        });
      }
    }

    // For admin routes, automatically set companyId from user
    if (!req.body.companyId && req.user.companyId) {
      req.body.companyId = req.user.companyId;
    }

    next();
  } catch (error) {
    console.error('Company access check error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error checking company access'
    });
  }
};

/**
 * Optional auth - doesn't fail if no token provided
 */
export const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await Admin.findById(decoded.id);

        if (currentUser && currentUser.isActive && !currentUser.isLocked) {
          if (currentUser.companyId) {
            await currentUser.populate('companyId');
          }
          req.user = currentUser;
        }
      } catch (error) {
        // Token invalid, but that's okay for optional auth
      }
    }

    next();
  } catch (error) {
    next();
  }
};

