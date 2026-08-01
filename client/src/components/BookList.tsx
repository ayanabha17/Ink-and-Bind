import { useState, useEffect } from 'react';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetches data from your perfectly configured Express route!
    fetch('http://localhost:4000/api/books')
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return Loading the library...;

  return (
    
      Our Book Collection
      
      {books.map((book: any) => (
        
          {book.title}
          Author: {book.author}
          Price: ${book.price}
        
      ))}
    
  );
}