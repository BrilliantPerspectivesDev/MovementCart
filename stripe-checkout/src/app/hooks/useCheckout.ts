'use client';

import { useState } from 'react';
import { CartItem, CustomerInfo } from '../types';

export const useCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiateCheckout = async (
    items: CartItem[],
    customerInfo: CustomerInfo,
    frequency: string = 'monthly',
    paymentMethodId: string,
    pathParam?: string,
    isAmbassador?: boolean,
    ambassadorPriceId?: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      // Call our direct-checkout API endpoint
      const response = await fetch('/api/direct-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          customerInfo,
          frequency,
          paymentMethodId,
          pathParam, // Include the pathParam in the request
          isAmbassador, // Include the ambassador status
          ambassadorPriceId // Include the ambassador price ID
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong with the checkout');
      }

      return data;
    } catch (error: any) {
      console.error('Checkout error:', error);
      setError(error.message);
      return { error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initiateCheckout,
    isLoading,
    error
  };
}; 