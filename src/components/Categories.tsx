import React from 'react';
import { useProducts } from '@/hooks';

export const Categories: React.FC = () => {
  const { categories, filters, setFilters } = useProducts();

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex space-x-3 py-4 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilters({ category })}
              className={`
                flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap
                ${filters.category === category
                  ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }
              `}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;