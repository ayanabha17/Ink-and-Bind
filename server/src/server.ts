import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/auth';
import bookRoutes from './routes/books';
import cartRoutes from './routes/cart';
import orderRoutes from './routes/orders';
import uploadRoutes from './routes/upload';

import Book from './models/bookModel';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ink-and-bind')
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch((err) => {
    console.warn('⚠️  MongoDB connection error:', err.message);
    console.log('📝 Running in demo mode without database');
  });

// Fetch all books from the database
app.get('/api/books', async (req, res) => {
  try {
    // Book.find() tells Mongoose to grab every document in the collection
    const books = await Book.find();
    
    // Send the books back to the browser as a JSON response
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Server error fetching books' });
  }
});

// Start server regardless of MongoDB connection
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Frontend: http://localhost:5173`);
});

export default app;
