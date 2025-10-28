import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addProduct } from '../features/cartSlice';
import { Link } from 'react-router-dom';

export default function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addProduct({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail || product.images?.[0] || '',
    }));
  };

  return (
    <article className="card product-item">
      <Link to={`/product/${product.id}`}>
        <img src={product.thumbnail || product.images?.[0]} alt={product.title} loading="lazy" className="product-image"/>
      </Link>
      <div className="card-body">
        <h3>{product.title}</h3>
        <p className="price">₹{product.price}</p>
        <div className="actions">
          <button onClick={handleAdd}>Add to Cart</button>
          <Link to={`/product/${product.id}`} className="details-link">View</Link>
        </div>
      </div>
    </article>
  );
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};
