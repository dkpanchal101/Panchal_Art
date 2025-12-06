# Vercel Deployment Guide for Panchal Art Frontend

## Prerequisites

- ✅ Backend deployed on Render: `https://panchal-art-backend.onrender.com`
- ✅ GitHub repository with your code
- ✅ Vercel account (free tier works)

## Step 1: Update Environment Variables

Before deploying, make sure your `.env` file has the correct backend URL:

```env
VITE_API_BASE_URL=https://panchal-art-backend.onrender.com
```

**Important**: The `.env` file is gitignored, so you'll need to set this in Vercel's dashboard.

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**: https://vercel.com and sign in (or create an account)

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the `Panchal_Art` folder (or the root if that's your repo structure)

3. **Configure Project**:
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `Panchal_Art` (if deploying from root repo)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables**:
   - Click "Environment Variables"
   - Add: `VITE_API_BASE_URL` = `https://panchal-art-backend.onrender.com`
   - Make sure it's set for **Production**, **Preview**, and **Development**

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (usually 1-2 minutes)

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Navigate to Frontend Directory**:
   ```bash
   cd Panchal_Art
   ```

4. **Deploy**:
   ```bash
   vercel
   ```
   - Follow the prompts
   - When asked for environment variables, add: `VITE_API_BASE_URL=https://panchal-art-backend.onrender.com`

5. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

## Step 3: Update Backend CORS Settings

Make sure your backend on Render allows requests from your Vercel domain:

1. Go to your Render dashboard
2. Find your backend service
3. Go to Environment variables
4. Update `FRONTEND_URL` to your Vercel domain:
   ```
   FRONTEND_URL=https://your-app-name.vercel.app
   ```
5. Redeploy your backend service

Or update `backend/src/server.js` CORS configuration to include your Vercel URL.

## Step 4: Verify Deployment

After deployment:

1. **Check your Vercel domain**: `https://your-app-name.vercel.app`
2. **Test the contact form**: Make sure it submits to your Render backend
3. **Check browser console**: Look for any CORS or API errors

## Troubleshooting

### CORS Errors

If you see CORS errors:
- Make sure `FRONTEND_URL` in your Render backend includes your Vercel domain
- Check that the backend CORS configuration allows your Vercel origin

### API Not Working

- Verify `VITE_API_BASE_URL` is set correctly in Vercel environment variables
- Check that your backend is running on Render
- Test the backend URL directly: `https://panchal-art-backend.onrender.com/health`

### Build Errors

- Make sure all dependencies are in `package.json`
- Check that `node_modules` is not committed (should be in `.gitignore`)
- Verify TypeScript/ESLint errors are resolved

### Environment Variables Not Working

- In Vercel, environment variables must be set for the correct environment (Production/Preview/Development)
- Vite requires `VITE_` prefix for environment variables
- After adding env vars, redeploy the project

## Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Continuous Deployment

Vercel automatically deploys when you push to:
- `main` branch → Production
- Other branches → Preview deployments

Every push to GitHub will trigger a new deployment!

---

## Quick Checklist

- [ ] Backend deployed on Render
- [ ] GitHub repository connected to Vercel
- [ ] Environment variable `VITE_API_BASE_URL` set in Vercel
- [ ] Backend CORS updated to allow Vercel domain
- [ ] Build successful
- [ ] Site accessible on Vercel domain
- [ ] Contact form working
- [ ] No console errors

---

**Your frontend is now live on Vercel!** 🚀

