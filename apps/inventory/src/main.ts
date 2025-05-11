import { NestFactory } from '@nestjs/core';
import { InventoryModule } from './inventory.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PORTS } from '@app/constants/ports';
import { HOSTS } from '@app/constants/hosts';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(InventoryModule, {
    transport: Transport.TCP,
    options: {
      port: PORTS.TRANSPORT_TCP_PORT,
      host: HOSTS.INVENTORY_HOST
    }
  })
  await app.listen();
}
bootstrap();
