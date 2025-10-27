
import React from 'react';

interface LoadingSpinnerProps {
  step: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ step }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-teal-600 rounded-full animate-spin"></div>
      <p className="text-lg font-medium text-teal-700">{step}</p>
    </div>
  );
};

export default LoadingSpinner;
