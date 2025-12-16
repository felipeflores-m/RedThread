// src/config/api.ts

// Ajusta esto a tu backend real. Ideal: usar variable de entorno.
export const API_BASE_URL =
  (import.meta as any)?.env?.VITE_API_BASE_URL ||
  (process as any)?.env?.REACT_APP_API_BASE_URL ||
  "http://localhost:8082";
