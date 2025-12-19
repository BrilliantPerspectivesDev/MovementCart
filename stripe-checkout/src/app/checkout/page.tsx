'use client';

/**
 * Checkout Page - Redirects to BCP
 *
 * The checkout has moved to central.brilliantmovement.com
 * This page preserves referral codes during redirect.
 *
 * Updated: 2025-12-19
 */

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function CheckoutRedirectPage() {
  const [redirectUrl, setRedirectUrl] = useState('https://central.brilliantmovement.com/checkout');
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Check for referral code in localStorage or URL
    const pathParam = localStorage.getItem('pathParam');
    const affiliateCode = localStorage.getItem('affiliateCode');
    const refCode = pathParam || affiliateCode;

    // Also check URL params
    const urlParams = new URLSearchParams(window.location.search);
    const urlRef = urlParams.get('ref');
    const frequency = urlParams.get('frequency');

    // Build redirect URL with ref param if available
    const finalRef = urlRef || refCode;
    let url = 'https://central.brilliantmovement.com/checkout';
    const params = new URLSearchParams();

    if (finalRef) {
      params.set('ref', finalRef);
    }
    if (frequency) {
      params.set('frequency', frequency);
    }

    if (params.toString()) {
      url += '?' + params.toString();
    }

    setRedirectUrl(url);

    // Auto-redirect after countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = url;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/Blacklogo.png"
            alt="Brilliant Logo"
            width={180}
            height={60}
            className="h-auto w-auto"
          />
        </div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Checkout Has Moved
        </h1>

        <p className="text-gray-600 mb-6">
          We&apos;ve upgraded our checkout experience! You&apos;re being redirected to our new checkout page.
        </p>

        {/* Countdown */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600">
            <span className="text-2xl font-bold">{countdown}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Redirecting in {countdown} seconds...</p>
        </div>

        {/* Manual redirect button */}
        <a
          href={redirectUrl}
          className="inline-block w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-full font-medium"
        >
          Continue to Checkout →
        </a>

        {/* Note */}
        <p className="text-xs text-gray-400 mt-6">
          Same great 5-day free trial, now with an improved checkout experience
        </p>
      </div>
    </div>
  );
}
