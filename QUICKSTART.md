# 🚀 Quick Start - Ink and Bind (Main Directory)

## ✅ Project Moved Successfully!

**New Location:** `C:\Users\ayana\ink-and-bind`

Everything is ready to use with MongoDB Atlas already configured.

---

## 🎯 Start the Project (3 Steps)

### Step 1: Backend Setup
```powershell
cd C:\Users\ayana\ink-and-bind\server
npm install
```

### Step 2: Start Backend (Terminal 1)
```powershell
npm run dev
```

**Expected output:**
```
MongoDB connected
Server running on port 4000
```

### Step 3: Start Frontend (Terminal 2)
```powershell
cd C:\Users\ayana\ink-and-bind\client
npm install
npm run dev
```

**Expected output:**
```
VITE v5.0.0  ready in XXX ms
Local: http://localhost:5173
```

---

## 📱 Access the App

Open your browser:
```
http://localhost:5173
```

Should see: **📚 Ink and Bind**

---

## 🔑 Test Login

**Admin Account:**
- Email: `admin@inkandbind.test`
- Password: `admin123`

**User Account:**
- Email: `user@inkandbind.test`
- Password: `user123`

---

## ✨ Available Commands

### Backend
```powershell
cd C:\Users\ayana\ink-and-bind\server

npm run dev        # Start development server (hot reload)
npm run build      # Compile TypeScript
npm run seed       # Populate database with sample data
npm run lint       # Check code quality
```

### Frontend
```powershell
cd C:\Users\ayana\ink-and-bind\client

npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Check code quality
```

---

## 🔧 Configuration

Both `.env` files are already configured with:

**server/.env:**
- ✅ MongoDB Atlas connection
- ✅ JWT secret
- ✅ Port 4000
- ✅ Client URL

**client/.env:**
- ✅ API endpoint: `http://localhost:4000/api`

---

## 📚 Features

✅ User Authentication (JWT)
✅ Book Management
✅ Shopping Cart
✅ Order System
✅ Admin Dashboard
✅ Reviews & Ratings
✅ Image Uploads

---

## 🐛 Common Issues

### "npm: command not found"
Node.js is not installed. Download from: https://nodejs.org/

### "Port 4000 already in use"
Change PORT in `server/.env` to `4001`

### "MongoDB connection error"
Check MongoDB Atlas credentials in `server/.env`

### "Frontend won't load"
Make sure backend is running on port 4000

---

## 📁 Project Structure

```
C:\Users\ayana\ink-and-bind\
├── server/                 # Express.js backend
│   ├── src/server.ts
│   ├── package.json
│   ├── .env               (MongoDB Atlas configured)
│   └── tsconfig.json
│
├── client/                # React + Vite frontend
│   ├── src/
│   ├── package.json
│   ├── .env               (API endpoint configured)
│   └── index.html
│
└── README.md
```

---

## 🎉 You're All Set!

Just run the commands above and start building! 🚀
