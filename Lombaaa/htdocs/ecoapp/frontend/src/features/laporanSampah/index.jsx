	import React, { useState } from 'react';
	import FormLaporan from './components/FormLaporan';

	const LaporanSampah = () => {
	  const [isSubmitting, setIsSubmitting] = useState(false);
	  const [submitStatus, setSubmitStatus] = useState(null);
	  const handleFormSubmit = async (data) => {
	    setIsSubmitting(true);
	    setSubmitStatus(null);
	
	    await new Promise(resolve => setTimeout(resolve, 2000));
	    console.log('Laporan dikirim:', data);
	    setIsSubmitting(false);
	    setSubmitStatus('success');
	  };
	  return (
	    <div className="max-w-2xl mx-auto">
	      <h1 className="text-3xl font-bold text-secondary-800 dark:text-white mb-2">Laporkan Sampah</h1>
	      <p className="text-secondary-600 dark:text-secondary-400 mb-6">
	        Bantu lingkungan kita dengan melaporkan lokasi dan jenis sampah yang Anda temukan.
	      </p>
	      {submitStatus === 'success' && (
	        <div className="p-4 mb-6 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
	          <span className="font-medium">Laporan berhasil dikirim!</span> Terima kasih atas kontribusi Anda.
	        </div>
	      )}
	      <div className="p-6 bg-white dark:bg-secondary-800 rounded-xl shadow-lg">
	        <FormLaporan onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
	      </div>
	    </div>
	  );
	};
	export default LaporanSampah;