import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addProduct } from '../features/cartSlice';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let canceled = false;
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!canceled) setProduct(data);
      } catch (err) {
        if (!canceled) setError(err.message || 'Failed to fetch product');
      } finally {
        if (!canceled) setLoading(false);
      }
    };
    fetchDetail();
    return () => { canceled = true; };
  }, [id]);

  const handleAdd = () => {
    if (!product) return;
    dispatch(addProduct({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail || product.images?.[0] || '',
    }));
  };

  if (loading) return <div className="container">Loading product...</div>;
  if (error) return <div className="container error">Error: {error}</div>;
  if (!product) return <div className="container">No product found</div>;

  return (
    <main className="container product-detail">
      <div className="detail-grid">
        <div className="detail-images">
          <img src={product.thumbnail || product.images?.[0]} alt={product.title} loading="lazy" />
        </div>
        <div className="detail-info">
          <h2>{product.title}</h2>
          <p className="price">₹{product.price}</p>
          <p>{product.description}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <button onClick={handleAdd}>Add to Cart</button>
        </div>
      </div>
    </main>
  );
}

ProductDetail.propTypes = {
  // no props — uses route param
};
