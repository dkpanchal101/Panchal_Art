# PANCHAL ART - Full Project Specification & Features

## 📋 PROJECT OVERVIEW

**Project Name:** Panchal Art  
**Type:** Full-Stack Web Application (Service Design Business Website)  
**Purpose:** A comprehensive platform for a service design business with customer-facing website and admin dashboard

---

## 🏗️ TECHNOLOGY STACK

### Frontend
- **Framework:** React 18.3.1
- **Build Tool:** Vite 5.4.2
- **Language:** TypeScript 5.5.3
- **Styling:** Tailwind CSS 3.4.1
- **Routing:** React Router DOM 7.9.3
- **Animation:** Framer Motion 12.23.22
- **UI Icons:** Lucide React 0.344.0
- **Database:** Supabase 2.57.4
- **Code Quality:** ESLint 9.9.1
- **PostCSS:** Autoprefixer 10.4.18

### Backend
- **Runtime:** Node.js (v16+)
- **Framework:** Express 5.1.0
- **Database:** MongoDB 8.18.3 (Mongoose)
- **Authentication:** JWT (jsonwebtoken 9.0.2)
- **Password Hashing:** Bcryptjs 3.0.2
- **ORM/ODM:** Mongoose 8.18.3
- **Cloud Storage:** Cloudinary 2.7.0
- **File Upload:** Multer 2.0.2
- **Email Service:** Nodemailer 7.0.6
- **Security:** Helmet 8.1.0, Rate Limiting (express-rate-limit 8.1.0), CORS 2.8.5
- **Validation:** Express Validator 7.2.1
- **Development:** Nodemon 3.1.10, Morgan 1.10.1
- **Task Runner:** Concurrently 9.2.1

---

## 🎯 KEY FEATURES IMPLEMENTED

### 1. CUSTOMER-FACING WEBSITE (Frontend)

#### **Home Page**
- Hero section with call-to-action
- Feature animations using Framer Motion
- Company introduction
- Visual content highlights

#### **About Page**
- Company story and mission
- Team information
- Company values and expertise
- Professional branding

#### **Services Page**
- List of all services offered:
  - Radium Cutting
  - Printing
  - Banners
  - Car Glass
  - Logo Design
  - Boards
- Service descriptions and details
- Call-to-action for each service

#### **Gallery Page**
- Image portfolio display
- Service-based categorization
- Image showcase functionality
- Responsive grid layout

#### **Contact Page**
- Contact form with fields:
  - Name (required)
  - Email (required, validated)
  - Phone Number (required, validated)
  - Service Selection (dropdown with 6 services)
  - Message (required, max 1000 chars)
- Form validation on client-side
- Integration with backend submission

#### **Navigation & UI Components**
- **Header:** Responsive navigation with menu
- **Footer:** Company information, links, contact details
- **WhatsApp Button:** Floating action button for direct WhatsApp contact
- **Scroll to Top:** Smooth scroll button for long pages
- **Quote Modal:** Modal dialog for quote requests

#### **Design & UX**
- Smooth page transitions with animations
- Framer Motion for entrance/exit animations
- Responsive design supporting all devices
- Smooth scrolling behavior
- Accessibility features (reduced motion support)
- Gradient animations for visual interest
- Staggered animations for multiple elements

---

### 2. BACKEND API & SERVICES

#### **Authentication & Authorization**
- **JWT-based Authentication:** Token generation with configurable expiry (7 days default)
- **Role-Based Access Control:** Admin and User roles
- **Admin Registration:** Superadmin can register new admins
- **Admin Login:** Email/password based login
- **Password Encryption:** Bcryptjs hashing
- **Default Admin:** Auto-created on startup (email/password configurable)

#### **Contact Management**
- **Submit Contact Form:** Public endpoint for customers to submit inquiries
- **Email Validation:** Format and existence verification
- **Phone Validation:** International phone number validation (10-15 digits)
- **Service Categories:**
  - Radium Cutting
  - Printing
  - Banners
  - Car Glass
  - Logo Design
  - Boards
- **Contact Tracking:** Track read/unread status
- **Inquiry Management:** Admin can view all inquiries with filtering and pagination
- **Multi-Company Support:** Each inquiry linked to company

#### **Gallery Management**
- **Image Upload:** Cloudinary integration for image storage
- **Gallery Organization:** Service-based categorization
- **Image Management:** Admin can upload, delete, and organize images
- **Cloud Storage:** No local storage limitations

