import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { Product } from '../../../core/models/product.model';
import { AppState } from '../../../store/app.state';
import * as ProductActions from '../../../store/product/product.actions';
import * as ProductSelectors from '../../../store/product/product.selectors';
import * as CartActions from '../../../store/cart/cart.actions';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    CardModule,
    ButtonModule,
    InputTextModule,
    TagModule,
    ProgressSpinnerModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  searchKeyword = '';

  constructor(
    private store: Store<AppState>,
    private messageService: MessageService
  ) {
    this.products$ = this.store.select(ProductSelectors.selectAllProducts);
    this.loading$ = this.store.select(ProductSelectors.selectProductsLoading);
    this.error$ = this.store.select(ProductSelectors.selectProductsError);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  onSearch(): void {
    if (this.searchKeyword.trim()) {
      this.store.dispatch(ProductActions.searchProducts({ keyword: this.searchKeyword }));
    } else {
      this.loadProducts();
    }
  }

  addToCart(product: Product): void {
    this.store.dispatch(CartActions.addToCart({ product, quantity: 1 }));
    this.messageService.add({
      severity: 'success',
      summary: 'Added to Cart',
      detail: `${product.nom} has been added to your cart`,
      life: 3000
    });
  }

  getStockSeverity(product: Product): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | null {
    if (!product.disponible || product.stockQuantity === 0) {
      return 'danger';
    } else if (product.stockQuantity < 10) {
      return 'warn';
    }
    return 'success';
  }

  getStockLabel(product: Product): string {
    if (!product.disponible || product.stockQuantity === 0) {
      return 'Out of Stock';
    } else if (product.stockQuantity < 10) {
      return 'Low Stock';
    }
    return 'In Stock';
  }
}

