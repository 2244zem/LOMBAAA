// src/features/marketplaceKarya/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product, onClick }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          ♻️ Daur Ulang
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">{product.name}</h3>
          <span className="text-green-600 font-bold ml-2">Rp {product.price.toLocaleString()}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>By {product.seller}</span>
          <div className="flex items-center space-x-1">
            <span>⭐ {product.rating}</span>
            <span>•</span>
            <span>Stok: {product.stock}</span>
          </div>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation(); // Mencegah trigger onClick card
            alert(`Beli ${product.name} - Rp ${product.price.toLocaleString()}`);
          }}
          className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-colors duration-200"
        >
          Beli Sekarang
        </button>
      </div>
    </div>
  );
};

export default ProductCard;