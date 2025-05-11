import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { Body, Post } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.dto';
import { EVENTS } from '@app/constants';
import { OrderProcessPayload } from 'libs/shared/entities/orderprocesspayload.entity';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create-order')
  createOrder(@Body() createOrderInput: CreateOrderInput): Order {
    return this.orderService.createOrder(createOrderInput)
  }

  @EventPattern(EVENTS.ORDER_PROCESSED)
  async handleOrderProcessed(data: OrderProcessPayload){
    this.orderService.handleOrderProcessed(data);
  }

}
