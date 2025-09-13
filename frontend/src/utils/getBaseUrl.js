// src/getBaseUrl.js
const getBaseUrl = () => {
  return import.meta.env.PROD
    ? 'https://notenest-backend-zoab.onrender.com'
    : 'http://localhost:5000';
};

export default getBaseUrl;
