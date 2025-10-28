import React from 'react';
import { useLocation } from 'react-router-dom';

export default function NotFound() {
  const loc = useLocation();
  return (
    <main className="container notfound">
      <h2>404 — Page Not Found</h2>
      <p>No route matches: <code>{loc.pathname}</code></p>
      <p>Please check the URL or go back to <a href="/">Home</a>.</p>
    </main>
  );
}
