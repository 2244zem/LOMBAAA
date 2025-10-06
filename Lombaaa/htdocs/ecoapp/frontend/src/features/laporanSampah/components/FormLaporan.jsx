	// src/features/laporanSampah/components/FormLaporan.jsx
	import React, { useState, useEffect } from 'react';
	import Button from '../../../components/Button';
	import Input from '../../../components/Input';
	import { useGeolocation } from '../../../hooks/useGeolocation';
	/**
	 * Komponen form untuk melaporkan sampah.
	 * - Menggunakan useGeolocation hook untuk otomatis mengisi koordinat.
	 * - Memiliki input untuk judul, deskripsi, kategori, dan foto.
	 * - Menampilkan peta pratinjau lokasi.
	 */
	const FormLaporan = ({ onSubmit, isSubmitting }) => {
	  const { location, error: geoError, loading: geoLoading } = useGeolocation();
	  const [formData, setFormData] = useState({
	    title: '',
	    description: '',
	    category: '',
	    photo: null,
	    latitude: '',
	    longitude: '',
	  });
	  const [preview, setPreview] = useState(null);
	  // Update koordinat saat lokasi dari GPS didapat
	  useEffect(() => {
	    if (location) {
	      setFormData(prev => ({
	        ...prev,
	        latitude: location.latitude,
	        longitude: location.longitude,
	      }));
	    }
	  }, [location]);
	  const handleInputChange = (e) => {
	    setFormData({ ...formData, [e.target.name]: e.target.value });
	  };
	  const handleFileChange = (e) => {
	    const file = e.target.files[0];
	    if (file) {
	      setFormData({ ...formData, photo: file });
	      const reader = new FileReader();
	      reader.onloadend = () => {
	        setPreview(reader.result);
	      };
	      reader.readAsDataURL(file);
	    }
	  };
	  const handleSubmit = (e) => {
	    e.preventDefault();
	    if (!formData.latitude || !formData.longitude) {
	      alert('Lokasi GPS tidak ditemukan. Pastikan Anda telah mengizinkan akses lokasi.');
	      return;
	    }
	    onSubmit(formData);
	  };
	  return (
	    <form onSubmit={handleSubmit} className="space-y-4">
	      <Input
	        id="title"
	        name="title"
	        type="text"
	        label="Judul Laporan"
	        placeholder="Contoh: Tumpukan sampah di samping jalan"
	        value={formData.title}
	        onChange={handleInputChange}
	        required
	      />
	      <div>
	        <label htmlFor="category" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
	          Kategori Sampah
	        </label>
	        <select
	          id="category"
	          name="category"
	          value={formData.category}
	          onChange={handleInputChange}
	          className="block w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg shadow-sm bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
	          required
	        >
	          <option value="">Pilih Kategori</option>
	          <option value="organik">Sampah Organik</option>
	          <option value="anorganik">Sampah Anorganik (Plastik, Kertas, dll)</option>
	          <option value="b3">Sampah B3 (Bahan Berbahaya dan Beracun)</option>
	          <option value="elektronik">Sampah Elektronik (E-waste)</option>
	          <option value="lainnya">Lainnya</option>
	        </select>
	      </div>
	      <div>
	        <label htmlFor="description" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
	          Deskripsi
	        </label>
	        <textarea
	          id="description"
	          name="description"
	          rows="4"
	          className="block w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg shadow-sm bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
	          placeholder="Jelaskan kondisi sampah secara lebih detail..."
	          value={formData.description}
	          onChange={handleInputChange}
	          required
	        ></textarea>
	      </div>
	      <Input
	        id="photo"
	        name="photo"
	        type="file"
	        label="Foto (Opsional)"
	        onChange={handleFileChange}
	        accept="image/*"
	      />
	      {preview && (
	        <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
	      )}
	      {/* Lokasi GPS */}
	      <div className="p-4 bg-secondary-100 dark:bg-secondary-700 rounded-lg">
	        <h3 className="font-semibold text-secondary-800 dark:text-white mb-2">Lokasi Anda</h3>
	        {geoLoading && <p className="text-sm text-secondary-600 dark:text-secondary-400">Mendapatkan lokasi...</p>}
	        {geoError && <p className="text-sm text-red-600 dark:text-red-400">Error: {geoError}</p>}
	        {location && (
	          <p className="text-sm text-secondary-700 dark:text-secondary-300">
	            Latitude: {location.latitude}, Longitude: {location.longitude}
	          </p>
	        )}
	      </div>
	      <Button type="submit" disabled={isSubmitting} className="w-full">
	        {isSubmitting ? 'Mengirim...' : 'Kirim Laporan'}
	      </Button>
	    </form>
	  );
	};
	export default FormLaporan;