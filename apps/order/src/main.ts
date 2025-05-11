import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule)
  app.startAllMicroservices()
  await app.listen(3001)
}
bootstrap();
