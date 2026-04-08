import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    const response = await api.get('/cart');
    setCart(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (id) => {
    await api.delete(`/cart/${id}`);
    await fetchCart();
  };

  return (
    <section className="page cart-page">
      <h1>Your Cart</h1>
      {loading ? (
        <p>Loading cart...</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.items.length === 0 ? (
              <p>Your cart is empty. <Link to="/books">Browse books</Link></p>
            ) : (
              cart.items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div>
                    <h2>{item.book.title}</h2>
                    <p>{item.book.author}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="cart-item-actions">
                    <span>${(item.book.price * item.quantity).toFixed(2)}</span>
                    <button type="button" onClick={() => handleRemove(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {cart.items.length > 0 && (
            <div className="cart-summary">
              <p>Total: ${cart.total.toFixed(2)}</p>
              <Link to="/checkout" className="button">
                Proceed to Checkout
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}
