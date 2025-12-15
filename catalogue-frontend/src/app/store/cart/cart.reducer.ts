import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { initialCartState } from './cart.state';
import { CartItem } from '../../core/models/cart.model';

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return initialCartState.cart;
};

// Save cart to localStorage
const saveCartToStorage = (cart: any) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export const cartReducer = createReducer(
  { cart: loadCartFromStorage() },

  on(CartActions.addToCart, (state, { product, quantity }) => {
    const existingItemIndex = state.cart.items.findIndex(
      (item: CartItem) => item.product.id === product.id
    );

    let updatedItems: CartItem[];

    if (existingItemIndex > -1) {
      updatedItems = state.cart.items.map((item: CartItem, index: number) => {
        if (index === existingItemIndex) {
          return {
            ...item,
            quantity: item.quantity + quantity
          };
        }
        return item;
      });
    } else {
      updatedItems = [...state.cart.items, { product, quantity }];
    }

    const totalItems = updatedItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
    const totalAmount = updatedItems.reduce((sum: number, item: CartItem) => sum + (item.product.prix * item.quantity), 0);

    const newCart = {
      items: updatedItems,
      totalItems,
      totalAmount
    };

    saveCartToStorage(newCart);

    return {
      ...state,
      cart: newCart
    };
  }),

  on(CartActions.removeFromCart, (state, { productId }) => {
    const updatedItems = state.cart.items.filter((item: CartItem) => item.product.id !== productId);
    const totalItems = updatedItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
    const totalAmount = updatedItems.reduce((sum: number, item: CartItem) => sum + (item.product.prix * item.quantity), 0);

    const newCart = {
      items: updatedItems,
      totalItems,
      totalAmount
    };

    saveCartToStorage(newCart);

    return {
      ...state,
      cart: newCart
    };
  }),

  on(CartActions.updateQuantity, (state, { productId, quantity }) => {
    if (quantity <= 0) {
      const updatedItems = state.cart.items.filter((item: CartItem) => item.product.id !== productId);
      const totalItems = updatedItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
      const totalAmount = updatedItems.reduce((sum: number, item: CartItem) => sum + (item.product.prix * item.quantity), 0);

      const newCart = {
        items: updatedItems,
        totalItems,
        totalAmount
      };

      saveCartToStorage(newCart);

      return {
        ...state,
        cart: newCart
      };
    }

    const updatedItems = state.cart.items.map((item: CartItem) => {
      if (item.product.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });

    const totalItems = updatedItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
    const totalAmount = updatedItems.reduce((sum: number, item: CartItem) => sum + (item.product.prix * item.quantity), 0);

    const newCart = {
      items: updatedItems,
      totalItems,
      totalAmount
    };

    saveCartToStorage(newCart);

    return {
      ...state,
      cart: newCart
    };
  }),

  on(CartActions.clearCart, (state) => {
    const emptyCart = {
      items: [],
      totalItems: 0,
      totalAmount: 0
    };

    saveCartToStorage(emptyCart);

    return {
      ...state,
      cart: emptyCart
    };
  })
);

