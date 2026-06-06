import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})
//run before every request
api.interceptors.request.use(
  (config) => {
    console.log('Request:', config.method, config.url);
    return config;
  },
  (error) => Promise.reject(error)
);
// run after every response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

export default api;