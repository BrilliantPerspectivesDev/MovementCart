'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [debounceSaveTimeout, setDebounceSaveTimeout] = useState<NodeJS.Timeout | null>(null);

  // Initialize cart from localStorage (if available)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Failed to parse cart from localStorage:', error);
        }
      }
    }
  }, []);

  // Debounced save cart to localStorage
  const saveCartToLocalStorage = useCallback((cartItems: CartItem[]) => {
    if (typeof window !== 'undefined') {
      // Clear any existing timeout
      if (debounceSaveTimeout) {
        clearTimeout(debounceSaveTimeout);
      }
      
      // Set a new timeout to save cart after 300ms
      const timeout = setTimeout(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
      }, 300);
      
      setDebounceSaveTimeout(timeout);
    }
  }, [debounceSaveTimeout]);

  // Save cart to localStorage whenever it changes, with debounce
  useEffect(() => {
    saveCartToLocalStorage(items);
    // Clean up timeout on unmount
    return () => {
      if (debounceSaveTimeout) {
        clearTimeout(debounceSaveTimeout);
      }
    };
  }, [items, debounceSaveTimeout, saveCartToLocalStorage]);

  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}; 