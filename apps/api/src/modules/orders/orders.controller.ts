import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderStatusDto } from "./dto/update-order-status.dto";
import { OrdersService } from "./orders.service";

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post("public/orders")
  createPublicOrder(@Body() payload: CreateOrderDto) {
    return this.ordersService.createOrder(payload);
  }

  @Get("public/orders/:id/status")
  getPublicOrderStatus(@Param("id") id: string) {
    return this.ordersService.getPublicOrderStatus(id);
  }

  @Get("admin/orders")
  listAdminOrders() {
    return this.ordersService.listOrders();
  }

  @Patch("admin/orders/:id/status")
  updateAdminOrderStatus(@Param("id") id: string, @Body() payload: UpdateOrderStatusDto) {
    return this.ordersService.updateOrderStatus(id, payload);
  }
}
