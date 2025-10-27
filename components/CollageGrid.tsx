
import React from 'react';

interface CollageGridProps {
  images: string[];
}

const CollageGrid: React.FC<CollageGridProps> = ({ images }) => {
  // Define specific spans for certain images to create a dynamic layout
  const gridClasses = [
    'col-span-2 row-span-2', // Image 1
    'col-span-1 row-span-1', // Image 2
    'col-span-1 row-span-1', // Image 3
    'col-span-1 row-span-1', // Image 4
    'col-span-1 row-span-2', // Image 5
    'col-span-2 row-span-1', // Image 6
    'col-span-1 row-span-1', // Image 7
    'col-span-1 row-span-1', // Image 8
  ];

  return (
    <div className="mt-8 p-4 bg-white rounded-lg shadow-xl animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Tu Visión del Bienestar</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-3 gap-4 auto-rows-[150px] md:auto-rows-[200px]">
        {images.map((src, index) => (
          <div key={index} className={`${gridClasses[index % gridClasses.length]} rounded-lg overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105 hover:z-10`}>
            <img 
              src={src} 
              alt={`Imagen de bienestar ${index + 1}`} 
              className="w-full h-full object-cover" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollageGrid;
