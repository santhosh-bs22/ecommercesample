import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ArrowLeft, Heart, Share2 } from 'lucide-react';
import { useProducts, useCart } from '@/hooks';
import { normalizeProduct, formatPrice } from '@/utils/helpers';
import { LoadingSpinner } from '@/components';
import { Button } from '@/components/ui';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, loading } = useProducts();
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);

  const product = products.find(p => p.id === Number(id));
  
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
  const images = normalized.images;

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary-600">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{normalized.name}</span>
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

            <p className="text-gray-700 leading-relaxed text-lg">
              {normalized.description}
            </p>

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

            {/* Product Specifications */}
            <div className="bg-white rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Category:</span>
                  <p className="font-medium capitalize">{normalized.category}</p>
                </div>
                {normalized.brand && (
                  <div>
                    <span className="text-gray-600">Brand:</span>
                    <p className="font-medium">{normalized.brand}</p>
                  </div>
                )}
                <div>
                  <span className="text-gray-600">Rating:</span>
                  <p className="font-medium">{normalized.rating}/5 Stars</p>
                </div>
                {normalized.stock && (
                  <div>
                    <span className="text-gray-600">Stock:</span>
                    <p className="font-medium">{normalized.stock} units available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Info */}
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
      </div>
    </div>
  );
};

export default ProductDetail;