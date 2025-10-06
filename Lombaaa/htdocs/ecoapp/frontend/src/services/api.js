import axios from 'axios';

// Base API configuration
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
});

// Export Zhipu AI service
export { zhipuAiService } from './zhipuAiService';