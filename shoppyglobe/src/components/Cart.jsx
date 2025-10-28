import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

export default function Cart() {
  const items = useSelector(s => s.cart.items);
  const totalAmount = useSelector(s => s.cart.totalAmount);
  const arr = Object.values(items);

  return (
    <main className="container">
      <h2>Your Cart</h2>
      {arr.length === 0 ? (
        <div>
          <p>Cart is empty.</p>
          <Link to="/">Go shopping</Link>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-items">
            {arr.map(i => <CartItem key={i.id} item={i} />)}
          </div>
          <aside className="cart-summary">
            <h3>Summary</h3>
            <p>Total: ₹{totalAmount}</p>
            <Link to="/checkout"><button>Checkout</button></Link>
          </aside>
        </div>
      )}
    </main>
  );
}
