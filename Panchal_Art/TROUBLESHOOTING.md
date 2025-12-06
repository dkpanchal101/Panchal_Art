# Troubleshooting Contact Form Network Error

## Common Issues and Solutions

### Issue: "Network error. Please check your connection and try again."

This error typically occurs due to one of these reasons:

### 1. **CORS Configuration** (Most Common)

**Problem:** Backend is not allowing requests from your Vercel domain.

**Solution:**
1. Go to your Render dashboard
2. Navigate to your backend service
3. Go to **Environment** tab
4. Add/Update the `FRONTEND_URL` variable:
   ```
   FRONTEND_URL=https://panchalart.vercel.app
   ```
   (Replace with your actual Vercel domain)
5. **Redeploy** your backend service

### 2. **Missing Environment Variables in Vercel**

**Problem:** API URL or Company ID not set in Vercel.

**Solution:**
1. Go to your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Add these variables:
   - `VITE_API_BASE_URL` = `https://panchal-art-backend.onrender.com`
   - `VITE_COMPANY_ID` = `your-company-mongodb-id`
4. **Redeploy** your Vercel project

### 3. **Backend Not Running**

**Problem:** Backend service might be sleeping (free tier) or down.

**Solution:**
1. Check your Render dashboard - is the service running?
2. Test the backend directly:
   ```
   https://panchal-art-backend.onrender.com/health
   ```
3. If it's sleeping, it may take 30-60 seconds to wake up

### 4. **Company ID Not Set**

**Problem:** `VITE_COMPANY_ID` environment variable is missing or empty.

**Solution:**
1. Get your Company ID from MongoDB or backend
2. Set it in Vercel environment variables
3. Redeploy

### 5. **API Endpoint Mismatch**

**Problem:** The API endpoint might be incorrect.

**Check:**
- Open browser console (F12)
- Look for the log: "Submitting to: [URL]"
- Verify the URL is correct

## Debugging Steps

1. **Open Browser Console** (F12)
2. **Submit the form**
3. **Check the console logs:**
   - What URL is it trying to reach?
   - What's the error message?
   - Is Company ID set?

4. **Test Backend Directly:**
   ```bash
   curl -X POST https://panchal-art-backend.onrender.com/api/public/contact \
     -H "Content-Type: application/json" \
     -d '{
       "companyId": "YOUR_COMPANY_ID",
       "name": "Test",
       "email": "test@example.com",
       "phone": "+919876543210",
       "message": "Test message",
       "service": "radium-cutting"
     }'
   ```

5. **Check Network Tab:**
   - Open DevTools → Network tab
   - Submit form
   - Look for the failed request
   - Check the error status and message

## Quick Checklist

- [ ] `FRONTEND_URL` set in Render backend environment variables
- [ ] Backend service is running on Render
- [ ] `VITE_API_BASE_URL` set in Vercel environment variables
- [ ] `VITE_COMPANY_ID` set in Vercel environment variables
- [ ] Both services have been redeployed after setting variables
- [ ] Backend CORS allows your Vercel domain
- [ ] No typos in environment variable names

## Still Not Working?

1. Check browser console for detailed error messages
2. Verify backend is accessible: `https://panchal-art-backend.onrender.com/health`
3. Check Render logs for backend errors
4. Check Vercel deployment logs for frontend errors

