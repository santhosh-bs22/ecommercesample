export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface DummyJsonProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  thumbnail: string;
  rating: number;
  stock: number;
  brand: string;
}

export type ProductItem = Product | DummyJsonProduct;

export interface ProductFilters {
  category: string;
  search: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
}

export interface ProductReview {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductVariant {
  id: number;
  name: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;
  images: string[];
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  parentId?: number;
}

export interface ProductImage {
  id: number;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface ProductResponse {
  products: ProductItem[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductSearchParams {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sortBy?: 'price' | 'rating' | 'name' | 'popularity';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ProductSortOption {
  value: string;
  label: string;
}

export const PRODUCT_SORT_OPTIONS: ProductSortOption[] = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
];

export interface ProductInventory {
  productId: number;
  stock: number;
  reserved: number;
  available: number;
  lowStockThreshold: number;
}

export interface ProductAnalytics {
  productId: number;
  views: number;
  purchases: number;
  revenue: number;
  conversionRate: number;
  averageRating: number;
  reviewCount: number;
}

export interface ProductRecommendation {
  productId: number;
  score: number;
  reason: string;
}

// Type guards for product type checking
export const isFakeStoreProduct = (product: ProductItem): product is Product => {
  return 'rating' in product && typeof product.rating === 'object' && 'rate' in product.rating;
};

export const isDummyJsonProduct = (product: ProductItem): product is DummyJsonProduct => {
  return 'images' in product && Array.isArray(product.images);
};

// Utility types for product display
export interface NormalizedProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  images: string[];
  rating: number;
  brand?: string;
  stock?: number;
  hasFreeShipping: boolean;
  isFeatured: boolean;
  discountPercentage?: number;
  originalPrice?: number;
}

export interface ProductCardProps {
  product: ProductItem;
  showActions?: boolean;
  showDescription?: boolean;
  showCategory?: boolean;
  showRating?: boolean;
  className?: string;
  onAddToCart?: (product: ProductItem) => void;
  onQuickView?: (product: ProductItem) => void;
}

export interface ProductGridProps {
  products: ProductItem[];
  loading?: boolean;
  emptyMessage?: string;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg';
}

// Product form types
export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  brand?: string;
  stock?: number;
  rating?: number;
}

// Product filter types
export interface PriceRange {
  min: number;
  max: number;
}

export interface FilterState {
  categories: string[];
  priceRange: PriceRange;
  ratings: number[];
  brands: string[];
  inStock: boolean;
  onSale: boolean;
  featured: boolean;
}

// Product API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ProductsResponse extends ApiResponse<ProductItem[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ProductDetailResponse extends ApiResponse<ProductItem> {}

// Product cart types
export interface CartProduct {
  productId: number;
  quantity: number;
  price: number;
  name: string;
  image: string;
  category: string;
}

// Product wishlist types
export interface WishlistItem {
  productId: number;
  addedAt: string;
  product: ProductItem;
}

// Product comparison types
export interface ComparisonProduct {
  product: ProductItem;
  specifications: Record<string, string>;
}

// Remove the conflicting export at the end and use type aliases instead
export type FakeStoreProduct = Product;
export type DummyJsonProductType = DummyJsonProduct;