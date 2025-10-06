	// src/features/petaSampah/services/laporanApi.js
	/**
	 * Simulasi API untuk mengambil data laporan.
	 * Data diambil dari localStorage untuk mensimulasikan persistensi.
	 */
	/**
	 * Mengambil semua data laporan dari localStorage.
	 * @returns {Promise<Array>} - Promise yang resolve dengan array of laporan objects.
	 */
	export const getAllLaporan = () => {
	  return new Promise((resolve) => {
	    setTimeout(() => {
	      const reports = JSON.parse(localStorage.getItem('laporans')) || [];
	      // Tambahkan beberapa data dummy jika belum ada
	      if (reports.length === 0) {
	        const dummyReports = [
	          {
	            id: 1,
	            title: 'Sampah Plastik di Sungai',
	            description: 'Banyak sekali sampah plastik yang menggenang di tepi sungai.',
	            category: 'anorganik',
	            latitude: -6.2088,
	            longitude: 106.8456,
	            photoUrl: 'https://images.unsplash.com/photo-1618468340983-5e3a1a5c3e8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
	          },
	          {
	            id: 2,
	            title: 'Tumpukan Sampah Rumah Tangga',
	            description: 'Sampah organik dan anorganik bercampur di pinggir jalan.',
	            category: 'organik',
	            latitude: -6.2158,
	            longitude: 106.8500,
	            photoUrl: 'https://images.unsplash.com/photo-1595445360274-426a80a5327a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
	          },
	        ];
	        localStorage.setItem('laporans', JSON.stringify(dummyReports));
	        resolve(dummyReports);
	      } else {
	        resolve(reports);
	      }
	    }, 500);
	  });
	};
	/**
	 * Menyimpan laporan baru ke localStorage.
	 * Di aplikasi nyata, fungsi ini akan mengirim POST request ke server.
	 * @param {object} newReport - Objek laporan baru.
	 * @returns {Promise<object>} - Promise yang resolve dengan laporan yang baru disimpan.
	 */
	export const saveLaporan = (newReport) => {
	  return new Promise((resolve) => {
	    setTimeout(() => {
	      const reports = JSON.parse(localStorage.getItem('laporans')) || [];
	      const reportWithId = { ...newReport, id: Date.now(), createdAt: new Date().toISOString() };
	      reports.push(reportWithId);
	      localStorage.setItem('laporans', JSON.stringify(reports));
	      resolve(reportWithId);
	    }, 1000);
	  });
	};