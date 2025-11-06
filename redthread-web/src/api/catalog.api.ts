import { http } from "./http";

export type Category = { id: number; nombre: string };
export type Variant  = { id: number; sku: string; talla: string; color: string; precio: number; stock: number };
export type Product  = {
  id: number; nombre: string; descripcion?: string; categoryId: number; precioBase: number;
  images: string[]; variants: Variant[];
};

export const CatalogApi = {
  listCategories: () => http.catalog.get<Category[]>("/categories"),
  listProducts:   (params?: { q?: string; categoryId?: number; page?: number; pageSize?: number }) =>
    http.catalog.get<{ results: Product[]; count: number }>("/products", { params }),
  getProduct:     (id: number) => http.catalog.get<Product>(`/products/${id}`),
  validateCoupon: (code: string, productIds: number[]) =>
    http.catalog.post<{ valid: boolean; discountPct?: number }>("/coupons/validate", { code, productIds }),
};
