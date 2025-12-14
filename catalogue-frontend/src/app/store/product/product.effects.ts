import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ProductService } from '../../core/services/product.service';
import * as ProductActions from './product.actions';

/**
 * Product Effects - Side effects for product state management
 * All effect properties are automatically registered and used by NgRx
 * They listen to dispatched actions and trigger API calls
 */
@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  // Effect properties are used by NgRx framework automatically
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(() => {
        console.log('[ProductEffects] Loading products...');
        return this.productService.getAllProducts().pipe(
          map((products) => {
            console.log('[ProductEffects] Products loaded:', products);
            return ProductActions.loadProductsSuccess({ products });
          }),
          catchError((error) => {
            console.error('[ProductEffects] Error loading products:', error);
            return of(ProductActions.loadProductsFailure({ error: error.message }));
          })
        );
      })
    )
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProduct),
      switchMap(({ id }) =>
        this.productService.getProductById(id).pipe(
          map((product) => ProductActions.loadProductSuccess({ product })),
          catchError((error) =>
            of(ProductActions.loadProductFailure({ error: error.message }))
          )
        )
      )
    )
  );

  searchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.searchProducts),
      switchMap(({ keyword }) =>
        this.productService.searchProducts(keyword).pipe(
          map((products) => ProductActions.searchProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  filterByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.filterByCategory),
      switchMap(({ categoryName }) =>
        this.productService.getProductsByCategory(categoryName).pipe(
          map((products) => ProductActions.filterByCategorySuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  filterByPriceRange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.filterByPriceRange),
      switchMap(({ minPrice, maxPrice }) =>
        this.productService.getProductsByPriceRange(minPrice, maxPrice).pipe(
          map((products) => ProductActions.filterByPriceRangeSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadAvailableProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadAvailableProducts),
      switchMap(() =>
        this.productService.getAvailableProducts().pipe(
          map((products) => ProductActions.loadAvailableProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProduct),
      switchMap(({ product }) =>
        this.productService.createProduct(product).pipe(
          map((product) => ProductActions.createProductSuccess({ product })),
          catchError((error) =>
            of(ProductActions.createProductFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      switchMap(({ id, product }) =>
        this.productService.updateProduct(id, product).pipe(
          map((product) => ProductActions.updateProductSuccess({ product })),
          catchError((error) =>
            of(ProductActions.updateProductFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      switchMap(({ id }) =>
        this.productService.deleteProduct(id).pipe(
          map(() => ProductActions.deleteProductSuccess({ id })),
          catchError((error) =>
            of(ProductActions.deleteProductFailure({ error: error.message }))
          )
        )
      )
    )
  );
}

