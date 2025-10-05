	// tailwind.config.js
	/** @type {import('tailwindcss').Config} */
	export default {
	  content: [
	    "./index.html",
	    "./src/**/*.{js,ts,jsx,tsx}",
	  ],
	  darkMode: 'class', // Pastikan ini ada
	  theme: {
	    extend: {
	      colors: {
	        secondary: {
	          50: '#f8fafc',
	          900: '#0f172a',
	        },
	        primary: { // Saya tambahkan contoh untuk warna primary
	          500: '#3b82f6',
	        }
	      }
	    },
	  },
	}