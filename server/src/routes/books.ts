import express from 'express';
import Book from '../models/bookModel'; // Notice the ../ to go up one folder and into models

const router = express.Router();

// GET all books
// (The path is just '/' because server.ts already handles the '/api/books' part)
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Server error fetching books' });
  }
});

// GET a single book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching single book:', error);
    res.status(500).json({ message: 'Server error fetching book' });
  }
});

export default router;