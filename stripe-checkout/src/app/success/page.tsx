'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get('subscriptionId');
  const isAmbassador = searchParams.get('isAmbassador') === 'true';

  useEffect(() => {
    // Store the subscription ID in localStorage
    if (subscriptionId) {
      localStorage.setItem('subscriptionId', subscriptionId);
    }
  }, [subscriptionId]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Main Content */}
      <main className="flex-grow container mx-auto max-w-lg px-4 py-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-2 bg-green-500"></div>
          
          <div className="p-6 md:p-8">
            {/* Success Icon */}
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Payment Successful!
              </h1>
              <p className="text-gray-600">
                Thank you for joining Brilliant Movement.
              </p>
            </div>

            {/* Subscription ID */}
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-600 mb-1">Your subscription ID:</p>
              <code className="font-mono text-sm text-gray-800">
                {subscriptionId}
              </code>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <Link 
                href="/dashboard" 
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 