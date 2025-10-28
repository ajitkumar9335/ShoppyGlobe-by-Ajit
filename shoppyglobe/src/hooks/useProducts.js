import { useEffect, useState } from 'react';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://dummyjson.com/products');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setProducts(data.products || []);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to fetch products');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProducts();
    return () => { cancelled = true; };
  }, []);

  return { products, loading, error };
}
