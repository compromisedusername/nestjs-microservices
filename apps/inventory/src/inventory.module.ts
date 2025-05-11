import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICES } from '@app/constants/services';
import { PORTS } from '@app/constants/ports';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICES.ORDER_SERVICE,
        transport: Transport.TCP,
        options: {port: PORTS.TRANSPORT_TCP_PORT}
      }
    ])
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
