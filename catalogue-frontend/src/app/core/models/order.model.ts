export interface Order {
  id?: number;
  userId: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod?: string;
  shippingAddress?: string;
  orderItems?: OrderItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderItem {
  id?: number;
  productId: number;
  productName?: string;
  quantity: number;
  price: number;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

