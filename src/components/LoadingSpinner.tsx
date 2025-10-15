import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...' 
}) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className={`${sizes[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin-slow`}></div>
        <div className={`absolute top-0 left-0 ${sizes[size]} border-4 border-transparent border-t-purple-600 rounded-full animate-spin`}></div>
      </div>
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce-slow"></div>
        <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce-slow" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 bg-pink-600 rounded-full animate-bounce-slow" style={{ animationDelay: '0.4s' }}></div>
      </div>
      {text && (
        <p className="text-gray-600 font-medium">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;