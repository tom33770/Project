import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <section className="page home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to BookStore{user ? `, ${user.name}` : ''}</h1>
          <p>
            {user
              ? 'Continue exploring our collection or check your orders.'
              : 'Discover your next favorite book from our extensive collection. Browse, shop, and enjoy seamless online book shopping.'
            }
          </p>
          <div className="hero-actions">
            <Link to="/books" className="button">
              Browse Books
            </Link>
            {user ? (
              <Link to="/orders" className="button button-secondary">
                View Orders
              </Link>
            ) : (
              <Link to="/register" className="button button-secondary">
                Create Account
              </Link>
            )}
          </div>
        </div>
        <div className="hero-image">
          <div className="book-stack">
            <div className="book book-1"></div>
            <div className="book book-2"></div>
            <div className="book book-3"></div>
          </div>
        </div>
      </div>
      <div className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Wide Selection</h3>
            <p>Thousands of books across all genres</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Quick and reliable shipping</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Payment</h3>
            <p>Safe and secure checkout process</p>
          </div>
        </div>
      </div>
    </section>
  );
}
