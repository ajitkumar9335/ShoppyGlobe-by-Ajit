import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeProduct, incrementQty, decrementQty } from '../features/cartSlice';

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} loading="lazy" />
      <div className="cart-item-info">
        <h4>{item.title}</h4>
        <p>Price: ₹{item.price}</p>
        <div className="qty-control">
          <button onClick={() => dispatch(decrementQty(item.id))} disabled={item.qty <= 1}>-</button>
          <span>{item.qty}</span>
          <button onClick={() => dispatch(incrementQty(item.id))}>+</button>
        </div>
        <div className="cart-item-actions">
          <button onClick={() => dispatch(removeProduct(item.id))}>Remove</button>
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
    price: PropTypes.number,
    qty: PropTypes.number,
    thumbnail: PropTypes.string,
  }).isRequired,
};
