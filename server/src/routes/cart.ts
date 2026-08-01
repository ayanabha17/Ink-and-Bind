import { Router, Request, Response } from 'express';

const router = Router();

// Get user's cart
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get cart - coming soon', items: [] });
});

// Add to cart
router.post('/items', (req: Request, res: Response) => {
  res.json({ message: 'Add to cart - coming soon' });
});

// Update cart item
router.put('/items/:id', (req: Request, res: Response) => {
  res.json({ message: 'Update cart item - coming soon' });
});

// Remove from cart
router.delete('/items/:id', (req: Request, res: Response) => {
  res.json({ message: 'Remove from cart - coming soon' });
});

export default router;
