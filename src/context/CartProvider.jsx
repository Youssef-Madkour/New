import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { CartContext } from './CartContext.js';

const STORAGE_KEY = 'cart';
function readCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { userId: 1, date: '', products: [] };
    const parsed = JSON.parse(raw);
    return {
      userId: parsed.userId ?? 1,
      date: parsed.date ?? '',
      products: Array.isArray(parsed.products) ? parsed.products : [],
    };
  } catch {
    return { userId: 1, date: '', products: [] };
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCart);
  const skipFirstWrite = useRef(true);

  useEffect(() => {
    if (skipFirstWrite.current) {
      skipFirstWrite.current = false;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // quota / private-mode failures are non-fatal
    }
  }, [cart]);

  const addToCart = useCallback((productId) => {
    setCart((prev) => {
      const products = [...prev.products];
      const idx = products.findIndex((p) => p.productId === productId);
      if (idx === -1) products.push({ productId, quantity: 1 });
      else
        products[idx] = {
          ...products[idx],
          quantity: products[idx].quantity + 1,
        };
      return { ...prev, products, date: new Date().toISOString() };
    });
  }, []);

  const increaseQty = useCallback((productId) => {
    setCart((prev) => {
      const products = prev.products.map((p) =>
        p.productId === productId ? { ...p, quantity: p.quantity + 1 } : p
      );
      return { ...prev, products, date: new Date().toISOString() };
    });
  }, []);

  const decreaseQty = useCallback((productId) => {
    setCart((prev) => {
      const products = prev.products
        .map((p) =>
          p.productId === productId ? { ...p, quantity: p.quantity - 1 } : p
        )
        .filter((p) => p.quantity > 0);
      return { ...prev, products, date: new Date().toISOString() };
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.productId !== productId),
      date: new Date().toISOString(),
    }));
  }, []);

  const clearCart = useCallback(() => {
    setCart((prev) => ({
      ...prev,
      products: [],
      date: new Date().toISOString(),
    }));
  }, []);

  // Todo: use state as explaned instead of recalculating (Don't forget to cache)
  const totalCount = useMemo(
    () => cart.products.reduce((sum, p) => sum + p.quantity, 0),
    [cart.products]
  );

  const value = useMemo(
    () => ({
      cart,
      totalCount,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart,
    }),
    [
      cart,
      totalCount,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
