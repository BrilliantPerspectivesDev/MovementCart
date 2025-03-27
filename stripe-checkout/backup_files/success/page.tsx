'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Clear the cart on successful checkout
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 mx-auto rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. We've received your payment and will process your order shortly.
          </p>
          
          {sessionId && (
            <p className="text-sm text-gray-500 mb-6">
              Order reference: <span className="font-mono">{sessionId.split('_').pop()}</span>
            </p>
          )}
          
          <Link href="/" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-sm font-medium transition inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
} 