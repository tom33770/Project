import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">BookStore</Link>
      </div>
      <nav>
        <Link to="/books">Books</Link>
        <Link to="/cart">Cart</Link>
        {user && <Link to="/orders">Orders</Link>}
        {user ? (
          <>
            {user.role === 'admin' && <Link to="/admin">Admin</Link>}
            <button type="button" onClick={handleLogout} className="link-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
