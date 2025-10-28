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
    // dummy validation
    if (!form.name || !form.email || !form.address) {
      alert('Please fill all details');
      return;
    }
    setPlacing(true);
    // Simulate order placing:
    setTimeout(() => {
      alert('Order placed');
      dispatch(clearCart());
      navigate('/'); // auto redirect to home
    }, 800);
  };

  return (
    <main className="container checkout">
      <h2>Checkout</h2>
      <form className="checkout-form" onSubmit={handlePlaceOrder}>
        <div>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label>Address</label>
          <textarea name="address" value={form.address} onChange={handleChange}/>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          {items.map(it => (
            <div key={it.id} className="summary-item">
              <span>{it.title} x {it.qty}</span>
              <span>₹{it.price * it.qty}</span>
            </div>
          ))}
          <p><strong>Total: ₹{totalAmount}</strong></p>
        </div>

        <button type="submit" disabled={placing}>{placing ? 'Placing...' : 'Place Order'}</button>
      </form>
    </main>
  );
}
