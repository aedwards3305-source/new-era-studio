'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { Cart, CartItem, ProductImage } from '@/lib/types';

interface CartContextType {
  cart: Cart;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'id'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR' }
  | { type: 'LOAD'; payload: CartItem[] };

function cartReducer(state: Cart, action: CartAction): Cart {
  let newItems: CartItem[];

  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (item) => item.variantId === action.payload.variantId
      );

      if (existing) {
        newItems = state.items.map((item) =>
          item.variantId === action.payload.variantId
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          ...action.payload,
          id: `cart-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        };
        newItems = [...state.items, newItem];
      }
      break;
    }

    case 'REMOVE_ITEM':
      newItems = state.items.filter((item) => item.id !== action.payload);
      break;

    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        newItems = state.items.filter((item) => item.id !== action.payload.id);
      } else {
        newItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      }
      break;

    case 'CLEAR':
      newItems = [];
      break;

    case 'LOAD':
      newItems = action.payload;
      break;

    default:
      return state;
  }

  const totalQuantity = newItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = newItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  return { items: newItems, totalQuantity, subtotal };
}

const initialCart: Cart = { items: [], totalQuantity: 0, subtotal: 0 };

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('new-era-studio-cart');
      if (saved) {
        const items = JSON.parse(saved) as CartItem[];
        dispatch({ type: 'LOAD', payload: items });
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('new-era-studio-cart', JSON.stringify(cart.items));
    } catch {
      // Ignore storage errors
    }
  }, [cart.items]);

  const addToCart = useCallback(
    (item: Omit<CartItem, 'id'>) => {
      dispatch({ type: 'ADD_ITEM', payload: item });
      setIsCartOpen(true);
    },
    []
  );

  const removeFromCart = useCallback((itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
