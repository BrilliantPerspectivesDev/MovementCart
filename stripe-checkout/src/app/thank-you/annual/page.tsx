'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Loading component
function LoadingState() {
  return (
    <div className="min-h-screen bg-[#f9f5f0] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-gradient-to-r from-[#2A9D8F]/20 to-transparent rounded-full mix-blend-overlay blur-3xl opacity-40 transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[35rem] h-[35rem] bg-gradient-to-l from-[#E9C46A]/20 to-transparent rounded-full mix-blend-overlay blur-3xl opacity-30 transform translate-y-1/3"></div>
      </div>
      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#E9C46A] border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Getting everything ready for you...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Main content component
function ThankYouContent() {
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get('subscriptionId');

  return (
    <div className="min-h-screen bg-[#f9f5f0] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-gradient-to-r from-[#2A9D8F]/20 to-transparent rounded-full mix-blend-overlay blur-3xl opacity-40 transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[35rem] h-[35rem] bg-gradient-to-l from-[#E9C46A]/20 to-transparent rounded-full mix-blend-overlay blur-3xl opacity-30 transform translate-y-1/3"></div>
      </div>
      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            {/* Success Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#E9C46A]/10">
                <svg className="w-10 h-10 text-[#E9C46A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#264653] mb-4">
                Welcome to the Brilliant Movement!
              </h1>
              <p className="text-lg text-gray-600">
                We're so excited to have you join our community! Your subscription is all set up and ready to go.
              </p>
            </div>

            {/* Receipt Information */}
            <div className="bg-[#2A9D8F]/5 rounded-lg p-6 mb-8 border border-[#2A9D8F]/10">
              <h2 className="text-lg font-semibold text-[#2A9D8F] mb-4">Your Subscription Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subscription ID</span>
                  <span className="font-medium text-[#264653]">{subscriptionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-medium text-[#264653]">Annual Member</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium text-[#2A9D8F]">Active</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                We've sent you an email with your login credentials and next steps to get started.
              </p>
              <p className="text-sm text-gray-500">
                If you don't see the email within a few minutes, please check your spam folder or reach out to us at{' '}
                <a href="mailto:help@brilliantperspectives.com" className="text-[#2A9D8F] hover:text-[#264653] transition-colors">
                  help@brilliantperspectives.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Main page component with Suspense boundary
export default function ThankYou() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ThankYouContent />
    </Suspense>
  );
} 