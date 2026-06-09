// Zustand/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createCartSlice, type CartSlice } from './slices/cartSlice';
import { createAuthSlice, type AuthState } from './slices/authSlice';

export type StoreState = CartSlice & AuthState;

export const useStore = create<StoreState>()(
  persist(
    (set, get, api) => ({
      ...createCartSlice(set as never, get as never, api as never),
      ...createAuthSlice(set as never, get as never),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        products: state.products,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
