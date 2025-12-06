# 🚀 Vercel Deployment Summary

Your frontend is now ready to deploy to Vercel!

## ✅ What's Been Done

1. **API Configuration Created** (`src/config/api.ts`)
   - Centralized API base URL management
   - Environment variable support

2. **API Calls Updated**
   - ✅ Contact form now uses environment variable for API URL
   - ✅ Quote modal updated
   - ✅ Service name mapping to backend format

3. **Vercel Configuration** (`vercel.json`)
   - Build settings configured
   - SPA routing setup
   - Cache headers for assets

4. **Environment Variables Setup**
   - `VITE_API_BASE_URL` - Your Render backend URL
   - `VITE_COMPANY_ID` - Your company MongoDB ID

## 📋 Deployment Steps

### 1. Get Your Company ID

You need your company's MongoDB ObjectId. Options:

**Option A: Via Backend API** (if you have admin access)
```bash
# Login to get token, then:
curl https://panchal-art-backend.onrender.com/api/admin/company \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Option B: Create Company First**
- Use MongoDB directly or backend admin to create a company
- Copy the `_id` field

**Option C: Use MongoDB Compass/Atlas**
- Connect to your database
- Find the `companies` collection
- Copy the `_id` of your company document

### 2. Deploy to Vercel

1. **Go to**: https://vercel.com
2. **Import Project** from GitHub
3. **Configure**:
   - Framework: Vite (auto-detected)
   - Root Directory: `Panchal_Art`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variables**:
   ```
   VITE_API_BASE_URL = https://panchal-art-backend.onrender.com
   VITE_COMPANY_ID = your-company-mongodb-id-here
   ```

5. **Deploy!**

### 3. Update Backend CORS

In your Render dashboard:
1. Go to your backend service
2. Environment Variables
3. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://your-app-name.vercel.app
   ```
4. Redeploy backend

## 🧪 Testing

After deployment:
1. Visit your Vercel URL
2. Test the contact form
3. Check browser console for errors
4. Verify submissions appear in backend

## 📝 Important Notes

- **Company ID is required** - The contact form won't work without it
- **CORS must be configured** - Backend must allow your Vercel domain
- **Environment variables** - Must be set in Vercel dashboard (not in code)

## 🔗 Files Created/Modified

- ✅ `src/config/api.ts` - API configuration
- ✅ `src/pages/Contact.tsx` - Updated API calls
- ✅ `src/components/ui/QuoteModal.tsx` - Updated API calls
- ✅ `vercel.json` - Vercel configuration
- ✅ `VERCEL_DEPLOYMENT.md` - Detailed deployment guide
- ✅ `README_DEPLOYMENT.md` - Deployment checklist

---

**Ready to deploy!** Follow the steps above and your site will be live on Vercel! 🎉

