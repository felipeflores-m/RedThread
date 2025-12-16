import { http } from "./http";

/* ========================
   Tipos base de catálogo
======================== */

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

export type ProductImage = {
  id: number;
  publicUrl: string;
  primary?: boolean;
};

export type Product = {
  id: number;
  name: string;
  description?: string;
  basePrice: number;
  active: boolean;
  featured: boolean;
  gender: "HOMBRE" | "MUJER";
  category?: Category;
  brand?: Brand;
  images?: ProductImage[];
};

/* ====== Crear / actualizar producto ====== */

export type CreateProductReq = {
  categoryId: number;
  brandId?: number | null;
  name: string;
  description?: string;
  basePrice: number;
  featured: boolean;
  gender: "HOMBRE" | "MUJER";
};

/* ====== Variantes ====== */

export type SizeType = "EU" | "LETTER";

export type Variant = {
  id: number;
  productId: number;
  sizeType: SizeType;
  sizeValue: string;
  color: string;
  sku: string;
  priceOverride?: number | null;
  inventory?: {
    id: number;
    stockAvailable: number;
    stockReserved: number;
  };
};

export type CreateVariantReq = {
  productId: number;
  sizeType: SizeType;
  sizeValue: string;
  color: string;
  sku: string;
  stock: number;
};

/* ========================
   API pública de catálogo
======================== */

export const CatalogApi = {
  /* ---- CATEGORÍAS ---- */
  listCategories: () => http.catalog.get<Category[]>("/categories"),

  /* ---- MARCAS ---- */
  listBrands: () => http.catalog.get<Brand[]>("/brands"),

  /* ---- PRODUCTOS ---- */
  listProducts: () => http.catalog.get<Product[]>("/products"),

  getProduct: (id: number) =>
    http.catalog.get<Product>(`/products/${id}`),

  createProduct: (data: CreateProductReq) =>
    http.catalog.post<Product>("/products", data),

  updateProduct: (id: number, data: CreateProductReq) =>
    http.catalog.put<Product>(`/products/${id}`, data),

  deleteProduct: (id: number) =>
    http.catalog.delete(`/products/${id}`),

  /* ---- VARIANTES ---- */
  listVariantsByProduct: (productId: number) =>
    http.catalog.get<Variant[]>(`/variants?productId=${productId}`),

  createVariant: (data: CreateVariantReq) =>
    http.catalog.post("/variants", data),

  /* ---- IMÁGENES ---- */
  listProductImages: (productId: number) =>
    http.catalog.get<ProductImage[]>(`/products/${productId}/images`),

  uploadImage: (productId: number, file: File) => {
    const form = new FormData();
    form.append("file", file);

    return http.catalog.post<ProductImage[]>(
      `/products/${productId}/images/upload`,
      form,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  },

  uploadImageFromUrl: (productId: number, data: { url: string }) =>
    http.catalog.post<ProductImage[]>(
      `/products/${productId}/images/from-url`,
      data
    ),

  markPrimaryImage: (productId: number, imageId: number) =>
    http.catalog.post(
      `/products/${productId}/images/${imageId}/primary`
    ),

  deleteImage: (productId: number, imageId: number) =>
    http.catalog.delete(
      `/products/${productId}/images/${imageId}`
    ),

  /* ---- CUPONES ---- */
  validateCoupon: (code: string, productIds: number[]) =>
    http.catalog.post<{ valid: boolean; discountPct?: number }>(
      "/coupons/validate",
      { code, productIds }
    ),

    decreaseStock: async (variantId: number, qty: number) => {
    // Intento 1 (mi sugerencia anterior)
    try {
      return await http.catalog.post(`/variants/${variantId}/decrease-stock`, { qty });
    } catch (e: any) {
      if (e?.response?.status !== 404) throw e;
    }

    // Intento 2 (común cuando hay inventory separado)
    return await http.catalog.post(`/inventory/${variantId}/decrease`, { qty });
  },

};
