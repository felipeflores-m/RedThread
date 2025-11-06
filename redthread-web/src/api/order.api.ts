import { http } from "./http";

export type Address = {
  id: number; alias?: string; linea1: string; linea2?: string;
  ciudad: string; region: string; pais: string; codigoPostal?: string; predeterminada?: boolean;
};

export type CartItemDTO = { variantId: number; cantidad: number };
export type OrderPreview = { subtotal: number; descuento: number; envio: number; total: number; moneda: string };
export type Order = { id: number; estado: string; total: number; moneda: string; creadoEn: string };

export const OrderApi = {
  getAddresses: () => http.order.get<Address[]>("/addresses"),
  saveAddress:  (a: Partial<Address>) => http.order.post<Address>("/addresses", a),
  // Carrito/checkout
  preview: (items: CartItemDTO[], coupon?: string, addressId?: number) =>
    http.order.post<OrderPreview>("/checkout/preview", { items, coupon, addressId }),
  create:  (payload: { items: CartItemDTO[]; coupon?: string; addressId: number; method: string; notes?: string }) =>
    http.order.post<Order>("/checkout/create", payload),
  myOrders: () => http.order.get<Order[]>("/orders/me"),
};
