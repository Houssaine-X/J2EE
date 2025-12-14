import { createAction, props } from '@ngrx/store';
import { Product } from '../../core/models/product.model';

// Load Products
export const loadProducts = createAction('[Product List] Load Products');
export const loadProductsSuccess = createAction(
  '[Product API] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product API] Load Products Failure',
  props<{ error: string }>()
);

// Load Product by ID
export const loadProduct = createAction(
  '[Product Detail] Load Product',
  props<{ id: number }>()
);
export const loadProductSuccess = createAction(
  '[Product API] Load Product Success',
  props<{ product: Product }>()
);
export const loadProductFailure = createAction(
  '[Product API] Load Product Failure',
  props<{ error: string }>()
);

// Search Products
export const searchProducts = createAction(
  '[Product List] Search Products',
  props<{ keyword: string }>()
);
export const searchProductsSuccess = createAction(
  '[Product API] Search Products Success',
  props<{ products: Product[] }>()
);

// Filter by Category
export const filterByCategory = createAction(
  '[Product List] Filter By Category',
  props<{ categoryName: string }>()
);
export const filterByCategorySuccess = createAction(
  '[Product API] Filter By Category Success',
  props<{ products: Product[] }>()
);

// Filter by Price Range - Used in advanced filtering feature
/** @future-feature Price range filter */
export const filterByPriceRange = createAction(
  '[Product List] Filter By Price Range',
  props<{ minPrice: number; maxPrice: number }>()
);
/** @future-feature Price range filter */
export const filterByPriceRangeSuccess = createAction(
  '[Product API] Filter By Price Range Success',
  props<{ products: Product[] }>()
);

// Get Available Products - Used in stock filtering feature
/** @future-feature Available products filter */
export const loadAvailableProducts = createAction('[Product List] Load Available Products');
/** @future-feature Available products filter */
export const loadAvailableProductsSuccess = createAction(
  '[Product API] Load Available Products Success',
  props<{ products: Product[] }>()
);

// Create Product
export const createProduct = createAction(
  '[Product Admin] Create Product',
  props<{ product: Product }>()
);
export const createProductSuccess = createAction(
  '[Product API] Create Product Success',
  props<{ product: Product }>()
);
export const createProductFailure = createAction(
  '[Product API] Create Product Failure',
  props<{ error: string }>()
);

// Update Product
export const updateProduct = createAction(
  '[Product Admin] Update Product',
  props<{ id: number; product: Product }>()
);
export const updateProductSuccess = createAction(
  '[Product API] Update Product Success',
  props<{ product: Product }>()
);
export const updateProductFailure = createAction(
  '[Product API] Update Product Failure',
  props<{ error: string }>()
);

// Delete Product
export const deleteProduct = createAction(
  '[Product Admin] Delete Product',
  props<{ id: number }>()
);
export const deleteProductSuccess = createAction(
  '[Product API] Delete Product Success',
  props<{ id: number }>()
);
export const deleteProductFailure = createAction(
  '[Product API] Delete Product Failure',
  props<{ error: string }>()
);

// Clear Selected Product - Used in product detail page navigation
/** @future-feature Product detail page */
export const clearSelectedProduct = createAction('[Product] Clear Selected Product');

