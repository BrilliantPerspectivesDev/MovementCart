'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Loading component for suspense fallback
function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <header className="w-full py-4 px-4 md:px-8 bg-white shadow-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center">
            <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-8 md:py-16 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </main>
    </div>
  );
}

// Content component that uses useSearchParams
function SuccessPageContent() {
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get('subscriptionId');
  const isAmbassador = searchParams.get('isAmbassador') === 'true';
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(interval);
          // In a real app, redirect to dashboard
          // For now, we'll just simulate it
          // window.location.href = '/dashboard';
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="w-full py-4 px-4 md:px-8 bg-white shadow-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center">
            <Image 
              src="/Blacklogo.png" 
              alt="Brilliant logo" 
              width={120} 
              height={30} 
              className="h-8 w-auto"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-8 md:py-16">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className={`h-3 ${isAmbassador ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-green-500 to-teal-500'}`}></div>
          
          <div className="p-6 md:p-10 text-center">
            <div className="mb-6">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
                isAmbassador ? 'bg-blue-100' : 'bg-green-100'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 ${
                  isAmbassador ? 'text-blue-600' : 'text-green-600'
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {isAmbassador ? (
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Welcome to the Ambassador Program!
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  Thank you for becoming a Brilliant Ambassador. Your partnership means a lot to us.
                </p>
                <div className="bg-blue-50 rounded-lg p-5 max-w-2xl mx-auto mb-8">
                  <h2 className="font-semibold text-blue-800 mb-2">Your Ambassador Benefits:</h2>
                  <ul className="text-blue-700 text-left space-y-2 pl-6 list-disc mb-4">
                    <li>20% commission on all referrals</li>
                    <li>Exclusive access to ambassador-only resources</li>
                    <li>Early access to new features and products</li>
                    <li>Monthly ambassador newsletter with tips and updates</li>
                  </ul>
                  <p className="text-blue-700 text-sm">
                    Access your ambassador dashboard to get your unique referral link and marketing materials.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Subscription Confirmed!
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  Thank you for subscribing to Brilliant Learning. We're excited to have you on board.
                </p>
                <div className="bg-green-50 rounded-lg p-5 max-w-2xl mx-auto mb-8">
                  <h2 className="font-semibold text-green-800 mb-2">What happens next?</h2>
                  <ul className="text-green-700 text-left space-y-2 pl-6 list-disc mb-4">
                    <li>Check your email for a welcome message with important details</li>
                    <li>Explore our platform and start your learning journey</li>
                    <li>Bookmark your dashboard for easy access</li>
                    <li>Reach out to our support team if you need any assistance</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="mb-6 text-center">
              <div className="inline-block bg-gray-100 rounded-lg p-4 max-w-lg mx-auto">
                <p className="text-gray-600 text-sm mb-1">Your subscription ID:</p>
                <code className="font-mono text-gray-800 block p-2 bg-gray-200 rounded border border-gray-300 overflow-x-auto">
                  {subscriptionId || 'subscription-id-placeholder'}
                </code>
                <p className="text-gray-500 text-xs mt-2">
                  Please save this for your records
                </p>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-gray-600">
                You will be redirected to your dashboard in {countdown} seconds
              </p>
              <div className="w-full max-w-xs mx-auto bg-gray-200 rounded-full h-2.5 mt-3">
                <div 
                  className={`h-2.5 rounded-full ${isAmbassador ? 'bg-blue-600' : 'bg-green-600'}`} 
                  style={{ width: `${(countdown / 10) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="#" 
                className={`px-6 py-2 rounded-md text-white font-medium transition-colors sm:order-2 ${
                  isAmbassador ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                Go to Dashboard
              </Link>
              <Link 
                href="/contact" 
                className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 font-medium transition-colors hover:bg-gray-100 sm:order-1"
              >
                Need Help?
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Brilliant Learning. All rights reserved.
          </p>
          <div className="mt-2 text-xs text-gray-400">
            <span>Privacy Policy</span>
            <span className="mx-2">•</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Main component with Suspense
export default function SuccessPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SuccessPageContent />
    </Suspense>
  );
} 