import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';

import { Product } from '../../../core/models/product.model';
import { AppState } from '../../../store/app.state';
import * as ProductActions from '../../../store/product/product.actions';
import * as ProductSelectors from '../../../store/product/product.selectors';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    DataViewModule,
    TagModule,
    InputTextModule,
    ProgressSpinnerModule,
    MessageModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.products$ = this.store.select(ProductSelectors.selectAllProducts);
    this.loading$ = this.store.select(ProductSelectors.selectProductsLoading);
    this.error$ = this.store.select(ProductSelectors.selectProductsError);
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  onSearch(keyword: string): void {
    if (keyword.trim()) {
      this.store.dispatch(ProductActions.searchProducts({ keyword }));
    } else {
      this.store.dispatch(ProductActions.loadProducts());
    }
  }

  getStockSeverity(stock: number): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | null {
    if (stock === 0) return 'danger';
    if (stock < 10) return 'warn';
    return 'success';
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  }
}

