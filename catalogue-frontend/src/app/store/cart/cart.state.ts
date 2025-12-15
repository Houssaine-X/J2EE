import { Cart } from '../../core/models/cart.model';

export interface CartState {
  cart: Cart;
}

export const initialCartState: CartState = {
  cart: {
    items: [],
    totalItems: 0,
    totalAmount: 0
  }
};

