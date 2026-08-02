import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function BookDetail() {
  // Grab the dynamic ':id' from the URL
  const { id } = useParams(); 
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the single book from the backend route we built earlier
    fetch(`http://localhost:4000/api/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return Loading book details...;
  if (!book) return Book not found!;

  return (
    
      
        ← Back to Library
      
      {book.title}
      By {book.author}
      
      
        
          Price: ${book.price}
        
      
    
  );
}