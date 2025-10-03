import express from 'express';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// All admin routes are protected
router.use(protect, restrictTo('admin', 'super-admin'));

// Placeholder for admin routes - will be implemented next
router.get('/dashboard', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Admin API endpoints coming soon!'
  });
});

export default router;
