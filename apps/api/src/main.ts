import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { PrismaService } from "./common/prisma/prisma.service";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prisma = app.get(PrismaService);
  await prisma.enableShutdownHooks(app);

  app.setGlobalPrefix("api/v1");
  app.enableCors({
    origin: (process.env.CORS_ORIGIN ?? "*").split(","),
    credentials: true
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(Number(process.env.PORT ?? 4000));
}

bootstrap();
