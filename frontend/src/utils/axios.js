import axios from 'axios';

// Dynamically determine baseURL
const isLocalhost = window.location.hostname === 'localhost';

const API = axios.create({
  baseURL: isLocalhost
    ? 'http://localhost:5000/api'
    : 'https://notenest-backend-zoab.onrender.com/api',
});

// Attach token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
