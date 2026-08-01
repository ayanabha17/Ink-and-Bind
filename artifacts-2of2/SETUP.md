# 🚀 Complete Setup Guide

Follow this guide to get your MERN Bookstore running locally in under 10 minutes.

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/bookstore-mern.git
cd bookstore-mern
```

### 2. Install MongoDB

**Option A: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create free cluster (M0)
4. Create database user
5. Whitelist IP: 0.0.0.0/0
6. Get connection string

**Option B: Local MongoDB**
- **Windows**: Download from https://www.mongodb.com/try/download/community
- **Mac**: `brew install mongodb-community`
- **Linux**: Follow official installation guide

### 3. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env
# For MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/bookstore
# 
# For Local MongoDB:
# MONGO_URI=mongodb://localhost:27017/bookstore

# Seed database with sample data
npm run seed

# Start server
npm run dev
```

✅ Server running at: http://localhost:4000

### 4. Frontend Setup

Open a new terminal:

```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Frontend running at: http://localhost:5173

### 5. Test the Application

1. Open http://localhost:5173 in your browser
2. Login with demo credentials:
   - **Admin**: admin@bookstore.test / admin123
   - **User**: user@bookstore.test / user123
3. Browse books, add to cart, place orders
4. Access admin dashboard at /admin/books

## Project Structure

```
bookstore-mern/
├── server/              # Backend (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── middleware/  # Auth, error handling, upload
│   │   ├── models/      # Mongoose schemas
│   │   ├── routes/      # API endpoints
│   │   ├── utils/       # Seed script
│   │   └── server.ts    # Entry point
│   ├── package.json
│   └── tsconfig.json
│
├── client/              # Frontend (React + TypeScript + Vite)
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # Auth context
│   │   ├── pages/       # Page components
│   │   ├── utils/       # Axios instance
│   │   ├── App.tsx      # Main app
│   │   └── main.tsx     # Entry point
│   ├── package.json
│   └── vite.config.ts
│
├── docs/                # Documentation
│   └── DEPLOYMENT.md    # Production deployment guide
│
└── README.md            # Project overview
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Current user

### Books
- `GET /api/books` - List (with pagination, search, filters)
- `GET /api/books/:id` - Get details
- `POST /api/books` - Create (admin)
- `PUT /api/books/:id` - Update (admin)
- `DELETE /api/books/:id` - Delete (admin)
- `POST /api/books/:id/reviews` - Add review

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart/items` - Add item
- `PUT /api/cart/items/:id` - Update quantity
- `DELETE /api/cart/items/:id` - Remove item

### Orders
- `POST /api/orders` - Place order
- `GET /api/orders` - User's orders
- `GET /api/orders/admin/all` - All orders (admin)
- `PATCH /api/orders/admin/:id` - Update status (admin)

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Backend: Changes auto-restart server
- Frontend: Changes auto-refresh browser

### Debugging

**Backend**
- Use `console.log()` in server code
- Check terminal running `npm run dev`
- Test API: http://localhost:4000/api/health

**Frontend**
- Open browser DevTools (F12)
- Check Console tab for errors
- Use React DevTools extension

### Testing Features

1. **User Flow**
   - Sign up new account
   - Browse books with filters
   - Add books to cart
   - Place order
   - View order history

2. **Admin Flow**
   - Login as admin
   - Add new book
   - Edit book details
   - View all orders
   - Update order status

3. **Reviews**
   - View book details
   - Write review
   - See rating update

## Common Issues

### MongoDB Connection Error
```
Error: MongoServerError: bad auth
```
**Solution**: Check MONGO_URI in .env, verify username/password

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::4000
```
**Solution**: Change PORT in server/.env to 4001 or kill the process

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Ensure CLIENT_URL in backend .env matches frontend URL

### Module Not Found
```
Error: Cannot find module '...'
```
**Solution**: Run `npm install` in the respective directory

## Next Steps

1. **Customize**
   - Add your own book data
   - Customize UI colors and styling
   - Add new features

2. **Deploy to Production**
   - Follow docs/DEPLOYMENT.md
   - Deploy backend to Render
   - Deploy frontend to Vercel
   - Use MongoDB Atlas

3. **Enhance Security**
   - Change default admin password
   - Add email verification
   - Implement password reset

4. **Add Features**
   - Payment integration (Stripe/Razorpay)
   - Email notifications
   - Wishlist feature
   - Advanced search
   - Book recommendations

## Support

- **Documentation**: See README.md and docs/DEPLOYMENT.md
- **Issues**: Open GitHub issue
- **Questions**: Check existing issues or create new one

---

**Happy Coding!** 💻📚
