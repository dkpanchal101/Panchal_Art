# Panchal Art Backend API

Backend API for Panchal Art website built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configurations:
   ```env
   MONGODB_URI=mongodb://localhost:27017/panchal_art
   JWT_SECRET=your_super_secret_jwt_key_here
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

4. **Test the API:**
   ```bash
   curl http://localhost:5000/health
   ```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Database & app configuration
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   └── utils/           # Helper functions
├── uploads/             # Temporary file storage
├── .env                 # Environment variables
└── package.json
```

## 🛠️ Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm test` - Run tests (coming soon)

## 📡 API Endpoints

### Public Endpoints
- `GET /health` - Health check
- `POST /api/contact` - Submit contact form
- `POST /api/quotes` - Submit quote request (coming soon)
- `GET /api/gallery` - Get gallery images (coming soon)

### Admin Endpoints (Protected)
- `POST /api/auth/login` - Admin login (coming soon)
- `GET /api/admin/dashboard` - Admin dashboard (coming soon)
- `GET /api/contact` - Get all contacts (admin only)
- `PUT /api/contact/:id` - Update contact status (admin only)

## 🗃️ Database Models

### Contact
- Customer contact form submissions
- Status tracking (new, contacted, quoted, completed)
- Email notifications to admin

### Quote (Coming Soon)
- Multi-step quote requests
- File upload support
- Price estimation and tracking

### Gallery (Coming Soon)
- Image management with categories
- Cloudinary integration
- SEO optimization

### Admin (Coming Soon)
- Admin user management
- JWT authentication
- Role-based access control

## 🔐 Security Features

- Rate limiting on all endpoints
- Input validation and sanitization
- JWT-based authentication
- Password hashing with bcrypt
- CORS configuration
- Security headers with Helmet

## 📧 Email Features

- Contact form notifications
- Auto-reply to customers
- Quote request notifications
- HTML email templates

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/panchal_art
JWT_SECRET=super_secure_production_secret
FRONTEND_URL=https://your-frontend-domain.com
```

### Deploy to Railway/Render
1. Push code to GitHub
2. Connect your repository
3. Set environment variables
4. Deploy!

## 📝 Development Roadmap

### ✅ Phase 1: Foundation (Completed)
- [x] Project structure setup
- [x] MongoDB connection
- [x] Contact form API
- [x] Email service
- [x] Rate limiting
- [x] Basic security

### 🔄 Phase 2: Core Features (Next)
- [ ] Quote request API with file uploads
- [ ] Gallery management API
- [ ] Admin authentication
- [ ] Admin dashboard

### 📋 Phase 3: Advanced Features
- [ ] Image optimization
- [ ] Analytics and reporting
- [ ] Email templates
- [ ] Automated follow-ups

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

**Panchal Art** - Professional Art & Design Services
