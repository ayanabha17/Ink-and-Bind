import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BookDetail() {
  const { id } = useParams(); 
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch book details from the API
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

  // Guard clauses for loading and missing data
  if (isLoading) return <div className="p-10 text-gray-600">Loading book details...</div>;
  if (!book) return <div className="p-10 text-red-500">Book not found!</div>;

  return (
    <div className="p-10 max-w-3xl mx-auto">
      
      {/* Back Navigation */}
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 mb-8 w-fit"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Library
      </Link>
      
      {/* Main Content */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">{book.title}</h1>
        <p className="text-xl text-gray-600 mt-2">By {book.author}</p>
        
        <div className="mt-6 p-4 bg-gray-100 rounded-lg inline-block">
          <p className="text-lg font-semibold text-gray-800">
            Price: ${book.price}
          </p>
        </div>
      </div>

    </div>
  );
}