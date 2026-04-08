export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>BookStore</h3>
          <p>Your trusted online bookstore for all your reading needs.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/books">Browse Books</a></li>
            <li><a href="/cart">Shopping Cart</a></li>
            <li><a href="/orders">My Orders</a></li>
            <li><a href="/profile">My Profile</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/shipping">Shipping Info</a></li>
            <li><a href="/returns">Returns</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="LinkedIn">💼</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 BookStore. All rights reserved.</p>
        <p>Made with ❤️ for book lovers</p>
      </div>
    </footer>
  );
}