// src/features/marketplaceKarya.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const MarketplaceKarya = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Tas Fashion dari Plastik Kresek Daur Ulang', 
      price: 150000, 
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', 
      description: 'Tas trendy dan kuat yang dibuat dari plastik kresek daur ulang. Desain modern dengan motif unik, cocok untuk gaya sehari-hari yang ramah lingkungan.',
      seller: 'Eco Fashion',
      category: 'Fashion',
      rating: 4.7,
      stock: 8,
      materials: ['Plastik kresek', 'Resin daur ulang'],
      dimensions: '30x40x15 cm'
    },
    { 
      id: 2, 
      name: 'Pot Bunga Artistik dari Ban Bekas', 
      price: 75000, 
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400', 
      description: 'Pot bunga unik dari ban mobil bekas yang didesain dengan cat ramah lingkungan. Tersedia dalam berbagai warna dan ukuran.',
      seller: 'Green Art',
      category: 'Home Decor',
      rating: 4.5,
      stock: 12,
      materials: ['Ban bekas', 'Cat eco-friendly'],
      dimensions: 'Ø35x25 cm'
    },
    { 
      id: 3, 
      name: 'Lukisan Kolase dari Kardus Bekas', 
      price: 200000, 
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', 
      description: 'Karya seni unik yang dibuat dari potongan kardus bekas dengan teknik kolase. Setiap karya adalah original dan one-of-a-kind.',
      seller: 'Art Reborn',
      category: 'Art',
      rating: 4.9,
      stock: 3,
      materials: ['Kardus bekas', 'Lem organik'],
      dimensions: '50x70 cm'
    },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Fashion', 'Home Decor', 'Art', 'Accessories', 'Furniture'];

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
  };

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
      rating: 4.0,
      stock: parseInt(newProduct.stock),
      materials: newProduct.materials?.split(',') || ['Bahan daur ulang'],
      dimensions: newProduct.dimensions || 'Standard'
    };
    setProducts([product, ...products]);
    setShowUploadModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🛍️ Marketplace Karya Daur Ulang</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan karya kreatif ramah lingkungan yang dibuat dengan penuh cinta dari bahan daur ulang
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="🔍 Cari produk daur ulang..."
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
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap flex items-center space-x-2"
              >
                <span>+</span>
                <span>Upload Karya</span>
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-600">Belum ada produk yang sesuai</h3>
            <p className="text-gray-500">Coba ubah kata pencarian atau pilih kategori lain</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
                onClick={() => setSelectedProduct(product)}
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
                    <span className="text-green-600 font-bold ml-2">{formatRupiah(product.price)}</span>
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
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Product Modal */}
        {showUploadModal && (
          <UploadProductModal
            onClose={() => setShowUploadModal(false)}
            onSubmit={handleAddProduct}
          />
        )}

        {/* Product Detail Modal */}
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            formatRupiah={formatRupiah}
          />
        )}
      </div>
    </div>
  );
};

// Upload Product Modal Component
const UploadProductModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Fashion',
    stock: '',
    image: '',
    materials: '',
    dimensions: ''
  });

  const categories = ['Fashion', 'Home Decor', 'Art', 'Accessories', 'Furniture', 'Other'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">🎨 Upload Karya Daur Ulang</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Produk *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Contoh: Tas dari Plastik Daur Ulang"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harga (Rp) *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="150000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stok *
                </label>
                <input
                  type="number"
                  name="stock"
                  required
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori *
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Produk *
              </label>
              <textarea
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Jelaskan tentang produk daur ulang Anda, bahan yang digunakan, keunikan, dll."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bahan yang Digunakan
              </label>
              <input
                type="text"
                name="materials"
                value={formData.materials}
                onChange={handleChange}
                placeholder="Contoh: Plastik kresek, Resin daur ulang, Kayu palet"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Gambar Produk *
              </label>
              <input
                type="url"
                name="image"
                required
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Upload Karya
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Product Detail Modal Component
const ProductDetailModal = ({ product, onClose, formatRupiah }) => {
  const [quantity, setQuantity] = useState(1);

  const handleBuy = () => {
    alert(`🎉 Terima kasih! Anda akan membeli ${quantity} ${product.name} seharga ${formatRupiah(product.price * quantity)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">📦 Detail Produk</h2>
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
                  {formatRupiah(product.price)}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">📖 Deskripsi Produk</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">🛍️ Penjual</span>
                  <span className="font-semibold">{product.seller}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">📦 Stok Tersedia</span>
                  <span className="font-semibold">{product.stock} unit</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">🏷️ Kategori</span>
                  <span className="font-semibold">{product.category}</span>
                </div>
                {product.materials && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">🔧 Bahan</span>
                    <span className="font-semibold text-right">{product.materials.join(', ')}</span>
                  </div>
                )}
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

export default MarketplaceKarya;