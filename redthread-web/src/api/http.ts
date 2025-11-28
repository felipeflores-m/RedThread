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

// Exponer el base URL del catálogo para construir URLs de imágenes
export const CATALOG_BASE_URL = catalogBase;

// Helper para armar URLs completas de imágenes del catálogo
export const buildCatalogImageUrl = (publicUrl?: string) => {
  if (!publicUrl) return undefined;
  // Si ya viene con http(s) lo dejamos tal cual
  if (publicUrl.startsWith("http://") || publicUrl.startsWith("https://")) {
    return publicUrl;
  }
  // Si empieza con "/" lo concatenamos al base del catálogo
  if (publicUrl.startsWith("/")) {
    return `${catalogBase}${publicUrl}`;
  }
  // Cualquier otra cosa la tratamos como relativa al backend igual
  return `${catalogBase}/${publicUrl}`;
};

// === Interceptor para JWT ===

const getToken = () => localStorage.getItem("rt.access") ?? "";

// Rutas GET públicas del catálogo donde NO queremos mandar Authorization
const PUBLIC_CATALOG_GET_PATHS = ["/products", "/categories", "/brands", "/variants"];

for (const key of Object.keys(http) as Array<keyof typeof http>) {
  http[key].interceptors.request.use((cfg) => {
    const method = (cfg.method ?? "get").toLowerCase();
    const url = cfg.url ?? "";

    const isPublicCatalogGet =
      key === "catalog" &&
      method === "get" &&
      PUBLIC_CATALOG_GET_PATHS.some(
        (p) =>
          url === p ||
          url.startsWith(p + "/") ||
          url.startsWith(p + "?")
      );

    // Si es una ruta pública del catálogo, no mandamos token
    if (isPublicCatalogGet) {
      if (cfg.headers) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (cfg.headers as any).Authorization;
      }
      return cfg;
    }

    // Para el resto de llamadas sí usamos el token (si existe)
    const token = getToken();
    if (token) {
      cfg.headers = cfg.headers || {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (cfg.headers as any).Authorization = `Bearer ${token}`;
    }

    return cfg;
  });
}
