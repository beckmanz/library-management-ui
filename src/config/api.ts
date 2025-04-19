import axios from "axios";

const api = axios.create({
  baseURL: "https://library-management-api-7z33.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("@Auth:user:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
