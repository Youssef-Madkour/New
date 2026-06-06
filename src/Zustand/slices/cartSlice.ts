import type { StateCreator } from 'zustand';

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export interface ICartItem {
  productId: number;
  quantity: number;
}

export interface ICartSlice {
  products: ICartItem[];
  getTotalItems: () => number;
  getTotalPrice: (getProductById: (id: number) => IProduct | null) => number;
  addToCart: (productId: number) => void;
  increaseQty: (productId: number) => void;
  decreaseQty: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

export const createCartSlice: StateCreator<ICartSlice> = (set, get) => ({
  products: [],

  getTotalItems: () => get().products.reduce((sum, p) => sum + p.quantity, 0),

  getTotalPrice: (getProductById) =>
    get().products.reduce((sum, p) => {
      const product = getProductById(p.productId);
      return product ? sum + product.price * p.quantity : sum;
    }, 0),

  addToCart: (productId) =>
    set((state) => {
      const products = [...state.products];
      const idx = products.findIndex((p) => p.productId === productId);
      if (idx === -1) products.push({ productId, quantity: 1 });
      else products[idx] = { ...products[idx], quantity: products[idx].quantity + 1 };
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
});
