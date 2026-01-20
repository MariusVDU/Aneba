# Deployment Guide - Ameba Game Store

## 🚀 Free Hosting with Railway (Recommended)

This application is configured for free deployment on [Railway.app](https://railway.app) - **NO credit card required!**

### Prerequisites

1. **GitHub account** - Your code should be on GitHub (already done ✅)
2. **Railway account** - Sign up at https://railway.app (free)

### Deployment Steps

1. **Go to https://railway.app**
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `Aneba` repository
5. Railway will automatically:
   - Detect Node.js project
   - Install dependencies
   - Build frontend (`npm run build`)
   - Start server with `npm run start:prod`
6. **Done!** Your app will be live at: `https://ameba-production.up.railway.app`

### Features on Railway Free Tier

- ✅ **$5 credit per month** (lasts ~500 hours of uptime)
- ✅ **No credit card** required
- ✅ Automatic HTTPS/SSL
- ✅ Auto-deploy on git push
- ✅ Environment variables support
- ✅ Custom domains (optional)

### Monitoring

- Railway Dashboard shows: logs, metrics, deployments
- Your app URL: Check "Deployments" tab
- Logs: Real-time in Railway dashboard

---

## Alternative: Render (Requires Credit Card)

This application is also configured for [Render](https://render.com).

### Prerequisites

1. **GitHub account** - Push your code to GitHub
2. **Render account** - Sign up at https://render.com (free)

### Option 1: Automatic Deploy (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Render:**
   - Go to https://dashboard.render.com
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will auto-detect `render.yaml` and create:
     - Backend service (Node.js API)
     - Frontend service (Static site)

3. **Configure Environment (if needed):**
   - Backend will run on assigned URL (e.g., `https://ameba-backend.onrender.com`)
   - Update frontend API calls to use backend URL

4. **Access your app:**
   - Frontend: `https://ameba-frontend.onrender.com`
   - Backend API: `https://ameba-backend.onrender.com/list`

### Option 2: Manual Deploy

#### Deploy Backend:

1. Go to https://dashboard.render.com
2. Click "New" → "Web Service"
3. Connect repository
4. Configure:
   - **Name:** ameba-backend
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server/index.js`
   - **Instance Type:** Free

#### Deploy Frontend:

1. Click "New" → "Static Site"
2. Connect same repository
3. Configure:
   - **Name:** ameba-frontend
   - **Build Command:** `cd client && npm install && npm run build`
   - **Publish Directory:** `client/dist`

### Important Notes

⚠️ **Database Persistence:**
- SQLite on free tier resets on service restart
- For production, consider upgrading to Render PostgreSQL (free tier available)
- Or use another free database service (Supabase, PlanetScale)

⚠️ **Cold Start:**
- Free tier services sleep after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up

⚠️ **Backend URL in Frontend:**
- Update `client/src/App.jsx` to use production backend URL:
  ```javascript
  const BACKEND_URL = process.env.NODE_ENV === 'production' 
    ? 'https://ameba-backend.onrender.com'
    : 'http://localhost:5000';
  ```

## Alternative Free Hosting Options

### Railway (railway.app)
- $5 free credit monthly
- Single command deploy
- Better for small apps

### Fly.io
- Free tier includes 3 apps
- Better performance
- More complex setup

### Vercel + Serverless
- Frontend on Vercel (excellent)
- Backend needs refactor to serverless functions

## Monitoring

- **Render Dashboard:** Monitor logs, metrics, deployments
- **Health Check:** Add `/health` endpoint to backend
- **Uptime Monitoring:** Use UptimeRobot (free) to prevent cold starts

## Troubleshooting

### Frontend can't reach backend:
- Check CORS is enabled in `server/index.js` ✅ (already configured)
- Verify backend URL in frontend code
- Check Render logs for backend errors

### Database resets:
- Expected on free tier
- Consider persistent storage solution for production
- Seed data runs automatically on startup ✅

### Build fails:
- Check Node.js version compatibility
- Verify all dependencies in `package.json`
- Check Render build logs
