import { Controller, Get } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { EventPattern } from '@nestjs/microservices';
import { addProductInput } from './dto/add-product-input.dto';
import { Inventory } from './entities/inventory.entity';

import { EVENTS } from '@app/constants';
import { Order } from 'libs/shared/entities/order.entity';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}
  @Post('add-product')
  addProduct(@Body() addProductInput: addProductInput): Inventory{
    return this.inventoryService.addProduct(addProductInput);
  }

  @EventPattern(EVENTS.ORDER_CREATED)
  async handleOrderCreated(data: Order){
    this.inventoryService.handleOrderCreated(data);
  }

  @EventPattern(EVENTS.PRODUCT_ADDED)
  async handleProductAdded(data: Inventory){
    this.inventoryService.handleProductAdded(data);
  }

}
