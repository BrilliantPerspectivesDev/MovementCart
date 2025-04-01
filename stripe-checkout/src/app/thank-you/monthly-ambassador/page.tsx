'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Loading component
function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#264653] to-[#2A9D8F]">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Main content component that uses useSearchParams
function ThankYouContent() {
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get('subscriptionId');
  const [loginDetails, setLoginDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 10;

  useEffect(() => {
    if (!subscriptionId) return;

    const pollForLoginDetails = async () => {
      try {
        const response = await fetch(`/api/webhook/monthly-ambassador?subscriptionId=${subscriptionId}`);
        const data = await response.json();

        if (data.success && data.details) {
          setLoginDetails(data.details);
          setIsLoading(false);
        } else {
          if (retryCount < MAX_RETRIES) {
            setTimeout(() => {
              setRetryCount(prev => prev + 1);
            }, 5000);
          } else {
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Error fetching login details:', error);
        if (retryCount < MAX_RETRIES) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 5000);
        } else {
          setIsLoading(false);
        }
      }
    };

    pollForLoginDetails();
  }, [subscriptionId, retryCount]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#264653] to-[#2A9D8F]">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Welcome to Brilliant!
              </h1>
              <p className="text-lg text-gray-600">
                Thank you for becoming a Monthly Ambassador. Your journey to making Kingdom normal starts now.
              </p>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                <p className="mt-4 text-gray-600">Setting up your account...</p>
                <p className="mt-2 text-sm text-gray-500">This may take a few moments.</p>
              </div>
            ) : loginDetails ? (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-blue-900 mb-4">Your Login Details</h2>
                  <div className="space-y-3">
                    <p className="text-blue-800">
                      <strong>Email:</strong> {loginDetails.details.email}
                    </p>
                    <p className="text-blue-800">
                      <strong>Password:</strong> {loginDetails.details.password}
                    </p>
                    <p className="text-blue-800">
                      <strong>Your Ambassador Code:</strong> {loginDetails.details.ambassadorCode}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Next Steps:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Download the BrilliantPlus app</li>
                    <li>Log in with your credentials above</li>
                    <li>Complete your ambassador profile</li>
                    <li>Join our next monthly gathering</li>
                  </ol>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important:</h3>
                  <p className="text-yellow-800">
                    Please save your login credentials and ambassador code. You'll need these to access your account and track your referrals.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <p className="text-red-800 mb-2">
                    We're having trouble retrieving your login details.
                  </p>
                  <p className="text-red-600">
                    Please contact support at help@brilliantperspectives.com
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Main page component with Suspense boundary
export default function MonthlyAmbassadorThankYou() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ThankYouContent />
    </Suspense>
  );
} 