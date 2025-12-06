# Panchal Art Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most admin endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Public Endpoints

### Gallery

#### Get Published Gallery Images
```
GET /api/public/gallery/:companyId
```
**Query Parameters:**
- `category` (optional): Filter by category
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "gallery": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "pages": 3
    }
  }
}
```

#### Get Gallery Categories
```
GET /api/public/gallery/:companyId/categories
```
**Response:**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "category": "radium-cutting",
        "displayName": "Radium Cutting",
        "count": 10
      }
    ]
  }
}
```

### Company

#### Get Public Company Details
```
GET /api/public/company/:companyId
```

### Contact

#### Submit Customer Inquiry
```
POST /api/public/contact
```
**Body:**
```json
{
  "companyId": "company_id_here",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "I need help with...",
  "service": "radium-cutting"
}
```

**Service Categories:**
- `radium-cutting`
- `printing`
- `banners`
- `car-glass`
- `logo-design`
- `boards`

---

## Admin Authentication Endpoints

### Register Admin (Superadmin Only)
```
POST /api/admin/auth/register
```
**Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123",
  "fullName": "Admin Name",
  "role": "admin",
  "companyId": "company_id_here"
}
```

### Login
```
POST /api/admin/auth/login
```
**Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "token": "jwt_token_here",
  "data": {
    "user": {...}
  }
}
```

### Logout
```
POST /api/admin/auth/logout
```

### Refresh Token
```
POST /api/admin/auth/refresh-token
```

### Get Current User
```
GET /api/admin/auth/me
```

---

## Admin Gallery Management

### Get All Gallery Images
```
GET /api/admin/gallery
```
**Query Parameters:**
- `page` (optional)
- `limit` (optional)
- `category` (optional)
- `isPublished` (optional: true/false)

### Create Gallery Image
```
POST /api/admin/gallery
```
**Form Data:**
- `image` (file): Image file (jpg, jpeg, png, max 5MB)
- `title` (string, required)
- `description` (string, optional)
- `category` (string, required)
- `displayOrder` (number, optional)
- `isPublished` (boolean, optional)

### Get Gallery Image by ID
```
GET /api/admin/gallery/:id
```

### Update Gallery Image
```
PUT /api/admin/gallery/:id
```
**Form Data:** (all fields optional)
- `image` (file, optional)
- `title` (string, optional)
- `description` (string, optional)
- `category` (string, optional)
- `displayOrder` (number, optional)
- `isPublished` (boolean, optional)

### Delete Gallery Image
```
DELETE /api/admin/gallery/:id
```

### Toggle Publish Status
```
PUT /api/admin/gallery/:id/publish
```

### Get Gallery Statistics
```
GET /api/admin/gallery/stats
```
**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "total": 50,
      "published": 45,
      "unpublished": 5,
      "byCategory": {
        "radium-cutting": {
          "total": 10,
          "published": 8
        }
      }
    }
  }
}
```

---

## Admin Company Management

### Get Company Details
```
GET /api/admin/company
```

### Update Company Details
```
PUT /api/admin/company
```
**Body:**
```json
{
  "companyName": "Company Name",
  "description": "Description",
  "website": "https://example.com",
  "phone": "+1234567890",
  "email": "company@example.com",
  "address": "123 Street",
  "city": "City",
  "state": "State",
  "country": "Country",
  "primaryColor": "#000000",
  "secondaryColor": "#ffffff"
}
```

### Upload Company Logo
```
POST /api/admin/company/logo
```
**Form Data:**
- `logo` (file): Logo image (jpg, jpeg, png, max 5MB)

### Get Company Settings
```
GET /api/admin/company/settings
```

---

## Admin Customer Inquiries

### Get All Inquiries
```
GET /api/admin/inquiries
```
**Query Parameters:**
- `page` (optional)
- `limit` (optional)
- `isRead` (optional: true/false)
- `service` (optional)

### Get Inquiry by ID
```
GET /api/admin/inquiries/:id
```

### Mark Inquiry as Read
```
PUT /api/admin/inquiries/:id/read
```

### Delete Inquiry
```
DELETE /api/admin/inquiries/:id
```

---

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error message here"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Notes

1. All file uploads are limited to 5MB
2. Supported image formats: JPG, JPEG, PNG
3. JWT tokens expire after 7 days (configurable)
4. Rate limiting: 100 requests per 15 minutes (general), 50 requests per 15 minutes (public endpoints)
5. All admin endpoints require authentication and company access verification

