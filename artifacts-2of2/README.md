# 📚 MERN Bookstore

A full-stack e-commerce bookstore application built with MongoDB, Express, React, and Node.js (TypeScript).

![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933)
![MongoDB](https://img.shields.io/badge/MongoDB-7.6-47A248)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🔐 **Authentication**: JWT-based auth with httpOnly cookies
- 👥 **User Roles**: Admin and regular user with role-based access control
- 📖 **Book Management**: Browse, search, filter, and paginate books
- 🛒 **Shopping Cart**: Add/remove items, update quantities
- 📦 **Orders**: Place orders, view order history, track status
- ⭐ **Reviews**: Rate and review books
- 🖼️ **Image Upload**: Upload book cover images
- ✅ **Validation**: Comprehensive input validation with express-validator
- 📱 **Responsive**: Mobile-friendly UI
- 🎨 **Modern UI**: Clean, professional design

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or MongoDB Atlas)
- Git

### Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your MongoDB URI and settings
nano .env  # or use your preferred editor

# Seed database with sample data
npm run seed

# Start development server
npm run dev
```

### Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **API Health**: http://localhost:4000/api/health

### 🔑 Default Credentials

| Role  | Email                     | Password   |
|-------|---------------------------|------------|
| Admin | admin@bookstore.test      | admin123   |
| User  | user@bookstore.test       | user123    |

## 📁 Project Structure

```
bookstore-mern/
├── server/
│   ├── src/
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── errorHandler.ts
│   │   │   ├── upload.ts
│   │   │   └── rateLimiter.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Book.ts
│   │   │   ├── Cart.ts
│   │   │   ├── Order.ts
│   │   │   └── Wishlist.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── books.ts
│   │   │   ├── cart.ts
│   │   │   ├── orders.ts
│   │   │   ├── upload.ts
│   │   │   └── wishlist.ts
│   │   ├── utils/
│   │   │   ├── seed.ts
│   │   │   └── email.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Recommendations.tsx
│   │   │   └── SearchBar.tsx
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── Books.tsx
│   │   │   │   ├── Orders.tsx
│   │   │   │   └── Analytics.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   ├── BookDetails.tsx
│   │   │   ├── Cart.tsx
│   │   │   └── Orders.tsx
│   │   ├── utils/
│   │   │   └── axios.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
├── docs/
│   ├── DEPLOYMENT.md
│   ├── ADDITIONAL_FEATURES.md
│   ├── FEATURES_SUMMARY.md
│   └── SCRIPTS_GUIDE.md
├── README.md
├── SETUP.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── LICENSE
└── .gitignore
```

## 🔌 API Endpoints

### Authentication
| Method | Endpoint           | Description      | Auth |
|--------|-------------------|------------------|------|
| POST   | `/api/auth/signup` | Register account | ❌   |
| POST   | `/api/auth/login`  | Login            | ❌   |
| POST   | `/api/auth/logout` | Logout           | ✅   |
| GET    | `/api/auth/me`     | Get current user | ✅   |

### Books
| Method | Endpoint            | Description      | Auth |
|--------|--------------------|------------------|------|
| GET    | `/api/books`        | List books       | ❌   |
| GET    | `/api/books/:id`    | Get book details | ❌   |
| POST   | `/api/books`        | Create book      | Admin |
| PUT    | `/api/books/:id`    | Update book      | Admin |
| DELETE | `/api/books/:id`    | Delete book      | Admin |
| POST   | `/api/books/:id/reviews` | Add review | ✅   |

### Cart
| Method | Endpoint               | Description    | Auth |
|--------|-----------------------|----------------|------|
| GET    | `/api/cart`           | Get cart       | ✅   |
| POST   | `/api/cart/items`     | Add item       | ✅   |
| PUT    | `/api/cart/items/:id` | Update qty     | ✅   |
| DELETE | `/api/cart/items/:id` | Remove item    | ✅   |
| DELETE | `/api/cart`           | Clear cart     | ✅   |

### Orders
| Method | Endpoint              | Description     | Auth |
|--------|----------------------|-----------------|------|
| POST   | `/api/orders`         | Place order     | ✅   |
| GET    | `/api/orders`         | User's orders   | ✅   |
| GET    | `/api/orders/:id`     | Order details   | ✅   |
| GET    | `/api/orders/admin/all` | All orders  | Admin |
| PATCH  | `/api/orders/admin/:id` | Update status | Admin |

## 🛠️ Tech Stack

**Backend**
- Node.js & Express
- TypeScript
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- express-validator
- multer (file uploads)

**Frontend**
- React 18
- TypeScript
- Vite
- React Router v6
- Axios
- CSS3

## 📖 Documentation

- **[SETUP.md](SETUP.md)** - Complete setup guide
- **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Production deployment guide
- **[docs/ADDITIONAL_FEATURES.md](docs/ADDITIONAL_FEATURES.md)** - Optional features
- **[docs/FEATURES_SUMMARY.md](docs/FEATURES_SUMMARY.md)** - Feature checklist
- **[docs/SCRIPTS_GUIDE.md](docs/SCRIPTS_GUIDE.md)** - NPM scripts reference

## 🌐 Deployment

### Backend (Render)

1. Create new Web Service on Render
2. Connect GitHub repository
3. Set root directory: `server`
4. Build: `npm install && npm run build`
5. Start: `npm start`
6. Add environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `CLIENT_URL`

### Frontend (Vercel)

1. Import project on Vercel
2. Set root directory: `client`
3. Build: `npm run build`
4. Output: `dist`
5. Add environment variable:
   - `VITE_API_URL` = backend URL

### Database (MongoDB Atlas)

1. Create free cluster at mongodb.com
2. Create database user
3. Whitelist IP: 0.0.0.0/0
4. Get connection string

See full guide: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## 🎁 Additional Features

This project includes several optional features you can enable:

### ✅ Implemented

- **Password Reset** - Secure password recovery with email
- **Email Notifications** - Order confirmations, password resets
- **Wishlist** - Save books for later
- **Rate Limiting** - API protection against abuse
- **Payment Integration** - Stripe payment gateway ready
- **Analytics Dashboard** - Admin insights and metrics
- **Book Recommendations** - "You may also like" feature
- **Advanced Search** - Filters, sorting, pagination

### 📦 Ready to Enable

See `docs/ADDITIONAL_FEATURES.md` for implementation guides.

### Quick Add

```bash
# Email notifications
cd server
npm install nodemailer @types/nodemailer

# Payment integration
npm install stripe @types/stripe

# Add to .env
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
STRIPE_SECRET_KEY=sk_test_...
```

## 📊 Project Stats

- **Total Files**: 50+
- **Lines of Code**: 3000+
- **Components**: 10+
- **API Endpoints**: 25+
- **Features**: 15+

## 📝 Development

```bash
# Run backend (watch mode)
cd server && npm run dev

# Run frontend (watch mode)
cd client && npm run dev

# Build for production
cd server && npm run build
cd client && npm run build

# Lint
npm run lint
```

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- React community
- MongoDB team
- Express.js contributors
- TypeScript developers

---

**Built with ❤️ using the MERN stack**

**Happy Coding!** 🚀📚
