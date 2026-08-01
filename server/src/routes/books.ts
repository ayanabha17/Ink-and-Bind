import { Router, Request, Response } from 'express';

const router = Router();

// Get all books
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Get all books - coming soon', books: [] });
});

// Get single book
router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Get book by ID - coming soon' });
});

// Create book
router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Create book - coming soon' });
});

// Update book
router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Update book - coming soon' });
});

// Delete book
router.delete('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Delete book - coming soon' });
});

// Add review
router.post('/:id/reviews', (req: Request, res: Response) => {
  res.json({ message: 'Add review - coming soon' });
});

export default router;
