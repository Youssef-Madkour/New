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
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.user?.email) {
          try {
            const cart = JSON.parse(
              localStorage.getItem(`cart_${state.user.email}`) || '[]',
            );
            state.products = cart;
          } catch {
            state.products = [];
          }
        }
      },
    }
  )
);

useStore.subscribe((state, prev) => {
  if (state.user?.email && state.products !== prev.products) {
    localStorage.setItem(`cart_${state.user.email}`, JSON.stringify(state.products));
  }
});
