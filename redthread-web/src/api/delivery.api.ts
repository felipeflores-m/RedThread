import { http } from "./http";

export type Shipment = { id: number; orderId: number; estado: string; codigoSeguimiento?: string };

export const DeliveryApi = {
  trackByOrder: (orderId: number) => http.delivery.get<Shipment>(`/shipments/by-order/${orderId}`),
};
