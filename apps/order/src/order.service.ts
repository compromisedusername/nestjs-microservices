import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Order } from './entities/order.entity';
import { OrderStatus } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.dto';
import { EVENTS } from '@app/constants';
import { OrderProcessPayload } from 'libs/shared/entities/order-process.payload.entity';
import { SERVICES } from '@app/constants/services';

@Injectable()
export class OrderService {

  constructor(@Inject(SERVICES.INVENTORY_SERVICE) private inventoryClient: ClientProxy) { }
  private orders: Order[] = [];

  createOrder(createOrderInput: CreateOrderInput): Order {
    const order = {
      ...createOrderInput,
      id: `${this.orders.length + 1}`,
      status: OrderStatus.PENDING,

    };

    this.orders.push(order)
    console.log('Order created', order, this.orders);
    this.inventoryClient.emit(EVENTS.ORDER_CREATED, order);
    return order;
  }

  handleOrderProcessed(data: OrderProcessPayload){
    const order = this.orders.find((o) => o.id.toString() === data.orderId.toString());
    if(order ){
      order.status = data.success ? OrderStatus.COMPLETED : OrderStatus.CANCELLED;
      console.log('Order status updated: ',order,", ORDERS: ",this.orders)
    }else{
      console.log("Order not found");
    }
  }

}
