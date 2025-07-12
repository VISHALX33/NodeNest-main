// src/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://notenest-backend-zoab.onrender.com/api', // adjust if you're using a proxy
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
