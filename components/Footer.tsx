
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-sm text-gray-500">
          Creado con React, Tailwind CSS y la API de Google Gemini.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
