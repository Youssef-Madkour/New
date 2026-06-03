import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Todo: Create a slice and global store
// https://zustand.docs.pmnd.rs/learn/guides/slices-pattern#slicing-the-store-into-smaller-stores

export const useStore = create(
  persist(
    (set, get) => ({
      products: [],

      // Todo: Add total + Count (done)
      getTotalItems: () => {
        return get().products.reduce((sum, p) => sum + p.quantity, 0);
      },

      getTotalPrice: (getProductById) => {
        return get().products.reduce((sum, p) => {
          const product = getProductById(p.productId);
          return product ? sum + product.price * p.quantity : sum;
        }, 0);
      },

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

