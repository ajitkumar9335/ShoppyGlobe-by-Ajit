import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const items = useSelector(s => s.cart.items);
  const totalAmount = useSelector(s => s.cart.totalAmount);
  const arr = Object.values(items);
  const navigate = useNavigate();

  return (
    <main className="cart-page">
      <div className="cart-container">
        <div className="cart-left">
          <h2>Your Cart</h2>
          {arr.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty.</p>
              <Link to="/" className="back-shop-btn">Continue Shopping</Link>
            </div>
          ) : (
            arr.map(i => <CartItem key={i.id} item={i} />)
          )}
        </div>

        {arr.length > 0 && (
          <aside className="cart-summary">
            <h3>Summary</h3>
            <p><strong>Total:</strong> ₹{totalAmount.toFixed(2)}</p>
            <button className="checkout-btn" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </aside>
        )}
      </div>
    </main>
  );
}
