import express from 'express';
import { loginLimiter } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

// Placeholder for auth routes - will be implemented next
router.post('/login', loginLimiter, (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Auth API endpoint coming soon!'
  });
});

export default router;
