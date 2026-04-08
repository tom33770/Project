import { useState } from 'react';
import api from '../services/api';

export default function AdminOrders({ orders, onRefresh }) {
  const [updating, setUpdating] = useState(null);

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status: newStatus });
      onRefresh();
    } catch (error) {
      alert('Failed to update order status');
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="admin-section">
      <h2>Order Management</h2>
      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user.name}</td>
                <td>Nrs {order.total}</td>
                <td>{order.payment_method}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                    disabled={updating === order.id}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}