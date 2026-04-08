import { useEffect, useState } from 'react';
import api from '../services/api';
import AdminNav from '../components/AdminNav';
import AdminBooks from '../components/AdminBooks';
import AdminUsers from '../components/AdminUsers';
import { useAuth } from '../context/AuthContext';

function getErrorMessage(err) {
  if (!err) return 'Unknown error';
  const data = err.response?.data;
  if (data?.message) return data.message;
  if (data?.errors) {
    return Object.values(data.errors).flat().join(' ');
  }
  if (err.response?.status === 401) {
    return 'Unauthorized: Please log in again.';
  }
  if (err.response?.status === 403) {
    return 'Forbidden: Admin access required.';
  }
  return err.message || 'Unable to complete request.';
}

export default function AdminPanel() {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('books');
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      setIsLoading(true);
      setFetchError(null);
      
      if (!token) {
        setFetchError('No authentication token found. Please log in again.');
        setIsLoading(false);
        return;
      }

      const [booksResponse, usersResponse] = await Promise.all([
        api.get('/admin/books-stats'),
        api.get('/admin/users'),
      ]);

      setBooks(booksResponse.data.books || []);
      setUsers(usersResponse.data.users || []);
      setIsLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setFetchError(getErrorMessage(err));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [token]);

  return (
    <>
      <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div style={{ background: 'var(--bg)', minHeight: 'calc(100vh - 64px)' }}>
        <div className="admin-section">
          {!user && (
            <p className="error" style={{ marginBottom: '16px' }}>
              ⚠️ Not logged in. Please log in with an admin account.
            </p>
          )}
          {user && user.role !== 'admin' && (
            <p className="error" style={{ marginBottom: '16px' }}>
              ⚠️ Your account is not an admin account.
            </p>
          )}
          
          {isLoading && (
            <p style={{ padding: '20px', textAlign: 'center', color: 'var(--muted)' }}>
              Loading...
            </p>
          )}
          
          {fetchError && <p className="error">{fetchError}</p>}
          
          {!isLoading && (
            <>
              {activeTab === 'books' && (
                <AdminBooks books={books} onRefresh={fetchAdminData} />
              )}
              
              {activeTab === 'users' && (
                <AdminUsers users={users} onRefresh={fetchAdminData} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
