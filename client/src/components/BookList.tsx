import { Link } from 'react-router-dom';
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

  if (isLoading) return <div>Loading the library...</div>;

  return (
    <div style={{ display: 'grid', gap: '1rem', padding: '2rem' }}>
      <h2>Our Book Collection</h2>
      
      {books.map((book: any) => (
        // Wrap the card in a Link tag pointing to the book's specific ID
        <Link 
          to={`/book/${book._id}`} 
          key={book._id} 
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', cursor: 'pointer' }}>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Price:</strong> ${book.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}