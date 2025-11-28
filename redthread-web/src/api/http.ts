// src/api/http.ts
import axios from "axios";

console.log("Auth API base:", import.meta.env.VITE_AUTH_API);

const authBase =
  (import.meta.env.VITE_AUTH_API as string | undefined) ||
  "http://localhost:8081";

const catalogBase =
  (import.meta.env.VITE_CATALOG_API as string | undefined) ||
  "http://localhost:8082";

const orderBase =
  (import.meta.env.VITE_ORDER_API as string | undefined) ||
  "http://localhost:8083";

const deliveryBase =
  (import.meta.env.VITE_DELIVERY_API as string | undefined) ||
  "http://localhost:8084";

export const http = {
  auth: axios.create({ baseURL: authBase, withCredentials: false }),
  catalog: axios.create({ baseURL: catalogBase, withCredentials: false }),
  order: axios.create({ baseURL: orderBase, withCredentials: false }),
  delivery: axios.create({ baseURL: deliveryBase, withCredentials: false }),
};

// === Interceptor para JWT ===
const getToken = () => localStorage.getItem("rt.access") ?? "";

for (const key of Object.keys(http) as Array<keyof typeof http>) {
  http[key].interceptors.request.use((cfg) => {
    const token = getToken();
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
  });
}
