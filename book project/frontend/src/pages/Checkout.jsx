import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Checkout() {
  const [address, setAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const payload = {
      address,
      billing_address: billingAddress || address,
      payment_method: paymentMethod,
    };

    if (paymentMethod === 'credit_card' || paymentMethod === 'debit_card') {
      payload.card_number = cardNumber;
      payload.expiry_date = expiryDate;
      payload.cvv = cvv;
    }

    try {
      if (paymentMethod === 'esewa') {
        const response = await api.post('/payments/esewa/initiate', payload);
        const { action_url, payload: formPayload } = response.data;

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = action_url;

        Object.entries(formPayload).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        return;
      }

      const response = await api.post('/checkout', payload);
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

          {(paymentMethod === 'credit_card' || paymentMethod === 'debit_card') && (
            <>
              <label>
                Billing Address (leave empty to use shipping address)
                <textarea value={billingAddress} onChange={(event) => setBillingAddress(event.target.value)} />
              </label>

              <label>
                Card Number
                <input type="text" value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} required />
              </label>

              <label>
                Expiry Date (MM/YY)
                <input type="text" value={expiryDate} onChange={(event) => setExpiryDate(event.target.value)} required />
              </label>

              <label>
                CVV
                <input type="text" value={cvv} onChange={(event) => setCvv(event.target.value)} required />
              </label>
            </>
          )}

          <label>
            Payment Method
            <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="esewa">Esewa</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cash_on_delivery">Cash on Delivery</option>
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
