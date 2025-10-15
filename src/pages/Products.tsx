import React from 'react';
import { Link } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import { useProducts } from '@/hooks';
import { ProductGrid, LoadingSpinner } from '@/components';
import { Button } from '@/components/ui';
import { normalizeProduct, formatPrice } from '@/utils/helpers'; // Ensure these are imported

export const Products: React.FC = () => {
  const { filteredProducts, loading, filters, setFilters, categories } = useProducts();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
            <p className="text-gray-600">
              Showing {filteredProducts.length} products
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            {/* View Mode Toggle */}
            <div className="flex bg-white rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${
                  viewMode === 'grid' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${
                  viewMode === 'list' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              className="lg:hidden"
              icon={Filter}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`
            lg:w-64 flex-shrink-0
            ${showFilters ? 'block' : 'hidden lg:block'}
          `}>
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>

              {/* Category Filter */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={filters.category === category}
                        onChange={(e) => setFilters({ category: e.target.value })}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-700 capitalize">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ minPrice: Number(e.target.value) })}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Minimum Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={filters.rating === rating}
                        onChange={(e) => setFilters({ rating: Number(e.target.value) })}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-700">
                        {rating}+ Stars
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setFilters({
                  category: 'all',
                  search: '',
                  minPrice: 0,
                  maxPrice: 1000,
                  rating: 0
                })}
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <ProductGrid products={filteredProducts} loading={loading} />
            ) : (
              <div className="space-y-4">
                {loading ? (
                  <LoadingSpinner text="Loading products..." />
                ) : (
                  filteredProducts.map((product) => {
                    const normalized = normalizeProduct(product);
                    return (
                      <Link
                        key={normalized.uniqueId} // Use uniqueId for key
                        to={`/product/${normalized.uniqueId}`} // Use uniqueId for link
                        className="block bg-white rounded-xl shadow-lg p-6 flex items-center space-x-6 hover:shadow-xl transition-shadow cursor-pointer"
                      >
                        <img
                          src={normalized.image}
                          alt={normalized.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {normalized.name}
                          </h3>
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {normalized.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-primary-600">
                              {formatPrice(normalized.price)}
                            </span>
                            <span className="text-sm text-gray-500 capitalize">
                              {normalized.category}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;