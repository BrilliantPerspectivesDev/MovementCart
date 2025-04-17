'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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
    <div className="min-h-screen bg-gradient-to-b from-[#264653] to-[#2A9D8F]">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <p className="text-red-800 mb-2">{message}</p>
                <p className="text-red-600">
                  Please contact support at help@brilliantperspectives.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Main content component that uses useSearchParams
function AmbassadorDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get('subscriptionId');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!subscriptionId) {
      setError('No subscription ID found');
      return;
    }

    const fetchSubscriptionDetails = async () => {
      try {
        // Get the stored values from localStorage
        const isAmbassador = localStorage.getItem('isAmbassador') === 'true';
        const frequency = localStorage.getItem('selectedFrequency') || 'monthly';
        const ambassadorOnly = localStorage.getItem('ambassadorOnly') === 'true';
        
        // Route based on subscription type
        if (ambassadorOnly) {
          // This is an ambassador-only subscription (without a membership)
          router.push(`/thank-you/ambassador-only?subscriptionId=${subscriptionId}`);
        } else if (isAmbassador) {
          // This is a membership + ambassador subscription
          if (frequency === 'annual') {
            router.push(`/thank-you/annual-ambassador?subscriptionId=${subscriptionId}`);
          } else {
            router.push(`/thank-you/monthly-ambassador?subscriptionId=${subscriptionId}`);
          }
        } else {
          // This is a membership-only subscription
          if (frequency === 'annual') {
            router.push(`/thank-you/annual?subscriptionId=${subscriptionId}`);
          } else {
            router.push(`/thank-you/monthly?subscriptionId=${subscriptionId}`);
          }
        }
    } catch (err) {
        console.error('Error fetching subscription details:', err);
        setError('Unable to load subscription details. Please contact support.');
      }
    };

    fetchSubscriptionDetails();
  }, [subscriptionId, router]);

  if (error) {
    return <ErrorState message={error} />;
  }

  return null;
}

// Main page component with Suspense boundary
export default function AmbassadorDetails() {
  return (
    <Suspense fallback={<LoadingState />}>
      <AmbassadorDetailsContent />
    </Suspense>
  );
} 