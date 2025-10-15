import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCart } from '@/hooks';
import { checkoutSchema, CheckoutFormData } from '@/utils/validation';
import { formatPrice } from '@/utils/helpers';
import { Input, Button } from './ui';

export const CheckoutForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { items, totalPrice, clearCart } = useCart();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Order submitted:', { ...data, items, totalPrice });
    clearCart();
    alert('Order placed successfully!');
    setIsSubmitting(false);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <div className="text-gray-500 text-lg mb-4">Your cart is empty</div>
        <Button onClick={() => window.location.href = '/'}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-gray-600">
                    {formatPrice(item.price)} × {item.quantity}
                  </p>
                </div>
                <span className="font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                {...register('firstName')}
                error={errors.firstName?.message}
              />
              <Input
                label="Last Name"
                {...register('lastName')}
                error={errors.lastName?.message}
              />
            </div>
            
            <div className="mt-4">
              <Input
                label="Email"
                type="email"
                {...register('email')}
                error={errors.email?.message}
              />
            </div>

            <div className="mt-4">
              <Input
                label="Phone"
                {...register('phone')}
                error={errors.phone?.message}
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
            <div className="space-y-4">
              <Input
                label="Address"
                {...register('address')}
                error={errors.address?.message}
              />
              
              <div className="grid grid-cols-3 gap-4">
                <Input
                  label="City"
                  {...register('city')}
                  error={errors.city?.message}
                />
                <Input
                  label="ZIP Code"
                  {...register('zipCode')}
                  error={errors.zipCode?.message}
                />
                <Input
                  label="Country"
                  {...register('country')}
                  error={errors.country?.message}
                />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
            <div className="space-y-4">
              <Input
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                {...register('cardNumber')}
                error={errors.cardNumber?.message}
              />
              
              <div className="grid grid-cols-3 gap-4">
                <Input
                  label="Expiry Date"
                  placeholder="MM/YY"
                  {...register('expiryDate')}
                  error={errors.expiryDate?.message}
                />
                <Input
                  label="CVV"
                  {...register('cvv')}
                  error={errors.cvv?.message}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            loading={isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? 'Processing...' : `Place Order - ${formatPrice(totalPrice)}`}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;