import { Router, Request, Response } from 'express';

const router = Router();

// Upload image
router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Upload image - coming soon' });
});

export default router;
