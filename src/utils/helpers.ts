import { Product, DummyJsonProduct, ProductItem } from '@/types';

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const calculateAverageRating = (product: ProductItem): number => {
  if ('rating' in product && typeof product.rating === 'number') {
    return product.rating;
  }
  if ('rating' in product) {
    return product.rating.rate;
  }
  return 0;
};

export const getProductImage = (product: ProductItem): string => {
  if ('image' in product) return product.image;
  if ('thumbnail' in product) return product.thumbnail;
  return '/assets/images/placeholder.jpg';
};

export const getProductImages = (product: ProductItem): string[] => {
  if ('images' in product) return product.images;
  if ('image' in product) return [product.image];
  return ['/assets/images/placeholder.jpg'];
};

export const normalizeProduct = (product: ProductItem) => ({
  id: product.id,
  name: 'title' in product ? product.title : product.title,
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