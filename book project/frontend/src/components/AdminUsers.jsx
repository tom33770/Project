import { useRef, useState } from 'react';
import api from '../services/api';

function getErrorMessage(err) {
  if (!err) return 'Unknown error';
  const data = err.response?.data;
  if (data?.message) return data.message;
  if (data?.errors) {
    return Object.values(data.errors).flat().join(' ');
  }
  return err.message || 'Unable to complete request.';
}

export default function AdminUsers({ users, onRefresh }) {
  const formRef = useRef(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    });
    setEditingId(null);
  };

  const handleEdit = (user) => {
    console.log('Editing user:', user);
    setForm({
      name: user.name,
      email: user.email,
      password: '',
      password_confirmation: '',
    });
    setEditingId(user.id);
    setFetchError(null);
    setSuccess(null);
    
    // Scroll to form
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      formRef.current.focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccess(null);
    setFetchError(null);

    // Validate passwords match if provided
    if (form.password && form.password !== form.password_confirmation) {
      setFetchError('Passwords do not match.');
      return;
    }

    try {
      if (editingId) {
        // Update existing user
        const updateData = {
          name: form.name,
          email: form.email,
        };
        if (form.password) {
          updateData.password = form.password;
          updateData.password_confirmation = form.password_confirmation;
        }
        await api.put(`/admin/users/${editingId}`, updateData);
        setSuccess('User updated successfully.');
      } else {
        // Create new user
        if (!form.password) {
          setFetchError('Password is required for new users.');
          return;
        }
        await api.post('/admin/users', {
          name: form.name,
          email: form.email,
          password: form.password,
          password_confirmation: form.password_confirmation,
        });
        setSuccess('User created successfully.');
      }

      resetForm();
      onRefresh();
    } catch (err) {
      setFetchError(getErrorMessage(err));
    }
  };

  const handleDeleteUser = async (id) => {
    setSuccess(null);
    setFetchError(null);

    try {
      await api.delete(`/admin/users/${id}`);
      setSuccess('User deleted successfully.');
      if (editingId === id) resetForm();
      onRefresh();
    } catch (err) {
      setFetchError(getErrorMessage(err));
    }
  };

  const regularUsers = users.filter((user) => user.role !== 'admin');

  return (
    <div className="admin-section">
      <h1>Users Management</h1>

      {fetchError && <p className="error">{fetchError}</p>}
      {success && <p className="success">{success}</p>}

      <div className="admin-content">
        <div className="admin-form-section" ref={formRef}>
          <h2>{editingId ? '✏️ Edit User' : '➕ Create New User'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <label>
              Name
              <input
                name="name"
                value={form.name}
                onChange={handleInput}
                required
              />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleInput}
                required
              />
            </label>
            <label>
              Password {editingId && '(leave empty to keep current)'}
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleInput}
                required={!editingId}
              />
            </label>
            <label>
              Confirm Password {editingId && '(leave empty to keep current)'}
              <input
                name="password_confirmation"
                type="password"
                value={form.password_confirmation}
                onChange={handleInput}
                required={!editingId}
              />
            </label>
            <button type="submit" className="btn-primary">
              {editingId ? '💾 Update User' : '➕ Create User'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="btn-secondary">
                ❌ Cancel Edit
              </button>
            )}
          </form>
        </div>

        <div className="admin-table-section">
          <h2>All Users ({regularUsers.length})</h2>
          {regularUsers.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {regularUsers.map((user) => (
                  <tr key={user.id} className={editingId === user.id ? 'highlight' : ''}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.created_at?.split('T')[0]}</td>
                    <td className="table-actions">
                      <button
                        type="button"
                        onClick={() => handleEdit(user)}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(user.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
