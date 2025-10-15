import React from 'react';
import { ProductItem } from '@/types';
import { ProductCard } from './ProductCard';
import { LoadingSpinner } from './LoadingSpinner';

interface ProductGridProps {
  products: ProductItem[];
  loading?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="py-12">
        <LoadingSpinner text="Loading products..." />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No products found</div>
        <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={`${product.id}-${'image' in product ? 'fs' : 'dj'}`}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;