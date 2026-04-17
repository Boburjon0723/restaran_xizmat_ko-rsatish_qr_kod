import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { PrismaModule } from "./common/prisma/prisma.module";
import { RealtimeModule } from "./modules/realtime/realtime.module";
import { OrdersModule } from "./modules/orders/orders.module";
import { IntegrationsModule } from "./modules/integrations/integrations.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, RealtimeModule, OrdersModule, IntegrationsModule],
  controllers: [AppController]
})
export class AppModule {}
