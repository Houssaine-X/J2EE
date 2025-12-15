import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.state';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCart = createSelector(
  selectCartState,
  (state: CartState) => state.cart
);

export const selectCartItems = createSelector(
  selectCart,
  (cart) => cart.items
);

export const selectCartTotalItems = createSelector(
  selectCart,
  (cart) => cart.totalItems
);

export const selectCartTotalAmount = createSelector(
  selectCart,
  (cart) => cart.totalAmount
);

export const selectCartItemCount = createSelector(
  selectCartItems,
  (items) => items.length
);

