// axiosClient.ts
import axios from "axios";
import { env } from "@config/env";

const axiosClientForWarehouse = axios.create({
  baseURL: env.VITE_API_URL_WAREHOUSE,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors for Auth tokens, error handling, logging, etc.
axiosClientForWarehouse.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClientForWarehouse.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // handle unauthorized errors globally
    }
    return Promise.reject(error);
  }
);

export { axiosClientForWarehouse };
