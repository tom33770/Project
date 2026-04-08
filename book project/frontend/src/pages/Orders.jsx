import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await api.get('/orders');
      setOrders(response.data.orders || []);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <section className="page orders-page">
      <h1>Your Orders</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <div className="books-grid">
          {orders.map((order) => (
            <div key={order.id} className="book-card">
              <h2>Order #{order.id}</h2>
              <p>Status: {order.status}</p>
              <p>Total: Nrs{order.total}</p>
              <p>Payment: {order.payment_method}</p>
              {order.transaction_id && <p>Transaction ID: {order.transaction_id}</p>}
              {order.transaction_hash && <p>Transaction Hash: {order.transaction_hash}</p>}
              <p>{order.order_items.length} items</p>
              <ul>
                {order.order_items.map((item) => (
                  <li key={item.id}>
                    {item.book.title} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
