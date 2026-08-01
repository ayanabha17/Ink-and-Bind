# Deployment Guide

This guide will help you deploy the MERN Bookstore to production.

## Prerequisites

- GitHub account
- MongoDB Atlas account (free tier available)
- Render account (free tier available) or Railway/Heroku
- Vercel account (free tier available)

## Step 1: Database - MongoDB Atlas

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free
   - Create a new cluster (M0 Free tier)

2. **Configure Database**
   - Choose cloud provider and region (closest to your users)
   - Click "Create Cluster"
   - Wait for cluster to be ready (2-3 minutes)

3. **Create Database User**
   - Click "Database Access" in left sidebar
   - Add New Database User
   - Choose "Password" authentication
   - Create username and strong password
   - Set user privileges to "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**
   - Click "Network Access" in left sidebar
   - Add IP Address
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - For development, this is fine. For production, restrict to your server IPs

5. **Get Connection String**
   - Click "Clusters" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `bookstore`

   Example:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bookstore?retryWrites=true&w=majority
   ```

## Step 2: Backend - Deploy to Render

1. **Prepare Repository**
   - Ensure your code is pushed to GitHub

2. **Create Web Service**
   - Go to https://render.com
   - Sign up/Login
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: bookstore-api
     - **Environment**: Node
     - **Region**: Choose closest to your users
     - **Root Directory**: `server`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Instance Type**: Free

3. **Add Environment Variables**
   Click "Environment" and add:
   ```
   PORT=4000
   MONGO_URI=<your_mongodb_atlas_connection_string>
   JWT_SECRET=<generate_strong_random_string_32_chars>
   NODE_ENV=production
   CLIENT_URL=https://your-app.vercel.app
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (3-5 minutes)
   - Note your backend URL (e.g., `https://bookstore-api.onrender.com`)

5. **Seed Database**
   - In your local terminal:
   ```bash
   cd server
   # Update .env with production MONGO_URI
   npm run seed
   ```

## Step 3: Frontend - Deploy to Vercel

1. **Prepare Repository**
   - Ensure your code is pushed to GitHub

2. **Import Project**
   - Go to https://vercel.com
   - Sign up/Login
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `client`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment (2-3 minutes)
   - Note your frontend URL (e.g., `https://bookstore-mern.vercel.app`)

## Step 4: Update Backend CORS

Update your backend environment variable on Render:
```
CLIENT_URL=https://bookstore-mern.vercel.app
```

This allows your frontend to communicate with the backend.

## Step 5: Test Production Deployment

1. Visit your frontend URL
2. Try signing up a new account
3. Browse books
4. Add items to cart
5. Place an order
6. Login as admin (admin@bookstore.test / admin123)
7. Check admin dashboard

## Alternative Deployments

### Backend Options

**Railway**
- Similar to Render
- https://railway.app
- Often faster deployments

**Heroku**
- https://www.heroku.com
- Free tier discontinued, but affordable

**DigitalOcean App Platform**
- https://www.digitalocean.com/products/app-platform
- Good performance, affordable

### Frontend Options

**Netlify**
- https://www.netlify.com
- Similar to Vercel
- Excellent for React apps

**GitHub Pages**
- Free hosting
- Requires build configuration

## Production Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP whitelist configured
- [ ] Connection string obtained
- [ ] Backend deployed to Render
- [ ] All environment variables set
- [ ] Database seeded
- [ ] Frontend deployed to Vercel
- [ ] CORS configured correctly
- [ ] Test all features in production
- [ ] Update admin credentials in production
- [ ] Set up monitoring (optional)

## Troubleshooting

### Backend Issues

**MongoDB Connection Error**
- Check connection string format
- Verify database user credentials
- Ensure IP is whitelisted

**CORS Errors**
- Verify CLIENT_URL matches your frontend URL exactly
- Check for trailing slashes

### Frontend Issues

**API Calls Failing**
- Check VITE_API_URL environment variable
- Ensure backend is running and accessible
- Check browser console for errors

**Build Failures**
- Ensure all dependencies are in package.json
- Check for TypeScript errors

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong JWT_SECRET (32+ characters)
   - Rotate secrets periodically

2. **Database**
   - Use strong database passwords
   - Restrict IP whitelist in production
   - Enable MongoDB Atlas backups

3. **Authentication**
   - Enforce HTTPS in production
   - Use httpOnly cookies for tokens
   - Implement rate limiting

4. **Input Validation**
   - All inputs are validated
   - Sanitize user-generated content

## Monitoring

Consider adding:
- **Sentry** for error tracking
- **LogRocket** for session replay
- **Google Analytics** for usage metrics
- **Uptime Robot** for monitoring

---

**Happy Deploying!** 🚀
