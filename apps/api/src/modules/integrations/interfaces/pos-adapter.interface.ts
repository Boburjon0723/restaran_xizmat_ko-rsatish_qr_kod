export type PosType = "jowi" | "rkeeper" | "iiko";

export type NormalizedMenu = {
  categories: Array<{ id: string; name: string }>;
  items: Array<{ id: string; name: string; price: number }>;
};

export type SendOrderPayload = {
  restaurantId: string;
  orderId: string;
  items: Array<{ externalItemId: string; quantity: number }>;
};

export type SendOrderResult = {
  externalOrderId?: string;
  status: "sent" | "retrying" | "manual_required";
  reason?: string;
};

export type OrderStatus = "pending" | "sent" | "preparing" | "completed" | "failed";

export interface PosAdapter {
  getMenu(restaurantId: string): Promise<NormalizedMenu>;
  sendOrder(payload: SendOrderPayload): Promise<SendOrderResult>;
  getOrderStatus(externalOrderId: string): Promise<OrderStatus>;
  healthCheck(): Promise<boolean>;
}
