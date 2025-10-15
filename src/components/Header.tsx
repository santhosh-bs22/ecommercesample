import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '@/hooks';
import { SearchBar } from './SearchBar';
import { Button } from './ui';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();

  return (
    <header className="bg-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden mb-4 animate-fade-in">
            <SearchBar />
          </div>
        )}

        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gray-800 hidden sm:block">ShopCart</span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:block flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Search className="w-6 h-6 text-gray-700" />
            </button>

            {/* User Account */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <User className="w-5 h-5 mr-2" />
              Account
            </Button>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-primary-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              <a href="#" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Home</a>
              <a href="#" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Products</a>
              <a href="#" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Categories</a>
              <a href="#" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Deals</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;