#### **Quote System**
- **Quote Requests:** Customers can request quotes
- **File Upload Support:** Attach files with quote requests
- **Multi-Step Process:** Structured quote workflow
- **Price Estimation:** Track quotes and pricing

#### **Admin Dashboard**
- **Inquiry Dashboard:** View all customer inquiries
- **Status Management:** Mark inquiries as read/contacted/quoted/completed
- **Analytics:** Track incoming inquiries
- **Gallery Management:** Upload and manage portfolio images
- **Company Settings:** Configure company information

#### **Email Notifications**
- **Contact Notifications:** Email admin when new inquiry received
- **Quote Notifications:** Notify admin of quote requests
- **SMTP Integration:** Gmail/custom SMTP support
- **Email Service:** Nodemailer integration

#### **User Management**
- **Admin Profiles:** Store admin information
- **Company Profiles:** Multi-company support
- **Role Management:** Superadmin, Admin, User roles

#### **Security Features**
- **Helmet.js:** HTTP security headers
- **CORS:** Cross-Origin Resource Sharing configuration
- **Rate Limiting:** 
  - General: 100 requests per 15 minutes
  - Public endpoints: 50 requests per 15 minutes
- **Input Validation:** Express Validator for all inputs
- **Password Security:** Bcryptjs hashing (salt rounds)
- **JWT Expiry:** Automatic token expiration

#### **API Rate Limiting**
- General limiter: 100 requests/15 minutes
- Public limiter: 50 requests/15 minutes
- Prevents abuse and DDoS attacks

#### **Database Normalization**
- MongoDB Schema Models:
  - **Contact Model:** Customer inquiries
  - **Admin Model:** Admin users
  - **Company Model:** Company information
  - **Gallery Model:** Portfolio images
  - **Quote Model:** Quote requests

---

## 📁 PROJECT STRUCTURE

### Frontend (Panchal_Art/)
```
Panchal_Art/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx         # Navigation header
│   │   │   └── Footer.tsx         # Footer section
│   │   ├── sections/
│   │   │   ├── About.tsx          # About section
│   │   │   ├── CTA.tsx            # Call-to-action section
│   │   │   ├── Hero.tsx           # Hero banner
│   │   │   ├── Portfolio.tsx      # Portfolio display
│   │   │   ├── Services.tsx       # Services list
│   │   │   └── Testimonials.tsx   # Testimonials section
│   │   └── ui/
│   │       ├── QuoteModal.tsx     # Quote request modal
│   │       ├── Reveal.tsx         # Reveal animation wrapper
│   │       ├── ScrollToTop.tsx    # Scroll to top button
│   │       └── WhatsAppButton.tsx # WhatsApp floating button
│   ├── config/
│   │   └── api.ts                 # API configuration
│   ├── hooks/
│   │   └── useAuth.ts             # Authentication hook
│   ├── pages/
│   │   ├── Home.tsx               # Home page
│   │   ├── About.tsx              # About page
│   │   ├── Contact.tsx            # Contact page
│   │   ├── Gallery.tsx            # Gallery page
│   │   ├── Services.tsx           # Services page
│   │   ├── AdminGallery.tsx       # Admin gallery management
│   │   └── NotFound.tsx           # 404 error page
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── public/
│   └── Radium.avif               # Sample image asset
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS config
├── postcss.config.cjs             # PostCSS configuration
├── eslint.config.js               # ESLint configuration
└── package.json
```

