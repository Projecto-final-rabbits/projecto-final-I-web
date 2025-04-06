export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
export const NODE_ENV = import.meta.env.MODE || "develop";

export const AUTH = {
  TOKEN_KEY: "auth_token",
  REFRESH_TOKEN_KEY: "refresh_token",
};

export const FEATURE_FLAGS = {
  enableNewDashboard: import.meta.env.VITE_ENABLE_NEW_DASHBOARD === "true",
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
};

export const APP_META = {
  NAME: "CCP - Rabbits",
  VERSION: "1.0.0",
};

export * from "./provicer-autocomplete";
