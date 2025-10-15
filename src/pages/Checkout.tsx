import React from 'react';
import { CheckoutForm } from '@/components';

export const Checkout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <CheckoutForm />
    </div>
  );
};

export default Checkout;