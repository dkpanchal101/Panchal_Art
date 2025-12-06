import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

// Import configurations and routes
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import publicRoutes from './routes/public.js';

// Import middleware
import { globalErrorHandler, notFound } from './middleware/errorHandler.js';
import Admin from './models/Admin.js';
import Company from './models/Company.js';

// ES module dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Create default admin and company on startup
Admin.createDefaultAdmin().catch(err => {
  console.error('Error creating default admin:', err);
});

Company.createDefaultCompany().catch(err => {
  console.error('Error creating default company:', err);
});

// Security middleware
app.use(helmet());

// Rate limiting - general
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiting - stricter for public endpoints
const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  }
});

// Apply general rate limiting
app.use('/api', generalLimiter);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Static files (for uploaded images)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Panchal Art API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Get company ID endpoint (for setup purposes)
app.get('/api/setup/company-id', async (req, res) => {
  try {
    const company = await Company.findOne().sort({ createdAt: 1 });
    if (company) {
      res.status(200).json({
        success: true,
        companyId: company._id.toString(),
        companyName: company.companyName,
        message: 'Set this Company ID in Vercel as VITE_COMPANY_ID environment variable'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No company found. Please create a company first.'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching company ID',
      error: error.message
    });
  }
});

// API Routes
// Public routes with stricter rate limiting
app.use('/api/public', publicLimiter, publicRoutes);

// Admin authentication routes
app.use('/api/admin/auth', authRoutes);

// Admin routes (protected)
app.use('/api/admin', adminRoutes);

// 404 handler - catch all unmatched routes
app.use(notFound);

// Global error handler
app.use(globalErrorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
});

export default app;
