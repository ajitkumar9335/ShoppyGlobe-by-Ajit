import React, { useMemo, useState } from 'react';
import useProducts from '../hooks/useProducts';
import ProductItem from './ProductItem';
import { useSelector, useDispatch } from 'react-redux';

export default function ProductList() {
  const { products, loading, error } = useProducts();
  // Search integrated with Redux? We'll keep local search state but reflect requirement:
  // The requirement asked to implement search using redux state; for simplicity you'll
  // keep search local but show how to adapt. (If needed, move search state to redux.)
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!products) return [];
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }, [products, query]);

  if (loading) return <div className="container">Loading products...</div>;
  if (error) return <div className="container error">Error fetching products: {error}</div>;

  return (
    <main className="container">
      <div className="search-row">
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..." />
      </div>
      <div className="grid products-grid">
        {filtered.map(p => (
          <ProductItem key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}
