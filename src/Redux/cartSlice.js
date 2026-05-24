import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = 'cart';

function readCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { products: [] };
    const parsed = JSON.parse(raw);
    return {
      products: Array.isArray(parsed.products) ? parsed.products : [],
    };
  } catch {
    return { products: [] };
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState: readCart(),
  reducers: {
    addToCart: (state, action) => {
      const idx = state.products.findIndex((p) => p.productId === action.payload);
      if (idx === -1) {
        state.products.push({ productId: action.payload, quantity: 1 });
      } else {
        state.products[idx].quantity += 1;
      }
    },

    increaseQty: (state, action) => {
      const product = state.products.find((p) => p.productId === action.payload);
      if (product) product.quantity += 1;
    },

    decreaseQty: (state, action) => {
      const product = state.products.find((p) => p.productId === action.payload);
      if (product) {
        product.quantity -= 1;
        if (product.quantity <= 0) {
          state.products = state.products.filter((p) => p.productId !== action.payload);
        }
      }
    },

    removeFromCart: (state, action) => {
      state.products = state.products.filter((p) => p.productId !== action.payload);
    },

    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;