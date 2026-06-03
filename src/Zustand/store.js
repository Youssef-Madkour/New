import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createCartSlice } from '../zustand/slices/cartSlice';

export const useStore = create(
  persist(
    (...args) => ({
      ...createCartSlice(...args),
    }),
    { name: 'cart' }
  )
); //help of ai args args = set , get , api of the data 