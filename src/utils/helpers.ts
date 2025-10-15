import { Product, DummyJsonProduct, ProductItem } from '@/types'; // RESTORED IMPORTS

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const calculateAverageRating = (product: ProductItem): number => {
  // Handles DummyJsonProduct rating (number)
  if (typeof product.rating === 'number') {
    return product.rating;
  }
  // Handles FakeStoreProduct rating (object with 'rate')
  // Using explicit property check for robustness
  if (product.rating && typeof product.rating === 'object' && 'rate' in product.rating) {
    return product.rating.rate;
  }
  return 0;
};

export const getProductImage = (product: ProductItem): string => {
  if ('image' in product && typeof product.image === 'string') return product.image;
  if ('thumbnail' in product) return product.thumbnail;
  return '/assets/images/placeholder.jpg';
};

export const getProductImages = (product: ProductItem): string[] => {
  if ('images' in product && Array.isArray(product.images) && product.images.length > 0) return product.images;
  if ('image' in product && typeof product.image === 'string') return [product.image];
  return ['/assets/images/placeholder.jpg'];
};

// Helper to get the product source prefix ('fs' for FakeStore, 'dj' for DummyJson)
export const getProductSourcePrefix = (product: ProductItem): 'fs' | 'dj' => {
  // FakeStore products have a simple 'image' property (string); DummyJson has 'images' (array).
  return 'image' in product && typeof product.image === 'string' ? 'fs' : 'dj';
};

// Helper to create a unique ID for routing (e.g., 'fs-1', 'dj-100')
export const getProductUniqueId = (product: ProductItem): string => {
  return `${getProductSourcePrefix(product)}-${product.id}`;
};


export const normalizeProduct = (product: ProductItem) => ({
  id: product.id,
  uniqueId: getProductUniqueId(product),
  // This line is now safe because all members of the union are imported,
  // allowing TypeScript to confirm 'title' is a common, consistent property.
  name: product.title, 
  price: product.price,
  image: getProductImage(product),
  images: getProductImages(product),
  category: product.category,
  rating: calculateAverageRating(product),
  description: product.description,
  brand: 'brand' in product ? product.brand : undefined,
  stock: 'stock' in product ? product.stock : undefined,
});

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};