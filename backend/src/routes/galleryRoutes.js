import express from 'express';

const router = express.Router();

// Placeholder for gallery routes - will be implemented next
router.get('/', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Gallery API endpoint coming soon!'
  });
});

export default router;
