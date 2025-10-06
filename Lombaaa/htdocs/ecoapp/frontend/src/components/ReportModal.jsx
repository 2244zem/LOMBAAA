// src/components/ReportModal.jsx
import React, { useState } from 'react';

const ReportModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'organik',
    latitude: '',
    longitude: '',
    photoUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulasi proses submit
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Jika ada latitude/longitude kosong, gunakan lokasi default
      const finalData = {
        ...formData,
        latitude: formData.latitude || -6.2088 + (Math.random() * 0.02 - 0.01),
        longitude: formData.longitude || 106.8456 + (Math.random() * 0.02 - 0.01),
        photoUrl: formData.photoUrl || 'https://images.unsplash.com/photo-1587332060322-7cd5e8adfcee?w=400'
      };

      onSubmit(finalData);
      onClose();
      alert('✅ Laporan sampah berhasil dikirim!');
    } catch (error) {
      alert('❌ Gagal mengirim laporan. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
          alert('📍 Lokasi berhasil didapatkan!');
        },
        (error) => {
          alert('❌ Gagal mendapatkan lokasi. Pastikan GPS aktif.');
        }
      );
    } else {
      alert('❌ Browser tidak mendukung geolocation.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">📝 Laporkan Sampah Baru</h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                disabled={isSubmitting}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Judul Laporan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul Laporan *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Contoh: Tumpukan Sampah Plastik di Jalan Merdeka"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  disabled={isSubmitting}
                />
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Detail *
                </label>
                <textarea
                  name="description"
                  required
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Jelaskan kondisi sampah, estimasi jumlah, dampak terhadap lingkungan, dll."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                  disabled={isSubmitting}
                />
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori Sampah *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: 'organik', label: '🍂 Organik', color: 'bg-green-100 border-green-500 text-green-700' },
                    { value: 'anorganik', label: '🫙 Anorganik', color: 'bg-blue-100 border-blue-500 text-blue-700' },
                    { value: 'b3', label: '⚠️ B3', color: 'bg-red-100 border-red-500 text-red-700' }
                  ].map(category => (
                    <label 
                      key={category.value}
                      className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.category === category.value 
                          ? `${category.color} border-2` 
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={formData.category === category.value}
                        onChange={handleChange}
                        className="text-green-600"
                        disabled={isSubmitting}
                      />
                      <span className="font-medium">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Lokasi */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Koordinat Lokasi
                  </label>
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
                    disabled={isSubmitting}
                  >
                    📍 Dapatkan Lokasi Saya
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleChange}
                      placeholder="-6.2088"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleChange}
                      placeholder="106.8456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Kosongkan koordinat untuk menggunakan lokasi acak di Jakarta
                </p>
              </div>

              {/* Upload Foto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foto Sampah *
                </label>
                <input
                  type="url"
                  name="photoUrl"
                  required
                  value={formData.photoUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/foto-sampah.jpg"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  disabled={isSubmitting}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Masukkan URL gambar sampah. Untuk demo, gunakan URL dari Unsplash.
                </p>
                
                {/* Preview Foto */}
                {formData.photoUrl && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview Foto:</p>
                    <img 
                      src={formData.photoUrl} 
                      alt="Preview" 
                      className="w-full h-32 object-cover rounded-lg border"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1587332060322-7cd5e8adfcee?w=400';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Contoh URL */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-2">🌅 Contoh URL Foto untuk Demo:</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• https://images.unsplash.com/photo-1587332060322-7cd5e8adfcee?w=400 (Sampah Plastik)</p>
                  <p>• https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400 (Sampah Organik)</p>
                  <p>• https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=400 (Limbah B3)</p>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                      Mengirim Laporan...
                    </>
                  ) : (
                    '📤 Kirim Laporan'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;