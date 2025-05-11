import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport} from '@nestjs/microservices'

async function bootstrap(){
  const app = await NestFactory.create(AppModule)  ;
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
  });
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
