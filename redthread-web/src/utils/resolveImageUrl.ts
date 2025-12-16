// src/utils/resolveImageUrl.ts

export function resolveImageUrl(url: string | null | undefined, apiBaseUrl: string): string {
  if (!url) return "";

  // Si ya viene absoluta (http/https), úsala tal cual
  if (/^https?:\/\//i.test(url)) return url;

  // Normaliza slashes
  const base = apiBaseUrl.replace(/\/+$/, "");
  const path = url.startsWith("/") ? url : `/${url}`;

  return `${base}${path}`;
}
