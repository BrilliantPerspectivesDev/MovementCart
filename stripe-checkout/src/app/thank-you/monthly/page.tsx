'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLoginDetails } from '@/hooks/useLoginDetails';
import type { LoginDetails } from '@/types/login';

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

// Error component
function ErrorState({ message }: { message: string }) {
  return (
    <div className="text-center py-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-800 mb-2">{message}</p>
        <p className="text-red-600">
          Please contact support at help@brilliantperspectives.com
        </p>
      </div>
    </div>
  );
}

// Success component
function SuccessState({ details }: { details: LoginDetails }) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Your Login Details</h2>
        <div className="space-y-3">
          <p className="text-blue-800">
            <strong>Email:</strong> {details.email}
          </p>
          <p className="text-blue-800">
            <strong>Password:</strong> {details.password}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Next Steps:</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Download the BrilliantPlus app</li>
          <li>Log in with your credentials above</li>
          <li>Complete your profile</li>
          <li>Start exploring our content!</li>
        </ol>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important:</h3>
        <p className="text-yellow-800">
          Please save your login credentials. You'll need these to access your account and all our premium content.
        </p>
      </div>
    </div>
  );
}

// Main content component that uses useSearchParams
function ThankYouContent() {
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get('subscriptionId');
  const { loginDetails, isLoading, error } = useLoginDetails(
    subscriptionId,
    '/api/webhook/monthly'
  );

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
                Thank you for becoming a Monthly Member. Your journey to making Kingdom normal starts now.
              </p>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                <p className="mt-4 text-gray-600">Setting up your account...</p>
                <p className="mt-2 text-sm text-gray-500">This may take a few moments.</p>
              </div>
            ) : error ? (
              <ErrorState message={error} />
            ) : loginDetails ? (
              <SuccessState details={loginDetails} />
            ) : (
              <ErrorState message="Unable to retrieve login details" />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Main page component with Suspense boundary
export default function MonthlyThankYou() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ThankYouContent />
    </Suspense>
  );
} 