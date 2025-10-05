// src/features/petaSampah/index.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as laporanApi from './services/laporanApi';

/**
 * Halaman Peta Sampah yang menampilkan semua laporan dalam bentuk peta interaktif.
 * - Menggunakan react-leaflet untuk rendering peta.
 * - Menampilkan marker untuk setiap laporan dengan popup detail.
 * - Memiliki filter untuk menampilkan laporan berdasarkan kategori.
 */
const PetaSampah = () => {
  const [laporans, setLaporans] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportForm, setReportForm] = useState({
    title: '',
    description: '',
    category: 'organik',
    latitude: '',
    longitude: '',
    photoUrl: ''
  });

  // Ikon kustom untuk marker
  const customIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  useEffect(() => {
    const fetchLaporans = async () => {
      try {
        const data = await laporanApi.getAllLaporan();
        setLaporans(data);
      } catch (error) {
        console.error('Error fetching laporan:', error);
        // Fallback data jika API error
        setLaporans([
          {
            id: 1,
            title: 'Tumpukan Sampah Plastik',
            description: 'Tumpukan sampah plastik di pinggir jalan',
            category: 'anorganik',
            latitude: -6.2088,
            longitude: 106.8456,
            photoUrl: 'https://images.unsplash.com/photo-1587332060322-7cd5e8adfcee?w=300'
          },
          {
            id: 2,
            title: 'Sampah Organik Pasar',
            description: 'Sampah organik dari pasar tradisional',
            category: 'organik',
            latitude: -6.2188,
            longitude: 106.8356,
            photoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300'
          },
          {
            id: 3,
            title: 'Limbah B3 Rumah Sakit',
            description: 'Limbah B3 dari fasilitas kesehatan',
            category: 'b3',
            latitude: -6.1988,
            longitude: 106.8556,
            photoUrl: 'https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=300'
          }
        ]);
      }
      setLoading(false);
    };
    fetchLaporans();
  }, []);

  const filteredLaporans = filter
    ? laporans.filter(laporan => laporan.category === filter)
    : laporans;

  const getCategoryColor = (category) => {
    switch (category) {
      case 'organik': return 'bg-green-500';
      case 'anorganik': return 'bg-blue-500';
      case 'b3': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'organik': return 'Organik';
      case 'anorganik': return 'Anorganik';
      case 'b3': return 'B3';
      default: return 'Lainnya';
    }
  };

  const handleReportFormChange = (e) => {
    setReportForm({
      ...reportForm,
      [e.target.name]: e.target.value
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setReportForm(prev => ({
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

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newReport = {
        id: Date.now(),
        title: reportForm.title,
        description: reportForm.description,
        category: reportForm.category,
        latitude: reportForm.latitude || -6.2088 + (Math.random() * 0.02 - 0.01),
        longitude: reportForm.longitude || 106.8456 + (Math.random() * 0.02 - 0.01),
        photoUrl: reportForm.photoUrl || 'https://images.unsplash.com/photo-1587332060322-7cd5e8adfcee?w=300',
        createdAt: new Date().toISOString()
      };

      setLaporans(prev => [newReport, ...prev]);
      setIsReportModalOpen(false);
      setReportForm({
        title: '',
        description: '',
        category: 'organik',
        latitude: '',
        longitude: '',
        photoUrl: ''
      });
      alert('✅ Laporan sampah berhasil dikirim!');
    } catch (error) {
      alert('❌ Gagal mengirim laporan. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Komponen Modal yang dipisah dengan z-index yang tepat
  const ReportModal = () => {
    if (!isReportModalOpen) return null;

    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        {/* Overlay dengan opacity lebih rendah agar peta masih terlihat */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
          onClick={() => !isSubmitting && setIsReportModalOpen(false)}
        />
        
        {/* Modal Container */}
        <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">📝 Laporkan Sampah Baru</h2>
              <button 
                onClick={() => !isSubmitting && setIsReportModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl transition-colors"
                disabled={isSubmitting}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReport} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul Laporan *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={reportForm.title}
                  onChange={handleReportFormChange}
                  placeholder="Contoh: Tumpukan Sampah Plastik di Jalan Merdeka"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Detail *
                </label>
                <textarea
                  name="description"
                  required
                  rows="4"
                  value={reportForm.description}
                  onChange={handleReportFormChange}
                  placeholder="Jelaskan kondisi sampah, estimasi jumlah, dampak terhadap lingkungan, dll."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none transition-colors"
                  disabled={isSubmitting}
                />
              </div>

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
                        reportForm.category === category.value 
                          ? `${category.color} border-2 shadow-md` 
                          : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={reportForm.category === category.value}
                        onChange={handleReportFormChange}
                        className="text-green-600 focus:ring-green-500"
                        disabled={isSubmitting}
                      />
                      <span className="font-medium">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Koordinat Lokasi
                  </label>
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center space-x-1"
                    disabled={isSubmitting}
                  >
                    <span>📍</span>
                    <span>Dapatkan Lokasi Saya</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      name="latitude"
                      value={reportForm.latitude}
                      onChange={handleReportFormChange}
                      placeholder="-6.2088"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm transition-colors"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      name="longitude"
                      value={reportForm.longitude}
                      onChange={handleReportFormChange}
                      placeholder="106.8456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm transition-colors"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Kosongkan koordinat untuk menggunakan lokasi acak di Jakarta
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foto Sampah *
                </label>
                <input
                  type="url"
                  name="photoUrl"
                  required
                  value={reportForm.photoUrl}
                  onChange={handleReportFormChange}
                  placeholder="https://example.com/foto-sampah.jpg"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  disabled={isSubmitting}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Masukkan URL gambar sampah. Untuk demo, gunakan URL dari Unsplash.
                </p>
                
                {reportForm.photoUrl && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview Foto:</p>
                    <img 
                      src={reportForm.photoUrl} 
                      alt="Preview" 
                      className="w-full h-32 object-cover rounded-lg border shadow-sm"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1587332060322-7cd5e8adfcee?w=400';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-700 mb-2">🌅 Contoh URL Foto untuk Demo:</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• https://images.unsplash.com/photo-1587332060322-7cd5e8adfcee?w=400 (Sampah Plastik)</p>
                  <p>• https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400 (Sampah Organik)</p>
                  <p>• https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=400 (Limbah B3)</p>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
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
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-4 lg:py-8 relative">
      <div className="max-w-7xl mx-auto px-3 lg:px-4">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">🗺️ Peta Sebaran Sampah</h1>
          <p className="text-sm lg:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Pantau lokasi penumpukan sampah dan laporan sampah di sekitar Anda
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6 mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="font-semibold text-gray-900 text-lg lg:text-xl mb-2">Filter Berdasarkan Kategori</h2>
              <p className="text-gray-600 text-sm">Pilih kategori sampah untuk difilter</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm lg:text-base ${
                  filter === '' 
                    ? 'bg-green-600 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setFilter('organik')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm lg:text-base ${
                  filter === 'organik' 
                    ? 'bg-green-600 text-white shadow-lg' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                🍂 Organik
              </button>
              <button
                onClick={() => setFilter('anorganik')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm lg:text-base ${
                  filter === 'anorganik' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                🫙 Anorganik
              </button>
              <button
                onClick={() => setFilter('b3')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm lg:text-base ${
                  filter === 'b3' 
                    ? 'bg-red-600 text-white shadow-lg' 
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                ⚠️ B3
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6 text-center">
            <div className="text-2xl lg:text-3xl text-gray-500 mb-1 lg:mb-2">📊</div>
            <h3 className="font-bold text-gray-900 text-base lg:text-lg">Total Laporan</h3>
            <p className="text-2xl lg:text-3xl font-bold text-gray-700 mt-1 lg:mt-2">{laporans.length}</p>
            <p className="text-gray-600 text-xs lg:text-sm">Semua Kategori</p>
          </div>

          <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6 text-center">
            <div className="text-2xl lg:text-3xl text-green-500 mb-1 lg:mb-2">🍂</div>
            <h3 className="font-bold text-gray-900 text-base lg:text-lg">Organik</h3>
            <p className="text-2xl lg:text-3xl font-bold text-green-600 mt-1 lg:mt-2">
              {laporans.filter(l => l.category === 'organik').length}
            </p>
            <p className="text-gray-600 text-xs lg:text-sm">Sampah Alami</p>
          </div>

          <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6 text-center">
            <div className="text-2xl lg:text-3xl text-blue-500 mb-1 lg:mb-2">🫙</div>
            <h3 className="font-bold text-gray-900 text-base lg:text-lg">Anorganik</h3>
            <p className="text-2xl lg:text-3xl font-bold text-blue-600 mt-1 lg:mt-2">
              {laporans.filter(l => l.category === 'anorganik').length}
            </p>
            <p className="text-gray-600 text-xs lg:text-sm">Plastik & Logam</p>
          </div>

          <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6 text-center">
            <div className="text-2xl lg:text-3xl text-red-500 mb-1 lg:mb-2">⚠️</div>
            <h3 className="font-bold text-gray-900 text-base lg:text-lg">B3</h3>
            <p className="text-2xl lg:text-3xl font-bold text-red-600 mt-1 lg:mt-2">
              {laporans.filter(l => l.category === 'b3').length}
            </p>
            <p className="text-gray-600 text-xs lg:text-sm">Berbahaya & Beracun</p>
          </div>
        </div>

        {/* Map Container - Pastikan z-index lebih rendah dari modal */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6 mb-6 lg:mb-8 relative z-10">
          <div className="h-64 lg:h-96 xl:h-[500px] rounded-lg overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Memuat peta...</p>
                </div>
              </div>
            ) : (
              <MapContainer 
                center={[-6.2088, 106.8456]} 
                zoom={12} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredLaporans.map((laporan) => (
                  <Marker 
                    key={laporan.id} 
                    position={[laporan.latitude, laporan.longitude]} 
                    icon={customIcon}
                  >
                    <Popup className="custom-popup">
                      <div className="min-w-[250px] lg:min-w-[300px]">
                        <img 
                          src={laporan.photoUrl || 'https://images.unsplash.com/photo-1587332060322-7cd5e8adfcee?w=300'} 
                          alt={laporan.title} 
                          className="w-full h-32 lg:h-40 object-cover rounded mb-3"
                        />
                        <h3 className="font-bold text-gray-900 text-lg mb-2">{laporan.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{laporan.description}</p>
                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getCategoryColor(laporan.category)}`}>
                            {getCategoryLabel(laporan.category)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {laporan.latitude.toFixed(4)}, {laporan.longitude.toFixed(4)}
                          </span>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>
        </div>

        {/* Recent Reports List */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 lg:mb-6">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-0">📋 Daftar Laporan Terbaru</h2>
            <span className="text-sm text-gray-600">
              Menampilkan {filteredLaporans.length} laporan
              {filter && ` (filter: ${getCategoryLabel(filter)})`}
            </span>
          </div>

          {filteredLaporans.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📭</div>
              <p className="text-gray-600">Tidak ada laporan yang sesuai dengan filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredLaporans.slice(0, 6).map((laporan) => (
                <div key={laporan.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full mt-2 ${getCategoryColor(laporan.category)}`}></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm lg:text-base mb-1">{laporan.title}</h3>
                      <p className="text-gray-600 text-xs lg:text-sm mb-2 line-clamp-2">{laporan.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(laporan.category)}`}>
                          {getCategoryLabel(laporan.category)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {laporan.latitude.toFixed(2)}, {laporan.longitude.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredLaporans.length > 6 && (
            <div className="text-center mt-6">
              <button className="text-green-600 hover:text-green-700 font-semibold text-sm lg:text-base">
                Lihat Semua Laporan ({filteredLaporans.length})
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center mt-6 lg:mt-8 relative z-10">
          <button 
            onClick={() => setIsReportModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold transition-colors text-sm lg:text-base flex items-center justify-center space-x-2 shadow-lg"
          >
            <span>📝</span>
            <span>Laporkan Sampah Baru</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-semibold transition-colors text-sm lg:text-base flex items-center justify-center space-x-2 shadow-lg">
            <span>📱</span>
            <span>Download App</span>
          </button>
        </div>
      </div>

      {/* Report Modal dengan z-index tinggi */}
      <ReportModal />
    </div>
  );
};

export default PetaSampah;