import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createCartSlice } from './slices/cartSlice';
import type { CartSlice } from './slices/cartSlice';

export type StoreState = CartSlice;

export const useStore = create<StoreState>()(
  persist(
    (...args) => ({
      ...createCartSlice(...args),
    }),
    { name: 'cart' }
  )
);
