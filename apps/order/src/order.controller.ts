import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { Body, Post } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.dto';
import { EVENTS } from '@app/constants';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post(EVENTS.ORDER_CREATED)
  createOrder(@Body() createOrderInput: CreateOrderInput): Order {
    return this.orderService.createOrder(createOrderInput)
  }
}
