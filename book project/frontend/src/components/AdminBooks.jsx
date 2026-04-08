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

export default function AdminBooks({ books, onRefresh }) {
  const formRef = useRef(null);
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    stock: '',
    description: '',
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
      title: '',
      author: '',
      genre: '',
      price: '',
      stock: '',
      description: '',
    });
    setEditingId(null);
  };

  const handleEdit = (book) => {
    console.log('Editing book:', book);
    setForm({
      title: book.title,
      author: book.author,
      genre: book.genre || '',
      price: Number(book.price).toString(),
      stock: Number(book.stock).toString(),
      description: book.description || '',
    });
    setEditingId(book.id);
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

    try {
      const data = {
        title: form.title,
        author: form.author,
        genre: form.genre,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
        description: form.description,
      };

      if (editingId) {
        // Update existing book
        await api.put(`/admin/books/${editingId}`, data);
        setSuccess('Book updated successfully.');
      } else {
        // Create new book
        await api.post('/admin/books', data);
        setSuccess('Book created successfully.');
      }

      resetForm();
      onRefresh();
    } catch (err) {
      setFetchError(getErrorMessage(err));
    }
  };

  const handleDeleteBook = async (id) => {
    setSuccess(null);
    setFetchError(null);

    try {
      await api.delete(`/admin/books/${id}`);
      setSuccess('Book deleted successfully.');
      if (editingId === id) resetForm();
      onRefresh();
    } catch (err) {
      setFetchError(getErrorMessage(err));
    }
  };

  return (
    <div className="admin-section">
      <h1>Books Management</h1>

      {fetchError && <p className="error">{fetchError}</p>}
      {success && <p className="success">{success}</p>}

      <div className="admin-content">
        <div className="admin-form-section" ref={formRef}>
          <h2>{editingId ? '✏️ Edit Book' : '➕ Create New Book'}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <label>
              Title
              <input
                name="title"
                value={form.title}
                onChange={handleInput}
                required
              />
            </label>
            <label>
              Author
              <input
                name="author"
                value={form.author}
                onChange={handleInput}
                required
              />
            </label>
            <label>
              Price
              <input
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleInput}
                required
              />
            </label>
            <label>
              Stock
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleInput}
                required
              />
            </label>
            <label>
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleInput}
                rows="4"
              />
            </label>
            <button type="submit" className="btn-primary">
              {editingId ? '💾 Update Book' : '➕ Add Book'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="btn-secondary">
                ❌ Cancel Edit
              </button>
            )}
          </form>
        </div>

        <div className="admin-table-section">
          <h2>All Books ({books.length})</h2>
          {books.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Sales</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className={editingId === book.id ? 'highlight' : ''}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>${Number(book.price).toFixed(2)}</td>
                    <td>{book.stock}</td>
                    <td>{book.order_items_count ?? 0}</td>
                    <td className="table-actions">
                      <button
                        type="button"
                        onClick={() => handleEdit(book)}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBook(book.id)}
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
            <p className="no-data">No books found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
