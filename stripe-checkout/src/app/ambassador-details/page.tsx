'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AmbassadorDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get('subscriptionId');
  const frequency = searchParams.get('frequency');
  const isAmbassador = searchParams.get('isAmbassador') === 'true';

  useEffect(() => {
    if (!subscriptionId) return;

    // Route to the appropriate thank you page based on subscription type
    if (isAmbassador) {
      if (frequency === 'annual') {
        router.push(`/thank-you/annual-ambassador?subscriptionId=${subscriptionId}`);
      } else {
        router.push(`/thank-you/monthly-ambassador?subscriptionId=${subscriptionId}`);
      }
    } else {
      if (frequency === 'annual') {
        router.push(`/thank-you/annual?subscriptionId=${subscriptionId}`);
      } else {
        router.push(`/thank-you/monthly?subscriptionId=${subscriptionId}`);
      }
    }
  }, [subscriptionId, frequency, isAmbassador, router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em]"></div>
        <p className="mt-4 text-gray-600">Redirecting to your personalized welcome page...</p>
      </div>
    </div>
  );
} 