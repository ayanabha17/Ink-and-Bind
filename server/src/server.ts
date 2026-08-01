import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dns from 'dns';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';

// 1. Bypass ISP block
dns.setServers(['8.8.8.8', '8.8.4.4']);

// 2. Load Environment Variables
dotenv.config();

// 3. Import Routers
import authRoutes from './routes/auth';
import bookRoutes from './routes/books';
import cartRoutes from './routes/cart';
import orderRoutes from './routes/orders';
import uploadRoutes from './routes/upload';

const app: Application = express();
const PORT = process.env.PORT || 4000;

// 4. Global Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// 5. API Routes (Delegated to dedicated router files)
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes); 
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// 6. Health Check Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 7. Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// 8. MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ink-and-bind')
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch((err) => {
    console.warn('⚠️  MongoDB connection error:', err.message);
    console.log('📝 Running in demo mode without database');
  });

// 9. Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Frontend: http://localhost:5173`);
});

export default app;