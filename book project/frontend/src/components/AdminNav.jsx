import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminNav({ activeTab, setActiveTab }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="navbar admin-navbar">
      <div className="logo">
        <Link to="/">BookStore</Link>
      </div>
      <nav className="admin-nav">
        <button
          type="button"
          className={`nav-tab ${activeTab === 'books' ? 'active' : ''}`}
          onClick={() => setActiveTab('books')}
        >
          Books
        </button>
        <button
          type="button"
          className={`nav-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          type="button"
          className={`nav-tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <Link to="/" className="exit-admin">Exit Admin</Link>
        <button type="button" onClick={handleLogout} className="link-button">
          Logout
        </button>
      </nav>
    </header>
  );
}
