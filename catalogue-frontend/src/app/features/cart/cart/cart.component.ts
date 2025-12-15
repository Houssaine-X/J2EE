import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';

import { CartItem, Cart } from '../../../core/models/cart.model';
import { AppState } from '../../../store/app.state';
import * as CartActions from '../../../store/cart/cart.actions';
import * as CartSelectors from '../../../store/cart/cart.selectors';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    TableModule,
    InputNumberModule,
    DividerModule,
    TooltipModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart$: Observable<Cart>;
  cartItems$: Observable<CartItem[]>;
  totalAmount$: Observable<number>;
  totalItems$: Observable<number>;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.cart$ = this.store.select(CartSelectors.selectCart);
    this.cartItems$ = this.store.select(CartSelectors.selectCartItems);
    this.totalAmount$ = this.store.select(CartSelectors.selectCartTotalAmount);
    this.totalItems$ = this.store.select(CartSelectors.selectCartTotalItems);
  }

  ngOnInit(): void {
    // Cart is already loaded from localStorage via the reducer
  }

  updateQuantity(productId: number, quantity: number): void {
    this.store.dispatch(CartActions.updateQuantity({ productId, quantity }));
  }

  removeItem(productId: number): void {
    this.store.dispatch(CartActions.removeFromCart({ productId }));
  }

  clearCart(): void {
    this.store.dispatch(CartActions.clearCart());
  }

  proceedToCheckout(): void {
    // Redirect to login page
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: '/checkout' }
    });
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  getItemTotal(item: CartItem): number {
    return item.product.prix * item.quantity;
  }
}

