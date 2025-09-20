import axios from "axios";

// Determine base URL based on environment
const getBaseURL = () => {
  // In production, use the deployed backend URL
  if (import.meta.env.PROD) {
    return "https://your-backend-app.onrender.com/api";
  }
  // In development, use local backend
  return "http://127.0.0.1:5000/api";
};

// Base Axios instance
const api = axios.create({
  baseURL: getBaseURL(),
  headers: { "Content-Type": "application/json" },
});

// Automatically add token to requests (if available)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
