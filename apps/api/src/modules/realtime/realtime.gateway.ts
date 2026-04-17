import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  namespace: "/realtime",
  cors: {
    origin: (process.env.CORS_ORIGIN ?? "*").split(",")
  }
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    client.emit("connected", { ok: true, socketId: client.id });
  }

  handleDisconnect(_client: Socket) {
    // Intentionally left empty for now.
  }

  @SubscribeMessage("join.room")
  handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() payload: { room: string }) {
    if (!payload?.room) return;
    client.join(payload.room);
    client.emit("room.joined", { room: payload.room });
  }

  emitOrderStatus(orderId: string, status: string, restaurantId?: string) {
    this.server.to(`order:${orderId}`).emit("order.status.changed", { orderId, status });
    if (restaurantId) {
      this.server.to(`restaurant:${restaurantId}`).emit("order.status.changed", {
        orderId,
        status,
        restaurantId
      });
    }
  }
}
