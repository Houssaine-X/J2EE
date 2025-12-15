import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Cart } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'shopping_cart';

  private cartSubject: BehaviorSubject<Cart>;
  public cart$: Observable<Cart>;

  constructor() {
    const savedCart = this.loadCartFromStorage();
    this.cartSubject = new BehaviorSubject<Cart>(savedCart);
    this.cart$ = this.cartSubject.asObservable();
  }

  private loadCartFromStorage(): Cart {
    const savedCart = localStorage.getItem(this.CART_STORAGE_KEY);
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        return this.createEmptyCart();
      }
    }
    return this.createEmptyCart();
  }

  private saveCartToStorage(cart: Cart): void {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(cart));
  }

  private createEmptyCart(): Cart {
    return {
      items: [],
      totalItems: 0,
      totalAmount: 0
    };
  }

  private calculateTotals(items: CartItem[]): { totalItems: number; totalAmount: number } {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = items.reduce((sum, item) => sum + (item.product.prix * item.quantity), 0);
    return { totalItems, totalAmount };
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this.cartSubject.value;
    const existingItemIndex = currentCart.items.findIndex(
      item => item.product.id === product.id
    );

    let updatedItems: CartItem[];

    if (existingItemIndex > -1) {
      // Update quantity of existing item
      updatedItems = currentCart.items.map((item, index) => {
        if (index === existingItemIndex) {
          return {
            ...item,
            quantity: item.quantity + quantity
          };
        }
        return item;
      });
    } else {
      // Add new item
      updatedItems = [...currentCart.items, { product, quantity }];
    }

    const { totalItems, totalAmount } = this.calculateTotals(updatedItems);

    const updatedCart: Cart = {
      items: updatedItems,
      totalItems,
      totalAmount
    };

    this.cartSubject.next(updatedCart);
    this.saveCartToStorage(updatedCart);
  }

  removeFromCart(productId: number): void {
    const currentCart = this.cartSubject.value;
    const updatedItems = currentCart.items.filter(item => item.product.id !== productId);
    const { totalItems, totalAmount } = this.calculateTotals(updatedItems);

    const updatedCart: Cart = {
      items: updatedItems,
      totalItems,
      totalAmount
    };

    this.cartSubject.next(updatedCart);
    this.saveCartToStorage(updatedCart);
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentCart = this.cartSubject.value;
    const updatedItems = currentCart.items.map(item => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });

    const { totalItems, totalAmount } = this.calculateTotals(updatedItems);

    const updatedCart: Cart = {
      items: updatedItems,
      totalItems,
      totalAmount
    };

    this.cartSubject.next(updatedCart);
    this.saveCartToStorage(updatedCart);
  }

  clearCart(): void {
    const emptyCart = this.createEmptyCart();
    this.cartSubject.next(emptyCart);
    this.saveCartToStorage(emptyCart);
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }
}

