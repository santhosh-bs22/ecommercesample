import { useEffect } from 'react';
import { useProductStore } from '@/stores';

export const useProducts = () => {
  const { 
    products, 
    filteredProducts, 
    categories, 
    filters, 
    loading, 
    error,
    fetchProducts,
    fetchCategories,
    setFilters,
    searchProducts
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return {
    products,
    filteredProducts,
    categories,
    filters,
    loading,
    error,
    setFilters,
    searchProducts,
  };
};