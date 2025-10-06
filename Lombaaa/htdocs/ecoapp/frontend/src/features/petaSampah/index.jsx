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
      case 'organik': return 'from-emerald-500 to-green-500';
      case 'anorganik': return 'from-blue-500 to-cyan-500';
      case 'b3': return 'from-rose-500 to-red-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getCategoryBgColor = (category) => {
    switch (category) {
      case 'organik': return 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200';
      case 'anorganik': return 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200';
      case 'b3': return 'bg-gradient-to-r from-rose-50 to-red-50 border-rose-200';
      default: return 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200';
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
        {/* Overlay dengan glass effect */}
        <div 
          className="absolute inset-0 bg-slate-900/70 backdrop-blur-md"
          onClick={() => !isSubmitting && setIsReportModalOpen(false)}
        />
        
        {/* Modal Container */}
        <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  📝 Laporkan Sampah Baru
                </h2>
                <p className="text-slate-600 mt-2">Bantu lingkungan dengan melaporkan sampah yang ditemui</p>
              </div>
              <button 
                onClick={() => !isSubmitting && setIsReportModalOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-200 text-slate-600 hover:text-slate-800"
                disabled={isSubmitting}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReport} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Judul Laporan *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={reportForm.title}
                  onChange={handleReportFormChange}
                  placeholder="Contoh: Tumpukan Sampah Plastik di Jalan Merdeka"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Deskripsi Detail *
                </label>
                <textarea
                  name="description"
                  required
                  rows="4"
                  value={reportForm.description}
                  onChange={handleReportFormChange}
                  placeholder="Jelaskan kondisi sampah, estimasi jumlah, dampak terhadap lingkungan, dll."
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none transition-all duration-200 bg-white/80 backdrop-blur-sm"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700">
                  Kategori Sampah *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { value: 'organik', label: '🍂 Organik', color: 'border-emerald-500 bg-emerald-50 text-emerald-700' },
                    { value: 'anorganik', label: '🫙 Anorganik', color: 'border-blue-500 bg-blue-50 text-blue-700' },
                    { value: 'b3', label: '⚠️ B3', color: 'border-rose-500 bg-rose-50 text-rose-700' }
                  ].map(category => (
                    <label 
                      key={category.value}
                      className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 ${
                        reportForm.category === category.value 
                          ? `${category.color} border-2 shadow-lg scale-105` 
                          : 'border-slate-300 hover:border-slate-400 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={reportForm.category === category.value}
                        onChange={handleReportFormChange}
                        className="text-emerald-600 focus:ring-emerald-500"
                        disabled={isSubmitting}
                      />
                      <span className="font-semibold">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4 bg-slate-50/50 rounded-2xl p-4 border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-slate-700">
                    Koordinat Lokasi
                  </label>
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                    disabled={isSubmitting}
                  >
                    <span>📍</span>
                    <span className="font-semibold">Dapatkan Lokasi Saya</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-slate-500">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      name="latitude"
                      value={reportForm.latitude}
                      onChange={handleReportFormChange}
                      placeholder="-6.2088"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all duration-200"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-slate-500">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      name="longitude"
                      value={reportForm.longitude}
                      onChange={handleReportFormChange}
                      placeholder="106.8456"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all duration-200"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <p className="text-xs text-slate-500">
                  Kosongkan koordinat untuk menggunakan lokasi acak di Jakarta
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700">
                  Foto Sampah *
                </label>
                <input
                  type="url"
                  name="photoUrl"
                  required
                  value={reportForm.photoUrl}
                  onChange={handleReportFormChange}
                  placeholder="https://example.com/foto-sampah.jpg"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  disabled={isSubmitting}
                />
                <p className="text-sm text-slate-500">
                  Masukkan URL gambar sampah. Untuk demo, gunakan URL dari Unsplash.
                </p>
                
                {reportForm.photoUrl && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-slate-700 mb-2">Preview Foto:</p>
                    <img 
                      src={reportForm.photoUrl} 
                      alt="Preview" 
                      className="w-full h-32 object-cover rounded-xl border-2 border-slate-200 shadow-sm"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1587332060322-7cd5e8adfcee?w=400';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-4">
                <h4 className="font-semibold text-slate-700 mb-3 flex items-center">
                  <span className="text-lg mr-2">🌅</span>
                  Contoh URL Foto untuk Demo:
                </h4>
                <div className="text-sm text-slate-600 space-y-2">
                  <p>• https://images.unsplash.com/photo-1587332060322-7cd5e8adfcee?w=400 (Sampah Plastik)</p>
                  <p>• https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400 (Sampah Organik)</p>
                  <p>• https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=400 (Limbah B3)</p>
                </div>
              </div>

              <div className="flex space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="flex-1 border border-slate-300 text-slate-700 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-200 disabled:opacity-50 shadow-sm"
                  disabled={isSubmitting}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-4 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
                      Mengirim Laporan...
                    </>
                  ) : (
                    <>
                      <span className="text-lg mr-2">📤</span>
                      Kirim Laporan
                    </>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 py-4 lg:py-8 relative">
      <div className="max-w-7xl mx-auto px-3 lg:px-4">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl shadow-2xl mb-6">
            <span className="text-3xl lg:text-4xl text-white">🗺️</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Peta Sebaran Sampah
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Pantau lokasi penumpukan sampah dan berkontribusi dalam 
            <span className="font-semibold text-emerald-600"> menjaga kebersihan lingkungan</span> sekitar Anda
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <h2 className="font-bold text-slate-800 text-xl lg:text-2xl">Filter Berdasarkan Kategori</h2>
              <p className="text-slate-600">Pilih kategori sampah untuk difilter di peta</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilter('')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg ${
                  filter === '' 
                    ? 'bg-gradient-to-r from-slate-700 to-slate-600 text-white shadow-xl scale-105' 
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                🌟 Semua
              </button>
              <button
                onClick={() => setFilter('organik')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg ${
                  filter === 'organik' 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-xl scale-105' 
                    : 'bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
                }`}
              >
                🍂 Organik
              </button>
              <button
                onClick={() => setFilter('anorganik')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg ${
                  filter === 'anorganik' 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-xl scale-105' 
                    : 'bg-white text-blue-700 hover:bg-blue-50 border border-blue-200'
                }`}
              >
                🫙 Anorganik
              </button>
              <button
                onClick={() => setFilter('b3')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg ${
                  filter === 'b3' 
                    ? 'bg-gradient-to-r from-rose-500 to-red-500 text-white shadow-xl scale-105' 
                    : 'bg-white text-rose-700 hover:bg-rose-50 border border-rose-200'
                }`}
              >
                ⚠️ B3
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8 lg:mb-12">
          {[
            { 
              icon: '📊', 
              label: 'Total Laporan', 
              value: laporans.length, 
              color: 'from-slate-600 to-slate-500',
              bg: 'bg-white'
            },
            { 
              icon: '🍂', 
              label: 'Organik', 
              value: laporans.filter(l => l.category === 'organik').length, 
              color: 'from-emerald-500 to-green-500',
              bg: 'bg-white'
            },
            { 
              icon: '🫙', 
              label: 'Anorganik', 
              value: laporans.filter(l => l.category === 'anorganik').length, 
              color: 'from-blue-500 to-cyan-500',
              bg: 'bg-white'
            },
            { 
              icon: '⚠️', 
              label: 'B3', 
              value: laporans.filter(l => l.category === 'b3').length, 
              color: 'from-rose-500 to-red-500',
              bg: 'bg-white'
            }
          ].map((stat, index) => (
            <div key={index} className={`${stat.bg} rounded-2xl shadow-lg p-6 text-center border border-white/20 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                <span className="text-2xl text-white">{stat.icon}</span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">{stat.label}</h3>
              <p className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </p>
              <p className="text-slate-600 text-sm">
                {stat.label === 'Total Laporan' ? 'Semua Kategori' : 
                 stat.label === 'Organik' ? 'Sampah Alami' :
                 stat.label === 'Anorganik' ? 'Plastik & Logam' : 'Berbahaya & Beracun'}
              </p>
            </div>
          ))}
        </div>

        {/* Map Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 lg:p-8 mb-8 lg:mb-12 border border-white/20 relative z-10">
          <div className="h-64 lg:h-96 xl:h-[500px] rounded-2xl overflow-hidden border-2 border-slate-200 shadow-inner">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-20 h-20 border-4 border-emerald-500 border-dashed rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-slate-600 font-semibold">Memuat peta...</p>
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
                    <Popup className="custom-popup rounded-2xl">
                      <div className="min-w-[280px] lg:min-w-[320px] p-2">
                        <img 
                          src={laporan.photoUrl || 'https://images.unsplash.com/photo-1587332060322-7cd5e8adfcee?w=300'} 
                          alt={laporan.title} 
                          className="w-full h-32 lg:h-40 object-cover rounded-xl mb-4 shadow-sm"
                        />
                        <h3 className="font-bold text-slate-800 text-lg mb-2">{laporan.title}</h3>
                        <p className="text-slate-600 text-sm mb-4 leading-relaxed">{laporan.description}</p>
                        <div className="flex items-center justify-between">
                          <span className={`px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(laporan.category)} shadow-lg`}>
                            {getCategoryLabel(laporan.category)}
                          </span>
                          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
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
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 lg:p-8 border border-white/20 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 lg:mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                📋 Daftar Laporan Terbaru
              </h2>
              <p className="text-slate-600">
                Menampilkan {filteredLaporans.length} laporan
                {filter && ` (filter: ${getCategoryLabel(filter)})`}
              </p>
            </div>
          </div>

          {filteredLaporans.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-3xl flex items-center justify-center shadow-lg">
                <span className="text-4xl">📭</span>
              </div>
              <p className="text-slate-600 text-lg font-semibold">Tidak ada laporan yang sesuai dengan filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredLaporans.slice(0, 6).map((laporan) => (
                <div 
                  key={laporan.id} 
                  className={`${getCategoryBgColor(laporan.category)} border-2 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-4 h-4 rounded-full mt-2 bg-gradient-to-r ${getCategoryColor(laporan.category)} shadow-lg`}></div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-800 text-base lg:text-lg mb-2 group-hover:text-slate-900 transition-colors">
                        {laporan.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                        {laporan.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(laporan.category)} shadow-lg`}>
                          {getCategoryLabel(laporan.category)}
                        </span>
                        <span className="text-xs text-slate-500 bg-white px-2 py-1 rounded-lg border border-slate-200">
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
            <div className="text-center mt-8">
              <button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Lihat Semua Laporan ({filteredLaporans.length})
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mt-8 lg:mt-12 relative z-10">
          <button 
            onClick={() => setIsReportModalOpen(true)}
            className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-8 lg:px-12 py-4 lg:py-5 rounded-2xl font-bold transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center justify-center space-x-3 text-lg"
          >
            <span className="text-xl">📝</span>
            <span>Laporkan Sampah Baru</span>
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 lg:px-12 py-4 lg:py-5 rounded-2xl font-bold transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center justify-center space-x-3 text-lg">
            <span className="text-xl">📱</span>
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