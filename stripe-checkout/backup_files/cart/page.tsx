'use client';

import { useCart } from '../context/CartContext';
import { useCheckout } from '../hooks/useCheckout';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import Link from 'next/link';

export default function CartPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { initiateCheckout, isLoading, error } = useCheckout();

  const handleCheckout = async () => {
    await initiateCheckout(items);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-6">Your cart is empty</p>
            <Link href="/" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-sm font-medium transition">
              Continue Shopping
            </Link>
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
              
              <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row justify-between">
                <button
                  onClick={clearCart}
                  className="mb-3 sm:mb-0 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Clear Cart
                </button>
                
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className={`
                    bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-sm font-medium transition
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  {isLoading ? 'Processing...' : 'Checkout with Stripe'}
                </button>
              </div>
              
              {error && (
                <div className="mt-4 text-red-500 text-sm">
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