import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product } from '../../core/models/product.model';
import * as ProductActions from './product.actions';

export interface ProductState extends EntityState<Product> {
  selectedProductId: number | null;
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id!
});

export const initialState: ProductState = adapter.getInitialState({
  selectedProductId: null,
  loading: false,
  error: null
});

export const productReducer = createReducer(
  initialState,

  // Load Products
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.loadProductsSuccess, (state, { products }) =>
    adapter.setAll(products, { ...state, loading: false })
  ),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load Single Product
  on(ProductActions.loadProduct, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.loadProductSuccess, (state, { product }) =>
    adapter.upsertOne(product, {
      ...state,
      selectedProductId: product.id!,
      loading: false
    })
  ),
  on(ProductActions.loadProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Search Products
  on(ProductActions.searchProducts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.searchProductsSuccess, (state, { products }) =>
    adapter.setAll(products, { ...state, loading: false })
  ),

  // Filter by Category
  on(ProductActions.filterByCategory, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.filterByCategorySuccess, (state, { products }) =>
    adapter.setAll(products, { ...state, loading: false })
  ),

  // Filter by Price Range
  on(ProductActions.filterByPriceRange, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.filterByPriceRangeSuccess, (state, { products }) =>
    adapter.setAll(products, { ...state, loading: false })
  ),

  // Load Available Products
  on(ProductActions.loadAvailableProducts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.loadAvailableProductsSuccess, (state, { products }) =>
    adapter.setAll(products, { ...state, loading: false })
  ),

  // Create Product
  on(ProductActions.createProduct, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.createProductSuccess, (state, { product }) =>
    adapter.addOne(product, { ...state, loading: false })
  ),
  on(ProductActions.createProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Product
  on(ProductActions.updateProduct, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.updateProductSuccess, (state, { product }) =>
    adapter.updateOne({ id: product.id!, changes: product }, { ...state, loading: false })
  ),
  on(ProductActions.updateProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete Product
  on(ProductActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.deleteProductSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(ProductActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Clear Selected Product
  on(ProductActions.clearSelectedProduct, (state) => ({
    ...state,
    selectedProductId: null
  }))
);

// Export entity adapter selectors for use in feature selectors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

