import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="page home-page">
      <div className="hero-card">
        <h1>Book Store Management</h1>
        <p>Browse books, add them to your cart, and checkout securely.</p>
        <div className="hero-actions">
          <Link to="/books" className="button">
            Browse Books
          </Link>
          <Link to="/register" className="button button-secondary">
            Create Account
          </Link>
        </div>
      </div>
    </section>
  );
}
