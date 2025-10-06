	// src/features/pusatDaurUlang.jsx
	import React from 'react';
	const PusatDaurUlang = () => {
	  const centers = [
	    { name: 'Bank Sampah Cilincing', address: 'Jl. Cilincing Raya No. 10', type: 'Organik & Anorganik' },
	    { name: 'Pengolahan Sampah Pantai Indah Kapuk', address: 'Jl. Pantai Indah Utara', type: 'Anorganik' },
	    { name: 'Kolektor Sampah Elektronik Kelapa Gading', address: 'Jl. Kelapa Gading Boulevard', type: 'B3' },
	  ];
	  return (
	    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
	      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Pusat Daur Ulang Terdekat</h1>
	      <div className="space-y-4">
	        {centers.map((center, index) => (
	          <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow">
	            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">{center.name}</h2>
	            <p className="text-gray-600 dark:text-gray-400">📍 {center.address}</p>
	            <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-semibold rounded-full">
	              {center.type}
	            </span>
	          </div>
	        ))}
	      </div>
	    </div>
	  );
	};
	export default PusatDaurUlang;