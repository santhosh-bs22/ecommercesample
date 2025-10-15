import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus } from 'lucide-react';
import { ProductItem } from '@/types';
import { useCart } from '@/hooks';
import { normalizeProduct, formatPrice } from '@/utils/helpers';
import { Button } from './ui';

interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const normalized = normalizeProduct(product);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Stop the click event from propagating up to the Link component
    e.stopPropagation();
    addItem({
      id: normalized.id,
      name: normalized.name,
      price: normalized.price,
      image: normalized.image,
      category: normalized.category,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : index < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    // Use normalized.uniqueId for the Link
    <Link
      to={`/product/${normalized.uniqueId}`}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <img
          src={normalized.image}
          alt={normalized.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full capitalize">
            {normalized.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
          {normalized.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {normalized.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(normalized.rating)}
            <span className="text-gray-600 text-sm ml-1">({normalized.rating.toFixed(1)})</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(normalized.price)}
          </span>
        </div>
        
        <Button
          onClick={handleAddToCart}
          className="w-full"
          icon={Plus}
        >
          Add to Cart
        </Button>
      </div>
    </Link>
  );
};

export default ProductCard;