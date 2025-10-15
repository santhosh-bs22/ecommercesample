import { useCartStore } from '@/stores';

export const useCart = () => {
  const {
    items,
    totalPrice,
    totalItems,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
  } = useCartStore();

  return {
    items,
    totalPrice,
    totalItems,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
  };
};