### Backend (backend/)
```
backend/
├── src/
│   ├── config/
│   │   ├── cloudinary.js          # Cloudinary setup
│   │   └── database.js            # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Auth logic
│   │   ├── contactController.js   # Contact form handling
│   │   ├── companyController.js   # Company management
│   │   ├── galleryController.js   # Gallery management
│   │   └── quoteController.js     # Quote handling
│   ├── middleware/
│   │   ├── auth.js                # Authentication middleware
│   │   ├── authMiddleware.js      # Auth validation
│   │   ├── errorHandler.js        # Error handling
│   │   ├── rateLimitMiddleware.js # Rate limiting
│   │   ├── upload.js              # File upload config
│   │   └── uploadMiddleware.js    # Upload middleware
│   ├── models/
│   │   ├── Admin.js               # Admin schema
│   │   ├── Company.js             # Company schema
│   │   ├── Contact.js             # Contact schema
│   │   ├── Gallery.js             # Gallery schema
│   │   └── Quote.js               # Quote schema
│   ├── routes/
│   │   ├── auth.js                # Auth routes
│   │   ├── authRoutes.js          # Auth route definitions
│   │   ├── admin.js               # Admin routes
│   │   ├── adminRoutes.js         # Admin route definitions
│   │   ├── public.js              # Public routes
│   │   ├── contactRoutes.js       # Contact routes
│   │   ├── galleryRoutes.js       # Gallery routes
│   │   └── quoteRoutes.js         # Quote routes
│   ├── services/
│   │   └── emailService.js        # Email sending service
│   ├── utils/
│   │   └── (utility functions)
│   └── server.js                  # Express server setup
├── uploads/
│   ├── gallery/                   # Gallery upload directory
│   └── logo/                      # Logo upload directory
├── .env                           # Environment variables
├── package.json
└── README.md
```

---

## 🔌 CORE API ENDPOINTS

### **Public Endpoints**

#### Health Check
```
GET /health
Response: { status: "ok" }
```

#### Submit Contact Form
```
POST /api/contact
Body: {
  name: string,
  email: string,
  phone: string,
  service: string (enum: radium-cutting, printing, banners, car-glass, logo-design, boards),
  message: string
}
Response: { success: true, data: { contact: {...} } }
```

#### Get Gallery Images
```
GET /api/gallery
Query: 
  - page: number (default 1)
  - limit: number (default 10)
  - service: string (optional filter)
Response: { success: true, data: { images: [...], pagination: {...} } }
```

### **Admin Authenticated Endpoints**

#### Admin Login
```
POST /api/admin/auth/login
Body: { email: string, password: string }
Response: { success: true, token: string, data: { user: {...} } }
```

#### Get All Inquiries
```
GET /api/admin/inquiries
Query:
  - page: number (default 1)
  - limit: number (default 10)
  - isRead: boolean (optional filter)
  - service: string (optional filter)
Response: { success: true, data: { inquiries: [...], pagination: {...} } }
```

#### Update Inquiry Status
```
PUT /api/admin/inquiries/:id
Body: { status: string, notes?: string }
Response: { success: true, data: { inquiry: {...} } }
```

#### Upload Gallery Images
```
POST /api/admin/gallery/upload
Body: FormData { file: File, service: string }
Response: { success: true, data: { image: {...} } }
```

#### Submit Quote Request
```
POST /api/quotes
Body: {
  name: string,
  email: string,
  phone: string,
  service: string,
  description: string,
  attachments?: File[]
}
Response: { success: true, data: { quote: {...} } }
```

---

## 🗄️ DATABASE SCHEMAS

### Contact Schema
```javascript
{
  companyId: ObjectId (reference),
  name: String (required, max 100),
  email: String (required, validated),
  phone: String (required, validated),
  message: String (required, max 1000),
  service: String (enum: [services], required),
  isRead: Boolean (default: false),
  timestamps: true (createdAt, updatedAt)
}
```

### Admin Schema
```javascript
{
  fullName: String,
  email: String (unique, required),
  password: String (hashed, required),
  role: String (enum: [superadmin, admin]),
  companyId: ObjectId (reference),
  isActive: Boolean (default: true),
  timestamps: true
}
```

### Company Schema
```javascript
{
  name: String (required),
  email: String (required),
  phone: String,
  address: String,
  website: String,
  logo: String (Cloudinary URL),
  isActive: Boolean (default: true),
  timestamps: true
}
```

### Gallery Schema
```javascript
{
  companyId: ObjectId (reference),
  title: String (required),
  description: String,
  imageUrl: String (Cloudinary URL, required),
  service: String (category),
  uploadedBy: ObjectId (Admin reference),
  isPublished: Boolean (default: true),
  timestamps: true
}
```

### Quote Schema
```javascript
{
  companyId: ObjectId (reference),
  name: String (required),
  email: String (required),
  phone: String (required),
  service: String (required),
  description: String,
  attachments: [String] (file URLs),
  status: String (enum: [pending, reviewed, quoted, rejected]),
  quotedPrice: Number,
  notes: String,
  timestamps: true
}
```

---

