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
import galleryRoutes from './routes/galleryRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';

// Import middleware
import { globalErrorHandler, notFound } from './middleware/errorHandler.js';
import Admin from './models/Admin.js';
import Company from './models/Company.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

connectDB();

Admin.createDefaultAdmin().catch(err => {
  console.error('Error creating default admin:', err);
});

Company.createDefaultCompany().catch(err => {
  console.error('Error creating default company:', err);
});

// Configure Helmet to allow cross-origin image loading from /uploads
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  }
});

app.use('/api', generalLimiter);

// Enable CORS for public site (5173) and admin portal (3001)
app.use(cors({
  origin: true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Serve static upload directory for gallery images and logos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Panchal Art API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

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

app.use('/api/public', publicLimiter, publicRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/admin/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
});

export default app;
