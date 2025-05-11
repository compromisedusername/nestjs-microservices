import { Controller, Get } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { EventPattern } from '@nestjs/microservices';

import { EVENTS } from '@app/constants';
import { Order } from 'libs/shared/entities/order.entity';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}
  @EventPattern(EVENTS.ORDER_CREATED)
  async handleOrderCreated(data: Order){
    this.inventoryService.handleOrderCreated(data);
  }

}
