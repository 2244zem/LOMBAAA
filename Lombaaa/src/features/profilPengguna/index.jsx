// src/features/profilPengguna/index.jsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ProfilPengguna = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header Profil */}
          <div className="bg-green-600 p-8 text-white">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-3xl">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user?.name || 'Pengguna'}</h1>
                <p className="text-green-100">{user?.email || 'email@example.com'}</p>
                <p className="text-green-200 mt-2">Member sejak 2024</p>
              </div>
            </div>
          </div>

          {/* Informasi Profil */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Informasi Profil</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Nama Lengkap</label>
                  <p className="mt-1 text-lg text-gray-900">{user?.name || 'Belum diatur'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <p className="mt-1 text-lg text-gray-900">{user?.email || 'Belum diatur'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Nomor Telepon</label>
                  <p className="mt-1 text-lg text-gray-900">Belum diatur</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Alamat</label>
                  <p className="mt-1 text-lg text-gray-900">Belum diatur</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Bergabung Pada</label>
                  <p className="mt-1 text-lg text-gray-900">Januari 2024</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Status</label>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Aktif
                  </span>
                </div>
              </div>
            </div>

            {/* Statistik */}
            <div className="mt-8 border-t pt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Statistik Anda</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-blue-800">Laporan Sampah</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">8</div>
                  <div className="text-sm text-green-800">Sampah Didaur Ulang</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <div className="text-2-xl font-bold text-yellow-600">3</div>
                  <div className="text-sm text-yellow-800">Poin Didapat</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">5</div>
                  <div className="text-sm text-purple-800">Transaksi</div>
                </div>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="mt-8 flex space-x-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Edit Profil
              </button>
              <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                Ubah Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilPengguna;