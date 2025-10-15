import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ArrowLeft, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '@/hooks';
import { useProductStore } from '@/stores';
import { normalizeProduct, formatPrice, getProductSourcePrefix } from '@/utils/helpers'; // Import getProductSourcePrefix
import { LoadingSpinner } from '@/components';
import { Button } from '@/components/ui';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, loading } = useProductStore();
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  // NEW LOGIC: Find product by its unique ID (e.g., 'fs-1', 'dj-100')
  const uniqueId = id;
  const product = products.find(p => {
    // Check if the source prefix matches the product type and the ID matches the number
    const productSource = getProductSourcePrefix(p); // Helper function
    return `${productSource}-${p.id}` === uniqueId;
  });
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading product details..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to="/products">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const normalized = normalizeProduct(product);
  const images = normalized.images || [normalized.image];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: normalized.id,
        name: normalized.name,
        price: normalized.price,
        image: normalized.image,
        category: normalized.category,
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : index < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const specifications = [
    { label: 'Category', value: normalized.category },
    { label: 'Brand', value: normalized.brand || 'Generic' },
    { label: 'Rating', value: `${normalized.rating}/5 Stars` },
    { label: 'Stock', value: normalized.stock ? `${normalized.stock} units available` : 'In Stock' },
    { label: 'SKU', value: `PRD-${normalized.id}` },
  ];

  const reviews = [
    {
      id: 1,
      user: 'Sarah Johnson',
      rating: 5,
      date: '2024-01-15',
      comment: 'Excellent product! The quality exceeded my expectations. Fast shipping too!',
      avatar: 'SJ'
    },
    {
      id: 2,
      user: 'Mike Chen',
      rating: 4,
      date: '2024-01-10',
      comment: 'Good value for money. Would recommend to others.',
      avatar: 'MC'
    },
    {
      id: 3,
      user: 'Emily Davis',
      rating: 5,
      date: '2024-01-08',
      comment: 'Absolutely love this product! Will definitely buy again.',
      avatar: 'ED'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary-600">Products</Link>
          <span>/</span>
          <span className="text-gray-900 truncate">{normalized.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={normalized.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                      selectedImage === index 
                        ? 'border-primary-600 scale-105' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${normalized.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {normalized.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {renderStars(normalized.rating)}
                  <span className="ml-2 text-gray-600">
                    ({normalized.rating})
                  </span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-green-600 font-semibold">In Stock</span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-primary-600">
                  {formatPrice(normalized.price)}
                </span>
                {normalized.price > 50 && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Free Shipping
                  </span>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-green-600" />
                <span>Free shipping over $50</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-green-600" />
                <span>30-day returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span>2-year warranty</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-900">Quantity:</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center text-xl font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1"
              >
                Add {quantity} to Cart - {formatPrice(normalized.price * quantity)}
              </Button>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="lg">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-primary-50 rounded-xl p-6">
              <h4 className="font-semibold text-primary-900 mb-2">Delivery Information</h4>
              <ul className="text-primary-700 space-y-1 text-sm">
                <li>• Free shipping on orders over $50</li>
                <li>• Express delivery available</li>
                <li>• 30-day return policy</li>
                <li>• Secure payment processing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'specifications', label: 'Specifications' },
                { id: 'reviews', label: `Reviews (${reviews.length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {normalized.description}
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Premium quality materials</li>
                      <li>• Designed for durability</li>
                      <li>• Easy to use and maintain</li>
                      <li>• Excellent value for money</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">What's Included</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Main product</li>
                      <li>• User manual</li>
                      <li>• Warranty card</li>
                      <li>• All necessary accessories</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Product Specifications</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {specifications.map((spec, index) => (
                      <div key={index} className="flex border-b border-gray-100 pb-3">
                        <div className="w-1/3 font-medium text-gray-700">{spec.label}</div>
                        <div className="w-2/3 text-gray-900 capitalize">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Review Summary */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-1">
                        {normalized.rating}
                      </div>
                      <div className="flex items-center justify-center">
                        {renderStars(normalized.rating)}
                      </div>
                      <div className="text-gray-600 text-sm mt-1">
                        Based on {reviews.length} reviews
                      </div>
                    </div>
                    <div className="flex-1">
                      <Button className="w-full sm:w-auto">
                        Write a Review
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold">
                          {review.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{review.user}</h4>
                            <span className="text-gray-500 text-sm">{review.date}</span>
                          </div>
                          <div className="flex items-center space-x-1 mb-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map(relatedProduct => {
                const normalizedRelated = normalizeProduct(relatedProduct);
                return (
                  <Link
                    key={normalizedRelated.uniqueId} // Use uniqueId for key
                    to={`/product/${normalizedRelated.uniqueId}`} // Use uniqueId for link
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={normalizedRelated.image}
                        alt={normalizedRelated.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                        {normalizedRelated.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary-600">
                          {formatPrice(normalizedRelated.price)}
                        </span>
                        <div className="flex items-center space-x-1">
                          {renderStars(normalizedRelated.rating)}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;