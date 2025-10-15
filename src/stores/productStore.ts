import { create } from 'zustand';
import { ProductItem, ProductFilters } from '@/types';
import { api } from '@/utils/api';
import { normalizeProduct } from '@/utils/helpers';

interface ProductState {
  products: ProductItem[];
  filteredProducts: ProductItem[];
  categories: string[];
  filters: ProductFilters;
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  setFilters: (filters: Partial<ProductFilters>) => void;
  searchProducts: (query: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  categories: [],
  filters: {
    category: 'all',
    search: '',
    minPrice: 0,
    maxPrice: 1000,
    rating: 0,
  },
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const [fakeStoreProducts, dummyJsonData] = await Promise.all([
        api.getFakeStoreProducts(),
        api.getDummyJsonProducts(),
      ]);

      const allProducts = [
        ...fakeStoreProducts,
        ...dummyJsonData.products,
      ];
      
      set({ 
        products: allProducts,
        filteredProducts: allProducts,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: 'Failed to fetch products', 
        loading: false 
      });
    }
  },

  fetchCategories: async () => {
    try {
      const [fakeStoreCategories, dummyJsonCategories] = await Promise.all([
        api.getFakeStoreCategories(),
        api.getDummyJsonCategories(),
      ]);
      
      const allCategories = [
        'all',
        ...new Set(
          [...fakeStoreCategories, ...dummyJsonCategories]
            .filter(c => typeof c === 'string' && c.trim() !== '') // FIX: Filter out non-string and empty values
        )
      ];
      set({ categories: allCategories });
    } catch (error) {
      set({ error: 'Failed to fetch categories' });
    }
  },

  setFilters: (newFilters) => {
    const state = get();
    const filters = { ...state.filters, ...newFilters };
    const filteredProducts = state.products.filter((product) => {
      const normalized = normalizeProduct(product);
      
      // Category filter
      if (filters.category !== 'all' && normalized.category !== filters.category) {
        return false;
      }
      
      // Search filter
      if (filters.search && !normalized.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Price filter
      if (normalized.price < filters.minPrice || normalized.price > filters.maxPrice) {
        return false;
      }
      
      // Rating filter
      if (normalized.rating < filters.rating) {
        return false;
      }
      
      return true;
    });
    
    set({ filters, filteredProducts });
  },

  searchProducts: async (query: string) => {
    set({ loading: true });
    try {
      const result = await api.searchProducts(query);
      set({ 
        filteredProducts: result.products,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: 'Failed to search products',
        loading: false 
      });
    }
  },
}));