import { useEffect, useRef } from 'react';
import { useStore } from '../Zustand/store';
import api from './api';

interface FakeStoreCartProduct {
  productId: number;
  quantity: number;
}

interface FakeStoreCart {
  id: number;
  userId: number;
  date: string;
  products: FakeStoreCartProduct[];
}

const today = () => new Date().toISOString().split('T')[0];

const getUserCarts = (userId: number) =>
  api.get<FakeStoreCart[]>(`/carts/user/${userId}`).then((r) => r.data);

const createCart = (userId: number, products: FakeStoreCartProduct[]) =>
  api.post<FakeStoreCart>('/carts', { userId, date: today(), products }).then((r) => r.data);

const updateCart = (cartId: number, userId: number, products: FakeStoreCartProduct[]) =>
  api.put<FakeStoreCart>(`/carts/${cartId}`, { userId, date: today(), products }).then((r) => r.data);

const deleteCart = (cartId: number) =>
  api.delete<FakeStoreCart>(`/carts/${cartId}`).then((r) => r.data);

const cartApiIdKey = (email: string) => `cartApiId_${email}`;

export function useCartSync() {
  const user = useStore((s) => s.user);
  const products = useStore((s) => s.products);

  const cartApiIdRef = useRef<number | null>(null);
  const initializedRef = useRef(false);
  const skipSyncRef = useRef(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!user?.email) {
      cartApiIdRef.current = null;
      initializedRef.current = false;
      skipSyncRef.current = true;
      return;
    }

    if (initializedRef.current) return;
    initializedRef.current = true;

    const userId = Number(user.id) || 1;
    const stored = localStorage.getItem(cartApiIdKey(user.email));

    if (stored) {
      cartApiIdRef.current = parseInt(stored, 10);
      skipSyncRef.current = false;
      return;
    }

    getUserCarts(userId)
      .then((carts) => {
        if (carts.length > 0) {
          cartApiIdRef.current = carts[0].id;
          localStorage.setItem(cartApiIdKey(user.email), String(carts[0].id));
        }
      })
      .catch(() => {})
      .finally(() => {
        skipSyncRef.current = false;
      });
  }, [user?.email, user?.id]);

  useEffect(() => {
    if (!user?.email || skipSyncRef.current) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const userId = Number(user.id) || 1;

      if (products.length === 0) {
        if (cartApiIdRef.current) {
          deleteCart(cartApiIdRef.current).catch(() => {});
          localStorage.removeItem(cartApiIdKey(user.email));
          cartApiIdRef.current = null;
          initializedRef.current = false;
        }
      } else if (cartApiIdRef.current) {
        updateCart(cartApiIdRef.current, userId, products).catch(() => {});
      } else {
        createCart(userId, products)
          .then((cart) => {
            cartApiIdRef.current = cart.id;
            localStorage.setItem(cartApiIdKey(user.email), String(cart.id));
          })
          .catch(() => {});
      }
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [products, user?.email, user?.id]);
}