## ⚙️ CONFIGURATION & ENVIRONMENT VARIABLES

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/panchal_art
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRY=7d
ADMIN_EMAIL=admin@panchalart.com
ADMIN_PASSWORD=admin123
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880 (5MB)
FRONTEND_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_NOTIFICATION_EMAIL=admin@panchalart.com
```

### Frontend Configuration
- API Base URL: Configurable in `config/api.ts`
- Supabase Integration: For real-time updates
- CORS Enabled: For cross-origin requests

---

## 🚀 DEPLOYMENT

### Frontend Deployment
- **Platform:** Vercel
- **Build Command:** `npm run build`
- **Preview Command:** `npm run preview`
- **Environment:** Production-ready Vite build

### Backend Deployment
- **Platform:** Node.js compatible (Render, Railway, Heroku)
- **Database:** MongoDB Atlas for cloud storage
- **File Storage:** Cloudinary for image management
- **Environment:** Configurable for production

---

## 🔐 SECURITY FEATURES

1. **HELMET.JS:** Secure HTTP headers
2. **CORS:** Configured for multiple origins
3. **Rate Limiting:** Prevent abuse and DDoS
4. **JWT Authentication:** Secure token-based auth
5. **Password Hashing:** Bcryptjs with configurable rounds
6. **Input Validation:** Express Validator on all inputs
7. **Email Validation:** RFC compliant validation
8. **Phone Validation:** International format support
9. **SQL Injection Protection:** Mongoose ODM prevents injections
10. **Error Handling:** Centralized error handling with no sensitive info leaks

---

## 🎨 UI/UX FEATURES

1. **Smooth Page Transitions:** Framer Motion animations
2. **Responsive Design:** Mobile-first approach with Tailwind
3. **Accessibility:** WCAG compliance, reduced motion support
4. **Loading States:** Visual feedback during operations
5. **Error Messages:** User-friendly error handling
6. **Form Validation:** Real-time client-side validation
7. **WhatsApp Integration:** Direct messaging capability
8. **Scroll Animations:** Reveal components on scroll
9. **Gradient Effects:** Visual appeal with CSS gradients
10. **Smooth Scrolling:** Enhanced navigation UX

---

## 📊 PERFORMANCE OPTIMIZATIONS

1. **Vite:** Fast build and HMR
2. **Code Splitting:** Lazy loading of routes
3. **Tailwind CSS:** Optimized production builds
4. **Image Optimization:** Cloudinary format selection
5. **Database Indexing:** Multiple indexes for fast queries
6. **Rate Limiting:** Prevents server overload
7. **Compression:** Gzip compression enabled
8. **CORS:** Optimized origin checking

---

## 🧪 TESTING & QUALITY ASSURANCE

Currently configured for:
- **Linting:** ESLint with TypeScript support
- **Code Quality:** ESLint rules enforcement
- **Future:** Unit tests, integration tests, E2E tests

---

## 📱 DEVICE COMPATIBILITY

- **Desktop:** Chrome, Firefox, Safari, Edge
- **Tablet:** iPad, Android tablets
- **Mobile:** iOS (iPhone), Android phones
- **Browsers:** All modern browsers (ES2020+)

---

## 🚀 NEXT STEPS FOR IMPROVEMENT

### Performance Optimization
1. Image lazy loading with Intersection Observer
2. Service Worker for offline support
3. Caching strategies implementation
4. Database query optimization
5. CDN integration

### UI/UX Enhancement
1. Advanced animations using Framer Motion variants
2. Dark mode toggle
3. Loading skeletons instead of spinners
4. Progress indicators for long operations
5. Toast notifications for user feedback

### Features to Add
1. User authentication system
2. Booking/appointment system
3. Payment gateway integration
4. Customer portal
5. Analytics dashboard
6. Email templates
7. SMS notifications
8. Multi-language support

### Security Enhancements
1. 2FA implementation
2. OAuth authentication
3. Advanced audit logging
4. Data encryption at rest
5. API key management system

---

## 📝 DEVELOPMENT NOTES

- ES6 module syntax used throughout
- Async/await for better readability
- Custom error handling with AppError class
- Centralized configuration management
- Modular route structure
- Middleware pattern for extensibility
- Service layer for business logic separation

---

## 👥 Team & Support

- **Project Lead:** [Your Name]
- **Technologies:** MERN Stack
- **Status:** Active Development
- **Version:** 1.0.0

---

## 📄 LICENSE

ISC License - Panchal Art

---

**Last Updated:** April 2026  
**Document Version:** 1.0
