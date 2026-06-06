import { createContext, useContext } from 'react';
import type { Product } from '../Zustand/slices/cartSlice';

export interface ProductsContextValue {
  products: Product[];
  loading: boolean;
  error: string | null;
  getProductById: (id: number) => Product | null;
}

export const ProductsContext = createContext<ProductsContextValue | null>(null);

export function useProducts(): ProductsContextValue {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
}
