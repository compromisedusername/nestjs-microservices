import { NestFactory } from "@nestjs/core";
import { OrderModule } from "./order.module";
import { PORTS } from "@app/constants/ports";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { HOSTS } from "@app/constants/hosts";

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.TCP,
      options: {
        port: PORTS.ORDER_TRANSPORT_TCP_PORT,
        host: HOSTS.ORDER_HOST
      }
    }
  )
  app.startAllMicroservices();
  await app.listen(PORTS.ORDER_APP_PORT);
}
bootstrap();
