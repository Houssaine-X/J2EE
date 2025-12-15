import { ActionReducerMap } from '@ngrx/store';
import { ProductState, productReducer } from './product/product.reducer';
import { CartState } from './cart/cart.state';
import { cartReducer } from './cart/cart.reducer';

export interface AppState {
  products: ProductState;
  cart: CartState;
}

export const reducers: ActionReducerMap<AppState> = {
  products: productReducer,
  cart: cartReducer
};

