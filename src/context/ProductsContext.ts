import { createContext, useContext } from 'react';
import type { IProduct } from '../Zustand/slices/cartSlice';

export interface IProductsContextValue {
  products: IProduct[];
  loading: boolean;
  error: string | null;
  getProductById: (id: number) => IProduct | null;
}

export const ProductsContext = createContext<IProductsContextValue | null>(null);

export function useProducts(): IProductsContextValue {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
}
