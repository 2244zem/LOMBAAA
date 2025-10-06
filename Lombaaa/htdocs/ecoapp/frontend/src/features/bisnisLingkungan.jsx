	// src/features/bisnisLingkungan.jsx
	import React from 'react';
	const BisnisLingkungan = () => {
	  const ideBisnis = [
	    {
	      judul: 'Jasa Kompos Organik',
	      deskripsi: 'Mengumpulkan sampah organik dari rumah tangga atau restoran, lalu mengolahnya menjadi kompos berkualitas tinggi untuk dijual secara online.',
	      icon: '🌱',
	    },
	    {
	      judul: 'Platform Jual Beli Barang Bekas',
	      deskripsi: 'Membangun marketplace khusus untuk barang bekas (seperti Thrift). Fokus pada kategori fashion, elektronik, atau furnitur.',
	      icon: '♻️',
	    },
	    {
	      judul: 'Konsultan Lingkungan Digital',
	      deskripsi: 'Menawarkan jasa konsultasi online untuk UMKM atau rumah tangga yang ingin mengurangi jejak karbon dan menerapkan gaya hidup berkelanjutan.',
	      icon: '🌍',
	    },
	    {
	      judul: 'Edukasi & Workshop Online',
	      deskripsi: 'Membuat kursus online atau webinar tentang cara mengelola sampah, membuat kerajinan tangan dari barang bekas (upcycling), atau pertanian urban.',
	      icon: '🎓',
	    },
	    {
	      judul: 'Aplikasi Pengelolaan Sampah',
	      deskripsi: 'Mengembangkan aplikasi yang memetakan lokasi bank sampah, memberikan informasi cara pemilahan, dan memberikan reward bagi pengguna yang aktif.',
	      icon: '📱',
	    },
	    {
	      judul: 'Dropshipping Produk Ramah Lingkungan',
	      deskripsi: 'Menjual produk-produk ramah lingkungan (seperti sedotan stainless, botol minum reusable, tas belanja kain) tanpa perlu stok barang.',
	      icon: '🛍️',
	    },
	  ];
	  return (
	    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
	      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Ide Bisnis Digital Ramah Lingkungan</h1>
	      <p className="mb-8 text-gray-600 dark:text-gray-400">Jelajahi berbagai peluang bisnis yang tidak hanya menguntungkan, tetapi juga bermanfaat bagi bumi.</p>
	      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
	        {ideBisnis.map((bisnis, index) => (
	          <div key={index} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-xl transition-shadow">
	            <div className="text-4xl mb-4">{bisnis.icon}</div>
	            <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{bisnis.judul}</h2>
	            <p className="text-gray-600 dark:text-gray-400">{bisnis.deskripsi}</p>
	          </div>
	        ))}
	      </div>
	    </div>
	  );
	};
	export default BisnisLingkungan;