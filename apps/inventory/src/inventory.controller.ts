import { Controller, Get } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { EventPattern } from '@nestjs/microservices';

import { EVENTS } from '@app/constants';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}
  @EventPattern(EVENTS.ORDER_CREATED)
  async handleOrderCreated(data: any){
    console.log('Order created: ', data);
  }

  @Get()
  getHello(): string {
    return this.inventoryService.getHello();
  }
}
