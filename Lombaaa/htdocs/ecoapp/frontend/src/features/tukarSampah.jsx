// src/features/tukarSampah.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const TukarSampah = () => {
  const { user, addToBalance } = useAuth();
  
  const dataSampah = [
    { id: 1, nama: 'Botol Plastik PET', hargaPerKg: 2000, satuan: 'kg', icon: '🧴' },
    { id: 2, nama: 'Kardus Bekas', hargaPerKg: 1500, satuan: 'kg', icon: '📦' },
    { id: 3, nama: 'Kertas HVS', hargaPerKg: 3000, satuan: 'kg', icon: '📄' },
    { id: 4, nama: 'Kaleng Alumunium', hargaPerKg: 12000, satuan: 'kg', icon: '🥫' },
    { id: 5, nama: 'Besi Bekas', hargaPerKg: 5000, satuan: 'kg', icon: '🔩' },
    { id: 6, nama: 'Botol Kaca', hargaPerKg: 1000, satuan: 'kg', icon: '🍶' },
    { id: 7, nama: 'Plastik LDPE', hargaPerKg: 2500, satuan: 'kg', icon: '🛍️' },
    { id: 8, nama: 'Koran Bekas', hargaPerKg: 1800, satuan: 'kg', icon: '📰' },
  ];

  const [jumlahSampah, setJumlahSampah] = useState({});
  const [totalNilai, setTotalNilai] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastTransaction, setLastTransaction] = useState(null);

  // Load transaction history from localStorage on component mount
  useEffect(() => {
    if (user?.id) {
      const savedHistory = localStorage.getItem(`transactionHistory_${user.id}`);
      if (savedHistory) {
        setTransactionHistory(JSON.parse(savedHistory));
      }
    }
  }, [user]);

  // Calculate total value whenever jumlahSampah changes
  useEffect(() => {
    let total = 0;
    for (const item of dataSampah) {
      const jumlah = parseFloat(jumlahSampah[item.id]) || 0;
      total += jumlah * item.hargaPerKg;
    }
    setTotalNilai(total);
  }, [jumlahSampah]);

  const handleInputChange = (id, value) => {
    // Only allow positive numbers
    if (value === '' || (parseFloat(value) >= 0 && !isNaN(value))) {
      setJumlahSampah(prev => ({ ...prev, [id]: value }));
    }
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR',
      minimumFractionDigits: 0 
    }).format(angka);
  };

  const getSampahDetails = () => {
    return dataSampah
      .filter(item => jumlahSampah[item.id] && parseFloat(jumlahSampah[item.id]) > 0)
      .map(item => ({
        ...item,
        jumlah: parseFloat(jumlahSampah[item.id]),
        subtotal: parseFloat(jumlahSampah[item.id]) * item.hargaPerKg
      }));
  };

  const handleTukar = async () => {
    // Validasi input
    if (totalNilai <= 0) {
      alert('❌ Masukkan jumlah sampah yang ingin ditukar terlebih dahulu.');
      return;
    }

    if (!user) {
      alert('🔐 Silakan login terlebih dahulu untuk menukar sampah.');
      return;
    }

    // Konfirmasi dari user
    const isConfirmed = window.confirm(
      `Apakah Anda yakin ingin menukar sampah senilai ${formatRupiah(totalNilai)}?`
    );
    
    if (!isConfirmed) {
      return;
    }

    // Mulai proses
    setIsProcessing(true);

    try {
      // Simulasi proses ke server
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Dapatkan detail item yang ditukar
      const sampahDetails = getSampahDetails();
      
      // Buat record transaksi
      const transaction = {
        id: `TX-${Date.now()}`,
        timestamp: new Date().toISOString(),
        totalAmount: totalNilai,
        items: sampahDetails,
        status: 'completed'
      };

      // Update balance user menggunakan addToBalance
      await addToBalance(totalNilai);

      // Update riwayat transaksi
      const newHistory = [transaction, ...transactionHistory];
      
      // Batasi hanya 10 transaksi terakhir
      if (newHistory.length > 10) {
        newHistory.splice(10);
      }
      
      setTransactionHistory(newHistory);
      localStorage.setItem(`transactionHistory_${user.id}`, JSON.stringify(newHistory));

      // Tampilkan notifikasi sukses
      setLastTransaction(transaction);
      setShowSuccessModal(true);

      // Reset semua form
      setJumlahSampah({});

    } catch (error) {
      // Handle berbagai jenis error
      console.error('🚨 Error dalam handleTukar:', error);
      
      if (error.message.includes('user not logged in')) {
        alert('❌ Sesi Anda telah berakhir. Silakan login kembali.');
      } else if (error.message.includes('Invalid amount')) {
        alert('❌ Jumlah sampah tidak valid.');
      } else {
        alert('❌ Terjadi kesalahan sistem. Silakan coba lagi dalam beberapa saat.');
      }
      
    } finally {
      // Pastikan loading state dimatikan
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🔄 Tukar Sampah</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tukarkan sampah Anda menjadi uang dan berkontribusi untuk lingkungan yang lebih bersih
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Calculator */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Kalkulator Tukar Sampah</h2>
                {user && (
                  <div className="bg-green-100 px-4 py-2 rounded-full">
                    <span className="text-green-800 font-semibold">
                      💰 Balance: {formatRupiah(user.balance || 0)}
                    </span>
                  </div>
                )}
              </div>

              <p className="text-gray-600 mb-6">
                Masukkan jumlah sampah Anda dalam kilogram (kg) untuk menghitung nilai tukarnya.
              </p>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {dataSampah.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-green-300 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{item.nama}</h3>
                        <p className="text-sm text-green-600 font-medium">
                          {formatRupiah(item.hargaPerKg)}/{item.satuan}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="number"
                        value={jumlahSampah[item.id] || ''}
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                        placeholder="0"
                        className="w-20 p-2 border border-gray-300 rounded-lg text-right font-semibold focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        min="0"
                        step="0.1"
                      />
                      <span className="text-gray-500 font-medium">kg</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Value */}
              <div className="mt-8 p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-center">
                <p className="text-white text-sm mb-2">Total Nilai Tukar</p>
                <p className="text-3xl font-bold text-white">
                  {formatRupiah(totalNilai)}
                </p>
              </div>

              {/* Action Button */}
              <button 
                onClick={handleTukar}
                disabled={isProcessing || totalNilai <= 0 || !user}
                className="mt-6 w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Memproses...</span>
                  </div>
                ) : (
                  '💰 Konfirmasi Tukar Sampah'
                )}
              </button>

              {!user && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                  <p className="text-yellow-800">
                    🔐 Silakan login terlebih dahulu untuk menukar sampah
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Riwayat Transaksi</h3>
              
              {transactionHistory.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📭</div>
                  <p className="text-gray-500">Belum ada transaksi</p>
                  <p className="text-sm text-gray-400 mt-2">Transaksi Anda akan muncul di sini</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {transactionHistory.map(transaction => (
                    <div key={transaction.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-green-600 font-bold">
                          +{formatRupiah(transaction.totalAmount)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(transaction.timestamp)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {transaction.items.length} jenis sampah
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h4 className="font-bold text-blue-800 mb-3">💡 Tips Menukar Sampah</h4>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• Cuci bersih sampah sebelum ditukar</li>
                <li>• Pisahkan berdasarkan jenis material</li>
                <li>• Keringkan sampah untuk berat maksimal</li>
                <li>• Bawa ke lokasi kami dalam kondisi rapi</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && lastTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎉</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Transaksi Berhasil!</h3>
            <p className="text-gray-600 mb-2">
              Anda berhasil menukar sampah senilai
            </p>
            <p className="text-3xl font-bold text-green-600 mb-6">
              {formatRupiah(lastTransaction.totalAmount)}
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">
                Saldo Anda sekarang: <span className="font-bold text-green-600">{formatRupiah(user.balance || 0)}</span>
              </p>
            </div>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TukarSampah;