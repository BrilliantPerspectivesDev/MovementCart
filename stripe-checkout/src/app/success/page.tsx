'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// SuccessContent component that uses useSearchParams
function SuccessContent() {
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get('subscriptionId');

  return (
    <div className="min-h-screen bg-[#f9f5f0] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/brilliant-logo.png"
                alt="Brilliant Movement logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>
          <p className="text-lg text-gray-600">
            Thank you for joining Brilliant Movement.
          </p>
          {subscriptionId && (
            <p className="text-sm text-gray-500">
              Subscription ID: {subscriptionId}
            </p>
          )}
          <div className="mt-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#E9C46A] hover:bg-[#e6bd58] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E9C46A]"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

// Main Success page component with Suspense
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f9f5f0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E9C46A] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
} 