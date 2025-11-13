import axios from "axios";

const api = axios.create({
  // Support both VITE_API_URL and VITE_API_BASE_URL (some deployments or .env files
  // may use one or the other). When running locally in dev, prefer localhost.
  baseURL:
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? "http://localhost:5000/api" : "https://hitech-backend-clean.onrender.com/api"),
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

