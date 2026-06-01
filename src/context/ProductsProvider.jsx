import { useEffect, useMemo, useState, useCallback } from 'react';
import axios from 'axios';
import { ProductsContext } from './ProductsContext.js';

const STORAGE_KEY = 'products:cache:v1';
const API_URL = 'https://fakestoreapi.com/products';

function readCache() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeCache(products) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {
    // quota / private-mode failures are non-fatal
  }
}

export function ProductsProvider({ children }) {
  const cached = useMemo(() => readCache(), []);
  const [products, setProducts] = useState(cached ?? []);
  const [loading, setLoading] = useState(cached === null);
  const [error, setError] = useState(null);

  // Todo: Use Axios Interface to register URL and Headers.
  useEffect(() => {
    let cancelled = false;
    axios
      .get(API_URL)
      .then((res) => {
        if (cancelled) return;
        const next = Array.isArray(res.data) ? res.data : [];
        setProducts(next);
        writeCache(next);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err?.message || 'Failed to load products');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const productsById = useMemo(() => {
    const map = new Map();
    for (const p of products) map.set(p.id, p);
    return map;
  }, [products]);

  const getProductById = useCallback(
    (id) => productsById.get(Number(id)) ?? null,
    [productsById]
  );

  const value = useMemo(
    () => ({ products, loading, error, getProductById }),
    [products, loading, error, getProductById]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
