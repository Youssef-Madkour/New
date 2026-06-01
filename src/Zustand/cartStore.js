import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Todo: Create a slice and global store
// https://zustand.docs.pmnd.rs/learn/guides/slices-pattern#slicing-the-store-into-smaller-stores
export const useCartStore = create(
  persist(
    (set) => ({
      products: [],
      // Todo: Add total + Count

      addToCart: (productId) =>
        set((state) => {
          const products = [...state.products];
          const idx = products.findIndex((p) => p.productId === productId);
          if (idx === -1) products.push({ productId, quantity: 1 });
          else products[idx].quantity += 1;
          return { products };
        }),

      increaseQty: (productId) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.productId === productId ? { ...p, quantity: p.quantity + 1 } : p
          ),
        })),

      decreaseQty: (productId) =>
        set((state) => ({
          products: state.products
            .map((p) =>
              p.productId === productId ? { ...p, quantity: p.quantity - 1 } : p
            )
            .filter((p) => p.quantity > 0),
        })),

      removeFromCart: (productId) =>
        set((state) => ({
          products: state.products.filter((p) => p.productId !== productId),
        })),

      clearCart: () => set({ products: [] }),
    }),
    { name: 'cart' }
  )
);
