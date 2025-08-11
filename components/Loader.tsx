
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
      <p className="text-lg font-medium text-gray-700">A IA está redesenhando seu espaço...</p>
      <p className="text-sm text-gray-500">Isso pode levar alguns segundos.</p>
    </div>
  );
};