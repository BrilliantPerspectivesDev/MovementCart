'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CartItem, CheckoutResponse } from '../types';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export const useCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiateCheckout = async (items: CartItem[]) => {
    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create a checkout session via our API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const data: CheckoutResponse = await response.json();

      // If we have a URL from Stripe, redirect to it
      if (data.url) {
        window.location.href = data.url;
        return;
      }

      // Otherwise, get Stripe.js instance and redirect with the session ID
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Failed to load Stripe.js');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initiateCheckout,
    isLoading,
    error,
  };
}; 