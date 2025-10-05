	// src/hooks/useGeolocation.js
	import { useState, useEffect } from 'react';
	/**
	 * Custom hook untuk mendapatkan lokasi geografis pengguna menggunakan Geolocation API.
	 * @returns {object} - { location: {latitude, longitude}, error: string, loading: boolean }
	 */
	export const useGeolocation = () => {
	  const [location, setLocation] = useState(null);
	  const [error, setError] = useState(null);
	  const [loading, setLoading] = useState(false);
	  useEffect(() => {
	    if (!navigator.geolocation) {
	      setError('Geolocation tidak didukung oleh browser Anda.');
	      return;
	    }
	    setLoading(true);
	    navigator.geolocation.getCurrentPosition(
	      (position) => {
	        setLocation({
	          latitude: position.coords.latitude,
	          longitude: position.coords.longitude,
	        });
	        setLoading(false);
	      },
	      (error) => {
	        setError(error.message);
	        setLoading(false);
	      },
	      {
	        enableHighAccuracy: true,
	        timeout: 5000,
	        maximumAge: 0,
	      }
	    );
	  }, []); // Hanya dijalankan sekali saat komponen mount
	  return { location, error, loading };
	};