import { Inject, Injectable } from '@nestjs/common';
import { EVENTS } from '@app/constants';
import { SERVICES } from '@app/constants/services';
import { Inventory } from './entities/inventory.entity';
import { Order } from 'libs/shared/entities/order.entity';
import { OrderProcessPayload } from 'libs/shared/entities/order-process.payload.entity';
import { ClientProxy } from '@nestjs/microservices';
import { addProductInput } from './dto/add-product-input.dto';

@Injectable()
export class InventoryService {
  constructor(
    @Inject(SERVICES.ORDER_SERVICE) private orderClient: ClientProxy,
  ) { }

  private inventory: Inventory[] = [
    { id: 1, name: 'a', quantity: 100 },
    { id: 2, name: 'b', quantity: 100 },
    { id: 3, name: 'c', quantity: 100 },
  ];

  addProduct(product: addProductInput) {
    let p = this.inventory.find((i) => i.name == product.name);
    const id = p ? p.id : this.inventory.length + 1;

    if (p) {
      p.quantity += product.quantity;
    } else {
      p = { ...product, id: id };
      this.inventory.push({ ...product, id: id });
    }
    console.log('Product added to Inventory', p, this.inventory);
    return p;
  }

  handleOrderCreated(order: Order) {
    let success = false;
    let message = '';
    const item = this.inventory.find((i) => i.name === order.product);
    if (item) {
      if (item.quantity < order.quantity) {
        message = 'Insufficient quantity in inventory';
      } else {
        item.quantity -= order.quantity;
        success = true;
        message = 'Order processed successfully';
      }
    } else {
      message = `Product ${order.product} not found in inventory`;
    }
    const payload: OrderProcessPayload = {
      success,
      message,
      orderId: order.id,
    };
    console.log('Order processed with the payload: ', payload);

    return this.orderClient.emit(EVENTS.ORDER_PROCESSED, payload);
  }
}
