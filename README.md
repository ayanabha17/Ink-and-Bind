# 📚 Ink and Bind

A complete, production-ready full-stack e-commerce bookstore application built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin/User)
- Secure password hashing with bcrypt
- HTTP Only cookies for enhanced security

### 📖 Book Management
- Browse books with pagination
- Advanced search (title, author, description)
- Filter by category, price range
- Sort by price, rating, newest
- Book reviews and ratings (1-5 stars)

### 🛒 Shopping Cart
- Add/remove books
- Update quantities
- Persistent cart storage
- Real-time price calculation

### 📦 Order System
- Place orders with shipping address
- Order tracking and history
- Multiple order statuses (pending, confirmed, shipped, delivered)
- Payment status tracking

### 📊 Admin Dashboard
- Manage books (CRUD operations)
- View and update orders
- Sales analytics
- Inventory management

### 💳 Advanced Features
- Stripe payment integration ready
- Email notifications (order confirmations, password reset)
- Image upload for book covers
- Rate limiting for API protection
- Responsive mobile-friendly design

## 🛠️ Tech Stack

**Backend:**
- Node.js 18+ & Express.js
- TypeScript
- MongoDB & Mongoose
- JWT authentication
- Multer (file uploads)
- Express Validator

**Frontend:**
- React 18
- TypeScript
- Vite
- React Router v6
- Axios

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB
- Git

### 1. Clone Repository
```bash
git clone https://github.com/ayanabha17/Ink-and-Bind.git
cd ink-and-bind
```

### 2. Setup Backend
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run seed
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
npm run dev
```

### 4. Test Application
- Frontend: http://localhost:5173
- Backend: http://localhost:4000
- **Admin Login:** `admin@inkandbind.test` / `admin123`
- **User Login:** `user@inkandbind.test` / `user123`

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Books Endpoints
- `GET /api/books` - Get all books (with search, filters, pagination)
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create book (admin only)
- `PUT /api/books/:id` - Update book (admin only)
- `DELETE /api/books/:id` - Delete book (admin only)
- `POST /api/books/:id/reviews` - Add review

### Cart Endpoints
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:id` - Update cart item
- `DELETE /api/cart/items/:id` - Remove item

### Order Endpoints
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/admin/orders` - Get all orders (admin)
- `PUT /api/admin/orders/:id` - Update order status (admin)

## 🌐 Deployment

### Free Hosting Options
- **Frontend:** [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
- **Backend:** [Render](https://render.com) or [Railway](https://railway.app)
- **Database:** [MongoDB Atlas](https://mongodb.com/cloud/atlas)

See `docs/DEPLOYMENT.md` for complete deployment guide.


## 📁 Project Structure
```text
ink-and-bind/
├── server/                  # Backend
│   ├── src/
│   │   ├── middleware/      # Auth, error handling
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   └── utils/           # Helpers
│   └── package.json
├── client/                  # Frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   └── context/         # Auth context
│   └── package.json
├── docs/                    # Documentation
└── README.md
```

## 📧 Environment Variables

### Backend (.env)
```env
PORT=4000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/ink-and-bind
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:4000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with the MERN stack
- Inspired by modern e-commerce platforms
- Open-source community

## 📞 Contact

- **Repository:** https://github.com/ayanabha17/ink-and-bind.git
- **Issues:** https://github.com/ayanabha17/ink-and-bind/issues
- **Project Name:** Ink and Bind

---

**Built by Ayanabha with ❤️ using the MERN Stack**

Happy Coding! 💻📚