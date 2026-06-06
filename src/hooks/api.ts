import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('Request:', config.method, config.url);
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error: Error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

export default api;
