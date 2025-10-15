import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartState, CartItem } from '@/types';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalPrice: 0,
      totalItems: 0,
      isOpen: false,

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find((i) => i.id === item.id);
        
        if (existingItem) {
          get().updateQuantity(item.id, existingItem.quantity + 1);
        } else {
          const newItems = [...items, { ...item, quantity: 1 }];
          set({
            items: newItems,
            totalPrice: calculateTotalPrice(newItems),
            totalItems: calculateTotalItems(newItems),
          });
        }
      },
      
      removeItem: (id) => {
        const { items } = get();
        const newItems = items.filter((item) => item.id !== id);
        set({
          items: newItems,
          totalPrice: calculateTotalPrice(newItems),
          totalItems: calculateTotalItems(newItems),
        });
      },
      
      updateQuantity: (id, quantity) => {
        const { items } = get();
        const newItems = quantity === 0 
          ? items.filter((item) => item.id !== id)
          : items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            );
        
        set({
          items: newItems,
          totalPrice: calculateTotalPrice(newItems),
          totalItems: calculateTotalItems(newItems),
        });
      },
      
      clearCart: () => {
        set({ items: [], totalPrice: 0, totalItems: 0 });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },
    }),
    {
      name: 'ecommerce-cart-storage',
    }
  )
);

const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const calculateTotalItems = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};