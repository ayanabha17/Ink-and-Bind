# 🚀 Quick Start Guide

Get your MERN Bookstore running in 5 minutes!

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org))
- Git ([Install](https://git-scm.com))
- MongoDB (local or Atlas)

---

## Option A: Local MongoDB (Fastest)

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/bookstore-mern.git
cd bookstore-mern
```

### 2. Install MongoDB

**Windows:**
```bash
# Download from https://www.mongodb.com/try/download/community
# Run installer
```

**Mac:**
```bash
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
# Follow https://docs.mongodb.com/manual/administration/install-on-linux
```

### 3. Setup Backend

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# .env should have:
# MONGO_URI=mongodb://localhost:27017/bookstore
# JWT_SECRET=your-secret-key-change-this
# PORT=4000
# CLIENT_URL=http://localhost:5173

# Seed database
npm run seed

# Start server
npm run dev
```

✅ Server running at http://localhost:4000

### 4. Setup Frontend

Open new terminal:

```bash
cd client

# Install dependencies
npm install

# Start dev server
npm run dev
```

✅ Frontend running at http://localhost:5173

### 5. Test

1. Open http://localhost:5173
2. Login: `admin@bookstore.test` / `admin123`
3. Browse books!

---

## Option B: MongoDB Atlas (Cloud)

### 1. Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create free cluster (M0)

### 2. Get Connection String

1. Click "Connect" on cluster
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<password>` with your password

Example:
```
mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/bookstore
```

### 3. Clone & Setup

```bash
git clone https://github.com/YOUR_USERNAME/bookstore-mern.git
cd bookstore-mern

# Backend
cd server
npm install

# Create .env
cat > .env << EOF
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/bookstore
JWT_SECRET=your-32-char-secret-key
PORT=4000
CLIENT_URL=http://localhost:5173
EOF

npm run seed
npm run dev

# Frontend (new terminal)
cd client
npm install
npm run dev
```

✅ Both running!

---

## Quick Test

### API Health Check

```bash
curl http://localhost:4000/api/health
# Should return: "OK"
```

### Create User via API

```bash
curl -X POST http://localhost:4000/api/auth/signup   -H "Content-Type: application/json"   -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123"
  }'
```

### List Books

```bash
curl http://localhost:4000/api/books | jq
```

---

## Default Credentials

| Role  | Email                     | Password   |
|-------|---------------------------|------------|
| Admin | admin@bookstore.test      | admin123   |
| User  | user@bookstore.test       | user123    |

---

## Common Issues

### "MongoServerError: bad auth"

```bash
# Check MONGO_URI in .env
# Verify username/password
# For local: MONGO_URI=mongodb://localhost:27017/bookstore
```

### "Port 4000 already in use"

```bash
# Change PORT in .env to 4001
# Or kill existing process:
# Windows: netstat -ano | findstr :4000
# Mac/Linux: lsof -i :4000
```

### "Cannot find module"

```bash
# Reinstall dependencies
npm install

# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Frontend Won't Load

```bash
# Check backend is running
curl http://localhost:4000/api/health

# Check VITE_API_URL in client/.env
# Should be: http://localhost:4000/api
```

### CORS Errors

```bash
# In server/.env:
CLIENT_URL=http://localhost:5173

# In client/.env:
VITE_API_URL=http://localhost:4000/api
```

---

## Next Steps

### Enable Email (Optional)

```bash
cd server
npm install nodemailer @types/nodemailer

# Add to .env:
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Enable Payments (Optional)

```bash
cd server
npm install stripe @types/stripe

# Add to .env:
STRIPE_SECRET_KEY=sk_test_xxxx
```

### Deploy to Production

See `docs/DEPLOYMENT_CHECKLIST.md`

---

## Development Commands

```bash
# Backend
cd server
npm run dev      # Start with hot reload
npm run build    # Compile TypeScript
npm run seed     # Seed database
npm run lint     # Run ESLint

# Frontend
cd client
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run ESLint
```

---

## Folder Structure

```
bookstore-mern/
├── server/           # Backend
│   ├── src/
│   │   ├── routes/   # API endpoints
│   │   ├── models/   # Database schemas
│   │   └── utils/    # Email, seed, etc.
│   └── .env          # Environment variables
├── client/           # Frontend
│   ├── src/
│   │   ├── pages/    # React components
│   │   └── components/
│   └── .env          # Environment variables
└── docs/             # Documentation
```

---

## Support

- **Docs**: See `docs/` folder
- **Issues**: GitHub Issues
- **Questions**: Open issue or email support

---

**Happy Coding!** 🚀📚
