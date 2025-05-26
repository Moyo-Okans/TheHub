// utils/axios.js
import axios from "axios";

// Simple approach - just use environment variable or fallback
const api = axios.create({
  baseURL: "http://localhost:6000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      // Add token refresh logic if needed
    } else if (err.response?.status === 403) {
      console.error("Access forbidden.");
    } else if (err.response?.status === 404) {
      console.error("Resource not found.");
    } else if (err.response?.status >= 500) {
      console.error("Server error.");
    } else {
      console.error("Unexpected error:", err.message);
    }
    return Promise.reject(err); // <-- Important
  }
);


export default api;
