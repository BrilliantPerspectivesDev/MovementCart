'use client';

/**
 * Checkout Page - Local Stripe Checkout
 *
 * Handles member subscription checkout with plan selection.
 * Uses Stripe hosted checkout for payment collection.
 *
 * Updated: 2025-12-22 - Restored local checkout (removed redirect to central)
 */

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

// Loading component for Suspense fallback
function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-[#f9f5f0] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#74A78E] mx-auto mb-4"></div>
        <p className="text-gray-600">Loading checkout...</p>
      </div>
    </div>
  );
}

// Main checkout content (uses useSearchParams)
function CheckoutContent() {
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');
  const [error, setError] = useState<string | null>(null);

  // Get referral code from localStorage or URL
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    // Check URL param first, then localStorage
    const urlRef = searchParams.get('ref');
    const pathParam = localStorage.getItem('pathParam');
    const affiliateCode = localStorage.getItem('affiliateCode');
    setReferralCode(urlRef || pathParam || affiliateCode || null);

    // Check for plan preference from URL
    const planParam = searchParams.get('plan');
    if (planParam === 'annual') {
      setSelectedPlan('annual');
    }
  }, [searchParams]);

  const handleCheckout = async () => {
    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service to continue.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ id: selectedPlan }],
          selectedFrequency: selectedPlan,
          pathParam: referralCode,
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe hosted checkout
        window.location.href = data.url;
      } else {
        setError(data.error || 'Failed to create checkout session');
        setIsProcessing(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f5f0]">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header with Logo */}
        <div className="text-center pt-8 pb-6">
          <div className="flex justify-center mb-4">
            <Image
              src="/Blacklogo.png"
              alt="Brilliant Perspectives"
              width={180}
              height={58}
              className="h-14 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-[#264653] mb-2">Start Your Free Trial</h1>
        </div>

        {/* Main CTA Box */}
        <div className="bg-white rounded-2xl shadow-xl mb-6">
          <div className="p-6 sm:p-8">
            {/* 5-Day Trial Badge */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
              <p className="text-center text-green-700 font-bold text-lg mb-1">
                🎉 5-Day Free Trial
              </p>
              <p className="text-sm text-center text-gray-700">
                Try risk-free for 5 days. Cancel anytime during your trial.
              </p>
            </div>

            <h3 className="text-xl font-bold text-center text-[#264653] mb-6">
              Selected Plan: Movement {selectedPlan === 'monthly' ? 'Monthly' : 'Annual'}
            </h3>

            {/* Plan Selection */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Monthly Option */}
              <button
                type="button"
                onClick={() => setSelectedPlan('monthly')}
                className={`rounded-xl border-2 p-6 text-center transition-all ${
                  selectedPlan === 'monthly'
                    ? 'border-[#74A78E] bg-[#74A78E]/5 ring-2 ring-[#74A78E]'
                    : 'border-gray-200 hover:border-[#74A78E]/50'
                }`}
              >
                <div className="inline-block px-3 py-1 bg-[#74A78E] text-white text-xs font-semibold rounded-full mb-2">
                  Most Popular
                </div>
                <h4 className="text-lg font-bold text-[#264653] mb-2">Movement Monthly</h4>
                <p className="text-4xl font-bold text-[#74A78E] mb-1">$47</p>
                <p className="text-gray-600 text-sm mb-3">/month</p>
                <p className="text-xs text-gray-500">After trial, billed monthly</p>
              </button>

              {/* Annual Option */}
              <button
                type="button"
                onClick={() => setSelectedPlan('annual')}
                className={`rounded-xl border-2 p-6 text-center transition-all ${
                  selectedPlan === 'annual'
                    ? 'border-[#74A78E] bg-[#74A78E]/5 ring-2 ring-[#74A78E]'
                    : 'border-gray-200 hover:border-[#74A78E]/50'
                }`}
              >
                <div className="inline-block px-3 py-1 bg-[#E9C46A] text-[#264653] text-xs font-semibold rounded-full mb-2">
                  Best Value
                </div>
                <h4 className="text-lg font-bold text-[#264653] mb-2">Movement Annual</h4>
                <p className="text-4xl font-bold text-[#74A78E] mb-1">$397</p>
                <p className="text-gray-600 text-sm mb-3">/year</p>
                <p className="text-xs text-gray-500">After trial, billed annually</p>
              </button>
            </div>

            {/* Referral Info */}
            {referralCode && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-center text-blue-700">
                  🎉 You&apos;re joining through <strong>{referralCode}</strong>&apos;s referral
                </p>
              </div>
            )}

            {/* Terms Checkbox */}
            <div className="mb-6">
              <label className="flex items-center justify-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-5 h-5 text-[#74A78E] rounded focus:ring-[#74A78E]"
                />
                <span className="text-gray-700">
                  I agree to the{' '}
                  <a
                    href="https://brilliantperspectives.clickfunnels.com/optinlhu0kk20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#74A78E] underline hover:text-[#5a8a72]"
                  >
                    Terms of Service
                  </a>
                </span>
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center">
                {error}
              </div>
            )}

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isProcessing || !agreedToTerms}
              className={`w-full py-4 px-8 rounded-full font-medium text-white transition-all ${
                agreedToTerms && !isProcessing
                  ? 'bg-[#74A78E] hover:bg-[#5a8a72]'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {isProcessing ? 'Processing...' : 'Start Free Trial'}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              🔒 Secure checkout powered by Stripe • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrapper component with Suspense boundary
export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  );
}
