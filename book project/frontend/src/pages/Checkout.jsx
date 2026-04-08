import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Checkout() {
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await api.post('/checkout', {
        address,
        payment_method: paymentMethod,
      });
      setMessage(response.data.message);
      setTimeout(() => navigate('/orders'), 1200);
    } catch (err) {
      setError(err?.response?.data?.message || 'Checkout failed.');
    }
  };

  return (
    <section className="page checkout-page">
      <div className="checkout-card">
        <h1>Checkout</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Shipping Address
            <textarea value={address} onChange={(event) => setAddress(event.target.value)} required />
          </label>

          <label>
            Payment Method
            <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="esewa">Esewa</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </label>

          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}

          <button type="submit">Place Order</button>
        </form>
      </div>
    </section>
  );
}
