# E-commerce Shopping Cart

A modern e-commerce shopping cart application built with React, TypeScript, Zustand, and Tailwind CSS.

## Features

- 🛍️ Product catalog from Fake Store API and DummyJSON API
- 🛒 Shopping cart with persistent storage
- 🔍 Product search and category filtering
- 📱 Responsive design
- ⚡ Fast and optimized performance
- 🎨 Modern UI with smooth animations
- ✅ Form validation with Zod
- 🧪 TypeScript for type safety

## Tech Stack

- **Frontend**: React 18, TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Validation**: Zod + React Hook Form
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Getting Started

1. Install dependencies:
```bash
npm install 

Start development server:

bash
npm run dev
Build for production:

bash
npm run build
Project Structure
See the project structure in the main documentation.

API Sources
Fake Store API: https://fakestoreapi.com

DummyJSON API: https://dummyjson.com

text

## 2. Type Definitions

### src/types/product.ts
```typescript
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