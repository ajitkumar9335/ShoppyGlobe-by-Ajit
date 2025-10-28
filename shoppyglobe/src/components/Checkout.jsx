import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const items = Object.values(useSelector(s => s.cart.items));
  const totalAmount = useSelector(s => s.cart.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [placing, setPlacing] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address) {
      alert('⚠️ Please fill in all details.');
      return;
    }

    setPlacing(true);
    setTimeout(() => {
      alert('✅ Order placed successfully!');
      dispatch(clearCart());
      navigate('/');
    }, 1000);
  };

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <h2>Checkout</h2>
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <label>Delivery Address</label>
          <textarea
            name="address"
            rows="3"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter complete address"
          />

          <div className="order-summary">
            <h3>Order Summary</h3>
            {items.map(it => (
              <div key={it.id} className="order-item">
                <span>{it.title} × {it.qty}</span>
                <span>₹{(it.price * it.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="order-total">
              Total: ₹{totalAmount.toFixed(2)}
            </div>
          </div>

          <button
            type="submit"
            className="place-order-btn"
            disabled={placing}
          >
            {placing ? 'Placing Order...' : 'Place your order'}
          </button>
        </form>
      </div>
    </main>
  );
}
