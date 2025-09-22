// src/api.js
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? "/api" // ✅ Let Vercel proxy in production
    : "http://127.0.0.1:5000/api");

// Base Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Delete account function
export const deleteAccount = async (password) => {
  try {
    const response = await api.delete("/auth/delete-account", {
      data: { password }
    });
    return { success: true, message: response.data.msg };
  } catch (error) {
    const message = error.response?.data?.msg || "Failed to delete account";
    return { success: false, message };
  }
};

export default api;
