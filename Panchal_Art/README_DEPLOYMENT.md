# Deployment Checklist

## Before Deploying to Vercel

### 1. Environment Variables Setup

You need to set these environment variables in Vercel:

1. **VITE_API_BASE_URL**
   - Value: `https://panchal-art-backend.onrender.com`
   - This is your backend API URL

2. **VITE_COMPANY_ID** (Required)
   - Value: Your company's MongoDB ObjectId
   - You can find this by:
     - Logging into your backend admin panel
     - Or querying your MongoDB database
     - Or creating a company via the backend API first

### 2. Get Your Company ID

If you don't have a company ID yet, you need to:

1. **Create a company in your backend**:
   - Use the admin API to create a company
   - Or use MongoDB directly to create a company document
   - The `_id` field is your company ID

2. **Example MongoDB document**:
   ```json
   {
     "_id": "507f1f77bcf86cd799439011",
     "companyName": "Panchal Art",
     "email": "info@panchalart.com",
     ...
   }
   ```

### 3. Update Backend CORS

Make sure your backend on Render allows your Vercel domain:

1. Go to Render dashboard → Your backend service
2. Environment variables → Add/Update:
   ```
   FRONTEND_URL=https://your-app-name.vercel.app
   ```
3. Redeploy your backend

### 4. Service Mapping

The contact form maps service names to backend format:
- "Radium Cutting & Custom Design" → "radium-cutting"
- "Stylish Name Printing & Lettering" → "printing"
- "Multi-color Radium Boards & Cutting" → "boards"
- "Car Glass Film Pasting" → "car-glass"
- "Shop & Stage Banners & Posters" → "banners"
- "Logo & Poster Design, Digital Design" → "logo-design"

---

## Quick Setup Steps

1. ✅ Backend deployed on Render
2. ✅ Get/create Company ID from backend
3. ✅ Set `VITE_API_BASE_URL` in Vercel
4. ✅ Set `VITE_COMPANY_ID` in Vercel
5. ✅ Update backend `FRONTEND_URL` to your Vercel domain
6. ✅ Deploy to Vercel
7. ✅ Test contact form

---

## Testing After Deployment

1. Open your Vercel URL
2. Go to Contact page
3. Fill out and submit the form
4. Check browser console for errors
5. Verify the submission appears in your backend

