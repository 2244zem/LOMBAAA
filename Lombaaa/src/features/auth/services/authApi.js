	// src/services/authApi.js
	import axios from 'axios';
	const API_URL = 'http://localhost:5000/api/auth';
	export const login = async (credentials) => {
	  const response = await axios.post(`${API_URL}/login`, credentials);
	  return response.data; // { message, token, user }
	};
	export const register = async (userData) => {
	  const response = await axios.post(`${API_URL}/register`, userData);
	  return response.data; // { message }
	};
	export const logout = () => {
	  // Hanya menghapus token di frontend, backend tidak perlu tahu
	  return Promise.resolve();
	};