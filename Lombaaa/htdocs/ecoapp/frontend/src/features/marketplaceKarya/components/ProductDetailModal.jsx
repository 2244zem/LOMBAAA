// src/features/marketplaceKarya/components/ProductDetailModal.jsx
import React, { useState } from 'react';

const ProductDetailModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  const handleBuy = () => {
    alert(`Terima kasih! Anda akan membeli ${quantity} ${product.name}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Detail Produk</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ✕
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-80 object-cover"
                />
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-green-800">
                  <span className="text-2xl">♻️</span>
                  <div>
                    <p className="font-semibold">Produk Ramah Lingkungan</p>
                    <p className="text-sm">Dibuat dari bahan daur ulang yang berkualitas</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <span>⭐ {product.rating} • 25 reviews</span>
                  <span>•</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-600 mb-4">
                  Rp {product.price.toLocaleString()}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Deskripsi Produk</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Penjual</span>
                  <span className="font-semibold">{product.seller}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Stok Tersedia</span>
                  <span className="font-semibold">{product.stock} unit</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Kategori</span>
                  <span className="font-semibold">{product.category}</span>
                </div>
              </div>

              {/* Purchase Section */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-4">
                  <label className="text-gray-700 font-medium">Jumlah:</label>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">Max: {product.stock}</span>
                </div>

                <div className="flex space-x-4">
                  <button className="flex-1 border border-green-600 text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                    + Keranjang
                  </button>
                  <button 
                    onClick={handleBuy}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Beli Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;