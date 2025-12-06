# Panchal Art - Service Design Business Website

A complete full-stack application for a service design business with admin panel and customer-facing website.

## 🏗️ Project Structure

```
Panchal Art/
├── Panchal_Art/     # Frontend (React + Vite)
└── backend/         # Backend (Node.js + Express + MongoDB)
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Frontend Setup

```bash
cd Panchal_Art
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/panchal_art
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRY=7d
ADMIN_EMAIL=admin@panchalart.com
ADMIN_PASSWORD=admin123
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
FRONTEND_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

## 📁 Features

### Frontend (Panchal_Art)
- Modern React application with Vite
- Tailwind CSS for styling
- Responsive design
- Customer-facing gallery and contact forms

### Backend
- RESTful API with Express.js
- MongoDB database with Mongoose
- JWT authentication
- Role-based access control (Admin/Superadmin)
- Image upload handling
- Company-based multi-tenancy
- Comprehensive error handling
- Rate limiting and security headers

## 📡 API Documentation

See [backend/API_DOCUMENTATION.md](./backend/API_DOCUMENTATION.md) for complete API documentation.

## 🔐 Authentication

The backend uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 🗃️ Database Models

- **Admin** - Admin users with company association
- **Company** - Company information and branding
- **Gallery** - Gallery images with categories
- **Contact** - Customer inquiries

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- TypeScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer (file uploads)
- Express Validator
- Helmet (security)
- Morgan (logging)

## 📝 Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload

## 🚀 Deployment

### Environment Variables for Production

Update the `.env` file with production values:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/panchal_art
JWT_SECRET=super_secure_production_secret
FRONTEND_URL=https://your-frontend-domain.com
```

## 📄 License

This project is licensed under the ISC License.

---

**Panchal Art** - Professional Art & Design Services

