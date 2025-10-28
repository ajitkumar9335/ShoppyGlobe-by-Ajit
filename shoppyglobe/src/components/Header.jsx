import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const totalQuantity = useSelector((s) => s.cart.totalQuantity);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">ShoppyGlobe</Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/cart" aria-label="cart">
            Cart {totalQuantity > 0 && <span className="badge">{totalQuantity}</span>}
          </Link>
          <Link to="/checkout">Checkout</Link>
        </nav>
      </div>
    </header>
  );
}
