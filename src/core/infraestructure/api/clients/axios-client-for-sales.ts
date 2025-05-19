// src/core/infraestructure/api/clients/axios-client-for-sales.ts
import axios from "axios";
import { env } from "@/config/env";

const axiosClientForSales = axios.create({
  baseURL: env.VITE_API_URL_SELLERS,
  headers: {
    "Content-Type": "application/json",
  },
});

export {axiosClientForSales};