import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    const connectOnBoot = process.env.PRISMA_CONNECT_ON_BOOT === "true";
    if (!connectOnBoot) return;

    try {
      await this.$connect();
    } catch (error) {
      console.error("Prisma connect on boot failed:", error);
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on("beforeExit", async () => {
      await app.close();
    });
  }
}
