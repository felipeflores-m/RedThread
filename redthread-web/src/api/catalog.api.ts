import { http } from "./http";

/* ====== Tipos ====== */
export type Brand = {
  id: number;
  name: string;
  active?: boolean;
};

export type Category = {
  id: number;
  name: string;
  description?: string;
  active?: boolean;
};

export type Product = {
  id: number;
  name: string;
  description?: string;
  basePrice: number;
  active: boolean;
  createdAt?: string;
  category?: Category;
  brand?: Brand;
  images?: { id: number; publicUrl: string }[];
};

export type CreateProductReq = {
  categoryId: number;
  brandId: number;
  name: string;
  description?: string;
  basePrice: number;
};

/* ====== Variantes e imágenes ====== */
export type CreateVariantReq = {
  productId: number;
  sizeType: string;
  sizeValue: string;
  color: string;
  sku: string;
  priceOverride?: number;
};

export type ProductImage = {
  id: number;
  publicUrl: string;
  primary?: boolean;
};

/* ====== API ====== */
export const CatalogApi = {
  // ---- CATEGORÍAS ----
  listCategories: () => http.catalog.get<Category[]>("/categories"),

  // ---- MARCAS ----
  listBrands: () => http.catalog.get<Brand[]>("/brands"),

  // ---- PRODUCTOS ----
  listProducts: (params?: {
    q?: string;
    categoryId?: number;
    page?: number;
    pageSize?: number;
  }) =>
    http.catalog.get<{ results: Product[]; count: number }>("/products", {
      params,
    }),

  getProduct: (id: number) => http.catalog.get<Product>(`/products/${id}`),

  createProduct: (data: CreateProductReq) =>
    http.catalog.post<Product>("/products", data),

  updateProduct: (id: number, data: CreateProductReq) =>
    http.catalog.put<Product>(`/products/${id}`, data),

  deleteProduct: (id: number) => http.catalog.delete(`/products/${id}`),

  // ---- VARIANTES ----
  listVariantsByProduct: (productId: number) =>
    http.catalog.get(`/variants?productId=${productId}`),

  createVariant: (data: CreateVariantReq) =>
    http.catalog.post("/variants", data),

  // ---- IMÁGENES ----
  listImages: (productId: number) =>
    http.catalog.get<ProductImage[]>(`/products/${productId}/images`),

  /* Subir imagen local (archivo) */
  uploadImage: (productId: number, formData: FormData) =>
    http.catalog.post(`/products/${productId}/images/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  /* NUEVO: subir imagen desde URL */
  uploadImageFromUrl: (productId: number, data: { url: string }) =>
    http.catalog.post(`/products/${productId}/images/from-url`, data),

  markPrimaryImage: (productId: number, imageId: number) =>
    http.catalog.post(`/products/${productId}/images/${imageId}/primary`),

  deleteImage: (productId: number, imageId: number) =>
    http.catalog.delete(`/products/${productId}/images/${imageId}`),

  // ---- CUPONES ----
  validateCoupon: (code: string, productIds: number[]) =>
    http.catalog.post<{ valid: boolean; discountPct?: number }>(
      "/coupons/validate",
      { code, productIds }
    ),
};
