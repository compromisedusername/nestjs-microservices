import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Order } from './entities/order.entity';
import { OrderStatus } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.dto';

@Injectable()
export class OrderService {

  constructor(@Inject('INVENTORY_SERVICE') private inventoryClient: ClientProxy) { }
  private orders: Order[] = [];

  createOrder(createOrderInput: CreateOrderInput): Order {
    const order = {
      ...createOrderInput,
      id: `${this.orders.length + 1}`,
      status: OrderStatus.PENDING,

    };

    this.orders.push(order)
    console.log('Order created', order, this.orders);
    this.inventoryClient.emit('order_created', order);
    return order;
  }

}
