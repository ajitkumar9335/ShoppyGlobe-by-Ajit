import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

const Home = lazy(() => import('../components/ProductList'));
const ProductDetail = lazy(() => import('../components/ProductDetail'));
const Cart = lazy(() => import('../components/Cart'));
const Checkout = lazy(() => import('../components/Checkout'));
const NotFound = lazy(() => import('../components/NotFound'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <React.Suspense fallback={<div className="loading">Loading page...</div>}>
          <Home />
        </React.Suspense>
      </>
    ),
  },
  {
    path: '/product/:id',
    element: (
      <>
        <Header />
        <React.Suspense fallback={<div className="loading">Loading detail...</div>}>
          <ProductDetail />
        </React.Suspense>
      </>
    ),
  },
  {
    path: '/cart',
    element: (
      <>
        <Header />
        <React.Suspense fallback={<div className="loading">Loading cart...</div>}>
          <Cart />
        </React.Suspense>
      </>
    ),
  },
  {
    path: '/checkout',
    element: (
      <>
        <Header />
        <React.Suspense fallback={<div className="loading">Loading checkout...</div>}>
          <Checkout />
        </React.Suspense>
      </>
    ),
  },
  {
    path: '*',
    element: (
      <>
        <Header />
        <React.Suspense fallback={<div className="loading">Loading...</div>}>
          <NotFound />
        </React.Suspense>
      </>
    ),
  },
]);

export default router;
