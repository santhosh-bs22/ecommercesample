import { Product, DummyJsonProduct } from '@/types';

const FAKE_STORE_API = 'https://fakestoreapi.com';
const DUMMY_JSON_API = 'https://dummyjson.com';

// Helper function for fetch requests
const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const api = {
  // Fake Store API
  async getFakeStoreProducts(): Promise<Product[]> {
    return fetchData<Product[]>(`${FAKE_STORE_API}/products`);
  },
  
  async getFakeStoreProduct(id: number): Promise<Product> {
    return fetchData<Product>(`${FAKE_STORE_API}/products/${id}`);
  },
  
  async getFakeStoreCategories(): Promise<string[]> {
    return fetchData<string[]>(`${FAKE_STORE_API}/products/categories`);
  },
  
  // DummyJSON API
  async getDummyJsonProducts(): Promise<{ products: DummyJsonProduct[] }> {
    return fetchData<{ products: DummyJsonProduct[] }>(`${DUMMY_JSON_API}/products`);
  },
  
  async getDummyJsonProduct(id: number): Promise<DummyJsonProduct> {
    return fetchData<DummyJsonProduct>(`${DUMMY_JSON_API}/products/${id}`);
  },
  
  async getDummyJsonCategories(): Promise<string[]> {
    return fetchData<string[]>(`${DUMMY_JSON_API}/products/categories`);
  },
  
  async searchProducts(query: string): Promise<{ products: DummyJsonProduct[] }> {
    return fetchData<{ products: DummyJsonProduct[] }>(`${DUMMY_JSON_API}/products/search?q=${query}`);
  },
};