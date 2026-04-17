import { Injectable, NotFoundException } from "@nestjs/common";
import { OrderStatus } from "@prisma/client";
import { PrismaService } from "../../common/prisma/prisma.service";
import { RealtimeGateway } from "../realtime/realtime.gateway";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderStatusDto } from "./dto/update-order-status.dto";

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly realtimeGateway: RealtimeGateway
  ) {}

  async createOrder(payload: CreateOrderDto) {
    const menuItems = await this.prisma.menuItem.findMany({
      where: {
        restaurantId: payload.restaurantId,
        id: {
          in: payload.items.map((item) => item.menuItemId)
        }
      }
    });

    const menuItemMap = new Map(menuItems.map((item) => [item.id, item]));
    const normalizedItems = payload.items.map((item) => {
      const menu = menuItemMap.get(item.menuItemId);
      return {
        menuItemId: item.menuItemId,
        name: item.name ?? menu?.name ?? "Unknown item",
        price: item.price ?? menu?.price ?? 0,
        quantity: item.quantity
      };
    });

    const totalAmount = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const created = await this.prisma.order.create({
      data: {
        restaurantId: payload.restaurantId,
        tableId: payload.tableId,
        status: OrderStatus.PENDING,
        source: payload.source ?? "qr",
        totalAmount,
        items: {
          create: normalizedItems.map((item) => ({
            menuItemId: item.menuItemId,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
        },
        events: {
          create: {
            type: "order.created",
            payloadJson: JSON.stringify({ source: payload.source ?? "qr" })
          }
        }
      },
      include: { items: true }
    });

    this.realtimeGateway.emitOrderStatus(created.id, created.status, created.restaurantId);
    return created;
  }

  async listOrders() {
    return this.prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        items: true,
        table: true
      }
    });
  }

  async getPublicOrderStatus(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
        failureReason: true,
        updatedAt: true
      }
    });

    if (!order) {
      throw new NotFoundException("Order not found");
    }
    return order;
  }

  async updateOrderStatus(id: string, payload: UpdateOrderStatusDto) {
    const existing = await this.prisma.order.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException("Order not found");
    }

    const updated = await this.prisma.order.update({
      where: { id },
      data: {
        status: payload.status,
        failureReason: payload.failureReason ?? existing.failureReason,
        events: {
          create: {
            type: "order.status.changed",
            payloadJson: JSON.stringify({
              from: existing.status,
              to: payload.status,
              failureReason: payload.failureReason ?? null
            })
          }
        }
      },
      include: { items: true, table: true }
    });

    this.realtimeGateway.emitOrderStatus(updated.id, updated.status, updated.restaurantId);
    return updated;
  }
}
