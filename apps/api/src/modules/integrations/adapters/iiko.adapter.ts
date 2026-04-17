import {
  NormalizedMenu,
  OrderStatus,
  PosAdapter,
  SendOrderPayload,
  SendOrderResult
} from "../interfaces/pos-adapter.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class IikoAdapter implements PosAdapter {
  async getMenu(_restaurantId: string): Promise<NormalizedMenu> {
    return { categories: [], items: [] };
  }

  async sendOrder(_payload: SendOrderPayload): Promise<SendOrderResult> {
    return { status: "sent", externalOrderId: "iiko-order-id" };
  }

  async getOrderStatus(_externalOrderId: string): Promise<OrderStatus> {
    return "preparing";
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }
}
