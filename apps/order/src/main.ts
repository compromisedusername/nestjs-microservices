import { NestFactory } from "@nestjs/core";
import { OrderModule } from "./order.module";
import { PORTS } from "@app/constants/ports";

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  app.startAllMicroservices();
  await app.listen(PORTS.ORDER_APP_PORT);
}
bootstrap();
