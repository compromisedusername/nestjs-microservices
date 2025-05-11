import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { Body, Post } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create-order')
  createOrder(@Body() createOrderInput: CreateOrderInput): Order {
    return this.orderService.createOrder(createOrderInput)
  }
}
