'use client';

import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../hooks/useCheckout';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import Link from 'next/link';
import { products } from '../data/products';

export default function CartPage() {
  const { items, totalPrice, clearCart, addToCart } = useCart();
  const { initiateCheckout, isLoading, error } = useCheckout();

  // Automatically add a sample product to the cart if it's empty
  useEffect(() => {
    if (items.length === 0 && products.length > 0) {
      // Add a sample product to the cart
      const sampleProduct = products[0];
      addToCart(sampleProduct);
    }
  }, [items.length, addToCart]);

  const handleCheckout = async () => {
    await initiateCheckout(items);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        
        {items.length === 0 ? (
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-6">Your cart is empty</p>
            <div className="mt-4">
              <button 
                onClick={() => {
                  // Add first two products as samples
                  if (products.length > 0) addToCart(products[0]);
                  if (products.length > 1) addToCart(products[1]);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-sm font-medium transition"
              >
                Add Sample Products
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-8">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">Subtotal:</span>
                <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              
              {/* Ambassador Toggle Button */}
              <div className="border-t border-gray-200 pt-4 pb-4">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                    />
                    <div className="block w-10 h-6 rounded-full bg-gray-300"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full"></div>
                  </div>
                  <span className="ml-3 font-medium text-gray-700">Sign up to be a Brilliant Ambassador</span>
                </label>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row justify-between">
                <button
                  onClick={clearCart}
                  className="mb-3 sm:mb-0 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Clear Cart
                </button>
                
                <button
                  onClick={handleCheckout}
                  disabled={isLoading || items.length === 0}
                  className={`px-6 py-3 rounded-md text-sm font-medium ${
                    isLoading || items.length === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {isLoading ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded">
                  {error}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
} 