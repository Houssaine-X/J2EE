import { ActionReducerMap } from '@ngrx/store';
import { ProductState, productReducer } from './product/product.reducer';

export interface AppState {
  products: ProductState;
}

export const reducers: ActionReducerMap<AppState> = {
  products: productReducer
};

