import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport} from '@nestjs/microservices'
import { PORTS } from '@app/constants/ports';

async function bootstrap(){
  const app = await NestFactory.create(AppModule)  ;
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
  });
  await app.startAllMicroservices();
  await app.listen(PORTS.APP_PORT);
}
bootstrap();
