import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        setBook(response.data);
      } catch (error) {
        setNotification('Book not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await api.post('/cart', { book_id: id, quantity: 1 });
      setNotification('Book added to cart successfully.');
      window.setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification('Login is required to add books to cart.');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <section className="page book-detail-page">
      <div className="book-detail">
        <div className="book-image">
          {book.cover_image && <img src={book.cover_image} alt={book.title} />}
        </div>
        <div className="book-info">
          <h1>{book.title}</h1>
          <p className="book-author">by {book.author}</p>
          {book.genre && <p className="book-genre">Genre: {book.genre}</p>}
          <p className="book-description">{book.description}</p>
          <div className="book-meta">
            <span className="price">Nrs {book.price}</span>
            <span className="stock">{book.stock} in stock</span>
          </div>
          <div className="actions">
            <button type="button" className="button" onClick={handleAddToCart} disabled={book.stock === 0}>
              Add to Cart
            </button>
            <button type="button" className="button primary" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
          {notification && <p className={notification.includes('successfully') ? 'success' : 'error'}>{notification}</p>}
        </div>
      </div>
    </section>
  );
}