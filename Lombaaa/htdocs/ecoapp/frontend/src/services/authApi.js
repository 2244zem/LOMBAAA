// src/services/authApi.js
const API_BASE_URL = 'http://localhost/ecoapp/api';

export const authApi = {
  // Token management
  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  removeToken: () => {
    localStorage.removeItem('token');
  },

  verifyToken: (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  },

  // API requests
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    console.log('🔄 API Request to:', url);

    const config = {
      method: options.method || 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      mode: 'cors',
      credentials: 'omit'
    };

    if (options.body && (options.method === 'POST' || options.method === 'PUT')) {
      config.body = JSON.stringify(options.body);
      console.log('📦 Request Body:', config.body);
    }

    try {
      const response = await fetch(url, config);
      console.log('📡 Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Server Error Response:', errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || 'Unknown server error' };
        }
        
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('✅ Success Response:', responseData);
      return responseData;

    } catch (error) {
      console.error('💥 Fetch Error:', error);
      
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error('Tidak dapat terhubung ke server. Pastikan: 1) XAMPP Apache berjalan, 2) Folder ecoapp ada di htdocs, 3) Tidak ada firewall yang memblokir');
      }
      
      throw error;
    }
  },

  register: (userData) => 
    authApi.request('/auth/register.php', {
      method: 'POST',
      body: userData,
    }),

  login: (credentials) => 
    authApi.request('/auth/login.php', {
      method: 'POST',
      body: credentials,
    }),
};