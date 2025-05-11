import { NestFactory } from '@nestjs/core';
import { InventoryModule } from './inventory.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PORTS } from '@app/constants/ports';
import { HOSTS } from '@app/constants/hosts';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
//  const app = await NestFactory.createMicroservice<MicroserviceOptions>(InventoryModule, {
    const app = await NestFactory.create(InventoryModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }))
  app.connectMicroservice<MicroserviceOptions>(
    {
    transport: Transport.TCP,
    options: {
      port: PORTS.INVENTORY_TRANSPORT_TCP_PORT,
      host: HOSTS.INVENTORY_HOST
    }
  })
  app.startAllMicroservices();
  await app.listen(PORTS.INVENTORY_APP_PORT);
}
bootstrap();
