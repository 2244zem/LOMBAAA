	// src/features/tukarSampah.jsx
	import React, { useState, useEffect } from 'react';
	const TukarSampah = () => {
	  const dataSampah = [
	    { id: 1, nama: 'Botol Plastik PET', hargaPerKg: 2000, satuan: 'kg' },
	    { id: 2, nama: 'Kardus Bekas', hargaPerKg: 1500, satuan: 'kg' },
	    { id: 3, nama: 'Kertas HVS', hargaPerKg: 3000, satuan: 'kg' },
	    { id: 4, nama: 'Kaleng Alumunium', hargaPerKg: 12000, satuan: 'kg' },
	    { id: 5, nama: 'Besi Bekas', hargaPerKg: 5000, satuan: 'kg' },
	  ];
	  const [jumlahSampah, setJumlahSampah] = useState({});
	  const [totalNilai, setTotalNilai] = useState(0);
	  useEffect(() => {
	    let total = 0;
	    for (const item of dataSampah) {
	      const jumlah = parseFloat(jumlahSampah[item.id]) || 0;
	      total += jumlah * item.hargaPerKg;
	    }
	    setTotalNilai(total);
	  }, [jumlahSampah]);
	  const handleInputChange = (id, value) => {
	    setJumlahSampah(prev => ({ ...prev, [id]: value }));
	  };
	  const formatRupiah = (angka) => {
	    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
	  };
	  const handleTukar = () => {
	    if (totalNilai > 0) {
	      alert(`Selamat! Anda berhasil menukar sampah senilai ${formatRupiah(totalNilai)}. Silakan datang ke lokasi kami untuk mengambil uangnya.`);
	      // Reset form
	      setJumlahSampah({});
	    } else {
	      alert('Masukkan jumlah sampah yang ingin ditukar terlebih dahulu.');
	    }
	  };
	  return (
	    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
	      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Kalkulator Tukar Sampah</h1>
	      <p className="mb-6 text-gray-600 dark:text-gray-400">Masukkan jumlah sampah Anda dalam kilogram (kg) untuk menghitung nilai tukarnya.</p>
	      <div className="space-y-4">
	        {dataSampah.map(item => (
	          <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
	            <div>
	              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{item.nama}</h2>
	              <p className="text-sm text-gray-500 dark:text-gray-400">Harga: {formatRupiah(item.hargaPerKg)}/{item.satuan}</p>
	            </div>
	            <input
	              type="number"
	              name={item.id}
	              value={jumlahSampah[item.id] || ''}
	              onChange={(e) => handleInputChange(item.id, e.target.value)}
	              placeholder="0"
	              className="w-24 p-2 border border-gray-300 dark:border-gray-600 rounded-md text-right dark:bg-gray-700 dark:text-white"
	              min="0"
	            />
	          </div>
	        ))}
	      </div>
	      <div className="mt-8 p-4 bg-green-100 dark:bg-green-900 rounded-lg text-center">
	        <p className="text-2xl font-bold text-green-800 dark:text-green-200">
	          Total Nilai Tukar: {formatRupiah(totalNilai)}
	        </p>
	      </div>
	      <button 
	        onClick={handleTukar}
	        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
	      >
	        Konfirmasi Tukar Sampah
	      </button>
	    </div>
	  );
	};
	export default TukarSampah;