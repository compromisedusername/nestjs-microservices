export enum OrderStatus {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',

}

export class Order {
  id: string;
  name: string;
  product: string;
  price: number;
  status: OrderStatus;
  quantity: number;
}
