import axios from 'axios';

const api = axios.create({
  baseURL: 'https://thehub-backend.onrender.com/api',
});

export default api;
