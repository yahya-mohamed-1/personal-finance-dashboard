import axios from "axios";

// Base Axios instance (adjust when backend is deployed)
const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api", // Flask default
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
