import { Router, Request, Response } from 'express';

const router = Router();

// Signup route
router.post('/signup', (req: Request, res: Response) => {
  res.json({ message: 'Signup endpoint - coming soon' });
});

// Login route
router.post('/login', (req: Request, res: Response) => {
  res.json({ message: 'Login endpoint - coming soon' });
});

// Get current user
router.get('/me', (req: Request, res: Response) => {
  res.json({ message: 'Current user endpoint - coming soon' });
});

export default router;
