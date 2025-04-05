// axiosClient.ts
import axios from "axios";
import { env } from "@config/env";

const axiosClientForBuyers = axios.create({
  baseURL: env.VITE_API_URL_CLIENTS,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors for Auth tokens, error handling, logging, etc.
axiosClientForBuyers.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClientForBuyers.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // handle unauthorized errors globally
    }
    return Promise.reject(error);
  }
);

export { axiosClientForBuyers };
