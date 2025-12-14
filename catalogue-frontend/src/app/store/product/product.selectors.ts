import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, selectAll } from './product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  selectAll
);

export const selectProductsLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);

export const selectProductsError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);

export const selectSelectedProductId = createSelector(
  selectProductState,
  (state: ProductState) => state.selectedProductId
);

/** @future-feature Product detail page - Get currently selected product */
export const selectSelectedProduct = createSelector(
  selectProductState,
  selectSelectedProductId,
  (state, selectedId) => selectedId && state.entities[selectedId]
);

/** @future-feature Product detail page - Get product by ID */
export const selectProductById = (id: number) =>
  createSelector(selectProductState, (state: ProductState) => state.entities[id]);

/** @future-feature Stock filter - Get only available products */
export const selectAvailableProducts = createSelector(
  selectAllProducts,
  (products) => products.filter((product) => product.disponible)
);

/** @future-feature Category filter - Get products by category */
export const selectProductsByCategory = (categoryName: string) =>
  createSelector(selectAllProducts, (products) =>
    products.filter((product) => product.categoryName === categoryName)
  );

