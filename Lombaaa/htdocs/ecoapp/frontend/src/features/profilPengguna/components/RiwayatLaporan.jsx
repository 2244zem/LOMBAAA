	// src/features/profilPengguna/components/RiwayatLaporan.jsx
	import React from 'react';
	/**
	 * Komponen untuk menampilkan daftar riwayat laporan pengguna dalam bentuk grid.
	 * Props:
	 * - reports: Array of laporan objects.
	 */
	const RiwayatLaporan = ({ reports }) => {
	  if (reports.length === 0) {
	    return (
	      <div className="p-6 bg-white dark:bg-secondary-800 rounded-xl shadow-lg text-center">
	        <p className="text-secondary-600 dark:text-secondary-400">Anda belum memiliki laporan.</p>
	      </div>
	    );
	  }
	  return (
	    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
	      {reports.map((report) => (
	        <div key={report.id} className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg overflow-hidden">
	          <img
	            src={report.photoUrl || 'https://via.placeholder.com/400x200'}
	            alt={report.title}
	            className="w-full h-40 object-cover"
	          />
	          <div className="p-4">
	            <h3 className="font-semibold text-secondary-800 dark:text-white truncate">{report.title}</h3>
	            <p className="text-sm text-secondary-600 dark:text-secondary-400 my-1 line-clamp-2">{report.description}</p>
	            <div className="flex justify-between items-center mt-3">
	              <span className="text-xs bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 px-2 py-1 rounded-full">
	                {report.category}
	              </span>
	              <span className="text-xs text-secondary-500 dark:text-secondary-400">
	                {new Date(report.createdAt).toLocaleDateString('id-ID')}
	              </span>
	            </div>
	          </div>
	        </div>
	      ))}
	    </div>
	  );
	};
	export default RiwayatLaporan;