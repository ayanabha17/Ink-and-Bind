# ✅ Deployment Checklist

Complete checklist for deploying your MERN Bookstore to production.

## Pre-Deployment

### Code Quality
- [ ] All features tested locally
- [ ] No console.log() in production code
- [ ] Error handling in place
- [ ] Input validation working
- [ ] TypeScript compiles without errors
- [ ] Linting passes: `npm run lint`

### Security
- [ ] Change default admin password
- [ ] Generate new JWT_SECRET (32+ chars)
- [ ] Remove test credentials
- [ ] Update CORS origins
- [ ] Enable rate limiting
- [ ] Review environment variables

### Database
- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP whitelist configured (0.0.0.0/0 for dev, specific IPs for prod)
- [ ] Connection string obtained
- [ ] Backup enabled
- [ ] Indexes created for search fields

### Git
- [ ] .gitignore in place
- [ ] .env files NOT committed
- [ ] All code committed
- [ ] Pushed to GitHub
- [ ] Branch protection enabled

---

## Backend Deployment (Render/Railway)

### 1. Create Account
- [ ] Sign up at https://render.com or https://railway.app
- [ ] Verify email
- [ ] Connect GitHub account

### 2. Create Web Service
- [ ] Click "New Service" → "Web Service"
- [ ] Connect repository: `bookstore-mern`
- [ ] Configure:
  - [ ] Name: `bookstore-api`
  - [ ] Root Directory: `server`
  - [ ] Build Command: `npm install && npm run build`
  - [ ] Start Command: `npm start`
  - [ ] Instance Type: Free (or paid)
  - [ ] Region: Closest to users

### 3. Environment Variables
Add these to service environment:

```env
PORT=4000
NODE_ENV=production
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/bookstore
JWT_SECRET=your-32-char-secret-key
CLIENT_URL=https://bookstore-mern.vercel.app
MAX_FILE_SIZE=5242880

# Email (optional)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxx
SMTP_FROM=Bookstore <noreply@yourdomain.com>

# Stripe (optional)
STRIPE_SECRET_KEY=sk_live_xxxx
```

### 4. Deploy
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (3-5 min)
- [ ] Note URL: `https://bookstore-api.onrender.com`
- [ ] Test health: `https://your-api.onrender.com/api/health`

### 5. Configure CORS
- [ ] Update CLIENT_URL to production frontend URL
- [ ] Redeploy to apply changes

---

## Frontend Deployment (Vercel)

### 1. Create Account
- [ ] Sign up at https://vercel.com
- [ ] Connect GitHub account

### 2. Import Project
- [ ] Click "Add New" → "Project"
- [ ] Import: `bookstore-mern`
- [ ] Configure:
  - [ ] Framework Preset: Vite
  - [ ] Root Directory: `client`
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `dist`

### 3. Environment Variables
```env
VITE_API_URL=https://bookstore-api.onrender.com/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxx
```

### 4. Deploy
- [ ] Click "Deploy"
- [ ] Wait for deployment (2-3 min)
- [ ] Note URL: `https://bookstore-mern.vercel.app`

### 5. Custom Domain (Optional)
- [ ] Settings → Domains
- [ ] Add custom domain
- [ ] Configure DNS records
- [ ] Wait for SSL certificate

---

## Database (MongoDB Atlas)

### 1. Cluster Setup
- [ ] Create cluster (M0 Free or M10+)
- [ ] Choose region (closest to users)
- [ ] Wait for cluster creation

### 2. Security
- [ ] Create database user
- [ ] Set strong password
- [ ] Whitelist IPs:
  - [ ] Your IP (for development)
  - [ ] Render/Railway IP (for production)
  - [ ] Or 0.0.0.0/0 (all IPs, less secure)

### 3. Network Access
- [ ] Add IP addresses
- [ ] Enable SSL/TLS
- [ ] Test connection

### 4. Backup
- [ ] Enable continuous backup
- [ ] Set backup schedule
- [ ] Test restore process

---

## Post-Deployment Testing

### API Endpoints
- [ ] GET /api/health - Returns "OK"
- [ ] POST /api/auth/signup - Creates user
- [ ] POST /api/auth/login - Returns token
- [ ] GET /api/books - Returns books list
- [ ] GET /api/books/:id - Returns book details

### User Flow
- [ ] Sign up new account
- [ ] Verify welcome email received
- [ ] Login with credentials
- [ ] Browse books
- [ ] Add to cart
- [ ] Place order
- [ ] Verify order confirmation email
- [ ] View order history

### Admin Flow
- [ ] Login as admin
- [ ] Access /admin/books
- [ ] Create new book
- [ ] Edit book
- [ ] Delete book
- [ ] View orders at /admin/orders
- [ ] Update order status

### Payment (if enabled)
- [ ] Test card payment (test mode)
- [ ] Verify webhook delivery
- [ ] Check order status update
- [ ] Test refund flow

### Email (if enabled)
- [ ] Welcome email received
- [ ] Order confirmation received
- [ ] Password reset received
- [ ] Check spam folder

### Performance
- [ ] Page load time < 3 seconds
- [ ] API response time < 500ms
- [ ] Images optimized
- [ ] No console errors

---

## Security Hardening

### HTTPS
- [ ] Frontend: Automatic (Vercel/Netlify)
- [ ] Backend: Add Cloudflare or use Render's HTTPS
- [ ] Force HTTPS redirects

### Headers
Add to `server/src/server.ts`:

```typescript
import helmet from 'helmet';
app.use(helmet());
```

### Rate Limiting
```typescript
app.use('/api/auth', rateLimiter(10, 60000)); // 10/min
app.use('/api', rateLimiter(100, 60000)); // 100/min
```

### MongoDB
- [ ] Use strong database password
- [ ] Restrict IP whitelist
- [ ] Enable authentication
- [ ] Enable encryption at rest

### JWT
- [ ] Use 32+ character secret
- [ ] Set expiry (7-30 days)
- [ ] Use httpOnly cookies
- [ ] Implement refresh tokens

---

## Monitoring & Analytics

### Error Tracking
- [ ] Sign up at https://sentry.io
- [ ] Install SDK: `npm install @sentry/node`
- [ ] Configure DSN
- [ ] Test error reporting

### Uptime Monitoring
- [ ] Sign up at https://uptimerobot.com
- [ ] Add backend URL
- [ ] Add frontend URL
- [ ] Set check interval (5 min)
- [ ] Configure email alerts

### Analytics
- [ ] Google Analytics (frontend)
- [ ] Mixpanel (user events)
- [ ] LogRocket (session replay)

### Logs
- [ ] Render logs enabled
- [ ] MongoDB logs enabled
- [ ] Set log retention

---

## Performance Optimization

### Backend
- [ ] Enable compression
- [ ] Add caching headers
- [ ] Use MongoDB indexes
- [ ] Implement query pagination
- [ ] Enable gzip compression

```typescript
// In server.ts
import compression from 'compression';
app.use(compression());
```

### Frontend
- [ ] Build optimized: `npm run build`
- [ ] Enable code splitting
- [ ] Lazy load routes
- [ ] Optimize images
- [ ] Use CDN for assets

### Database
- [ ] Add indexes:
  ```javascript
  db.books.createIndex({ title: 'text', author: 'text' })
  db.books.createIndex({ categories: 1 })
  db.orders.createIndex({ user: 1, createdAt: -1 })
  ```
- [ ] Use aggregation pipeline
- [ ] Enable query profiler
- [ ] Monitor slow queries

---

## Backup Strategy

### Automated Backups
- [ ] MongoDB Atlas: Daily backups
- [ ] Code: GitHub (automatic)
- [ ] Environment variables: Secure backup

### Manual Backups
- [ ] Export database monthly
- [ ] Document all environment variables
- [ ] Backup upload files (S3/Cloudinary)

### Disaster Recovery
- [ ] Document restore process
- [ ] Test restore procedure
- [ ] Keep credentials secure

---

## Documentation

### User Documentation
- [ ] README.md complete
- [ ] API documentation
- [ ] User guide
- [ ] FAQ page

### Developer Documentation
- [ ] SETUP.md
- [ ] DEPLOYMENT.md
- [ ] CONTRIBUTING.md
- [ ] Architecture diagram

### Internal Documentation
- [ ] Environment variables documented
- [ ] Deployment process documented
- [ ] Rollback procedure documented
- [ ] Contact information

---

## Launch Checklist

### Final Checks
- [ ] All tests passing
- [ ] No critical bugs
- [ ] Admin password changed
- [ ] Test accounts created
- [ ] Sample data seeded
- [ ] CORS configured correctly
- [ ] All environment variables set
- [ ] Domain configured (if custom)
- [ ] SSL certificate active
- [ ] Monitoring enabled
- [ ] Backups enabled

### Go Live!
- [ ] Remove maintenance mode
- [ ] Announce launch
- [ ] Monitor for errors
- [ ] Collect user feedback
- [ ] Celebrate! 🎉

---

## Post-Launch

### Week 1
- [ ] Monitor error logs daily
- [ ] Check uptime reports
- [ ] Respond to user feedback
- [ ] Fix critical bugs
- [ ] Optimize performance

### Week 2-4
- [ ] Analyze user behavior
- [ ] Add new features
- [ ] Improve documentation
- [ ] Optimize SEO
- [ ] Marketing efforts

### Ongoing
- [ ] Weekly backups check
- [ ] Monthly security review
- [ ] Quarterly performance audit
- [ ] Regular feature updates

---

## Troubleshooting

### Common Issues

**MongoDB Connection Failed**
```bash
# Check connection string
echo $MONGO_URI

# Test connection
mongosh "mongodb+srv://..."

# Verify IP whitelist
MongoDB Atlas → Network Access
```

**CORS Errors**
```bash
# Check CLIENT_URL matches frontend
# Include /api in backend URL for frontend
CLIENT_URL=https://bookstore-mern.vercel.app
VITE_API_URL=https://bookstore-api.onrender.com/api
```

**Environment Variables Not Loading**
```bash
# Redeploy after adding env vars
# Verify in dashboard
# Check for typos
```

**500 Errors**
```bash
# Check logs
Render → Logs

# Check database connection
# Verify environment variables
```

**Slow Performance**
```bash
# Check MongoDB slow queries
# Add indexes
# Enable compression
# Use CDN for images
```

---

## Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Stripe**: https://stripe.com/docs

---

**Deployment Complete!** 🚀🎉
