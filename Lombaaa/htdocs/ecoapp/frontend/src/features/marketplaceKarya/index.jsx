// src/features/marketplaceKarya/index.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ProductCard from './components/ProductCard';
import UploadProductModal from './components/UploadProductModal';
import ProductDetailModal from './components/ProductDetailModal';

// Data produk contoh
const sampleProducts = [
  {
    id: 1,
    name: 'Tas dari Plastik Daur Ulang',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    description: 'Tas cantik yang terbuat dari plastik daur ulang, kuat dan stylish.',
    seller: 'Eco Craft',
    category: 'Fashion',
    rating: 4.5,
    stock: 15
  },
  {
    id: 2,
    name: 'Pot Bunga dari Botol Kaca',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    description: 'Pot bunga unik dari botol kaca daur ulang, cocok untuk tanaman hias.',
    seller: 'Green Thumb',
    category: 'Home Decor',
    rating: 4.2,
    stock: 8
  },
  {
    id: 3,
    name: 'Lampu dari Kayu Palet',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
    description: 'Lampu hias elegan dari kayu palet bekas, memberikan kesan rustic.',
    seller: 'Wood Art',
    category: 'Home Decor',
    rating: 4.8,
    stock: 5
  }
];

const MarketplaceKarya = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState(sampleProducts);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Fashion', 'Home Decor', 'Accessories', 'Art', 'Furniture'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: products.length + 1,
      seller: user?.name || 'Anonymous',
      rating: 0,
      stock: parseInt(newProduct.stock)
    };
    setProducts([product, ...products]);
    setShowUploadModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🌿 Marketplace Karya Daur Ulang</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan karya kreatif dari bahan daur ulang yang ramah lingkungan dan penuh makna
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="Cari produk daur ulang..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {user && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
              >
                + Upload Karya
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-semibold text-gray-600">Belum ada produk yang sesuai</h3>
            <p className="text-gray-500">Coba ubah pencarian atau filter kategori</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}

        {/* Modals */}
        {showUploadModal && (
          <UploadProductModal
            onClose={() => setShowUploadModal(false)}
            onSubmit={handleAddProduct}
          />
        )}

        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </div>
  );
};

export default MarketplaceKarya;