import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createCartSlice } from './slices/cartSlice';
import type { ICartSlice } from './slices/cartSlice';

export type TStoreState = ICartSlice;

export const useStore = create<TStoreState>()(
  persist(
    (...args) => ({
      ...createCartSlice(...args),
    }),
    { name: 'cart' }
  )
);
