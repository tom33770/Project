import { useEffect, useMemo, useState } from 'react';
import api from '../services/api';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('title');
  const [direction, setDirection] = useState('asc');
  const [metadata, setMetadata] = useState({});
  const [notification, setNotification] = useState(null);

  const query = useMemo(
    () => ({
      search: search || undefined,
      sort,
      direction,
    }),
    [search, sort, direction],
  );

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await api.get('/books', { params: query });
      setBooks(response.data.books || []);
      setMetadata(response.data.metadata || {});
    };
    fetchBooks();
  }, [query]);

  const handleAddToCart = async (bookId) => {
    try {
      await api.post('/cart', { book_id: bookId, quantity: 1 });
      setNotification('Book added to cart successfully.');
      window.setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification('Login is required to add books to cart.');
    }
  };

  return (
    <section className="page books-page">
      <div className="page-header">
        <h1>Book Catalog</h1>
        <div className="filter-row">
          <input
            type="text"
            placeholder="Search by title or author"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="title">Title</option>
            <option value="price">Price</option>
          </select>
          <select value={direction} onChange={(event) => setDirection(event.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {metadata.algorithm_used && (
        <div className="metadata">
          <p>
            {metadata.algorithm_used} · {metadata.execution_time_ms} ms · {metadata.results_count || books.length} results
          </p>
        </div>
      )}

      {notification && <p className="success">{notification}</p>}

      <div className="books-grid">
        {books.map((book) => (
          <article key={book.id} className="book-card">
            <h2>{book.title}</h2>
            <p className="book-author">{book.author}</p>
            {book.genre && <p className="book-genre">Genre: {book.genre}</p>}
            <p>{book.description}</p>
            <div className="book-meta">
              <span>Nrs{book.price}</span>
              <span>{book.stock} in stock</span>
            </div>
            <button type="button" className="button" onClick={() => handleAddToCart(book.id)}>
              Add to Cart
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
