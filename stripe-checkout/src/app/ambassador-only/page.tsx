'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * Ambassador-Only Page - Now redirects to BCP
 *
 * The affiliate checkout has moved to BCP (central.brilliantmovement.com)
 * which supports 8 countries instead of US-only.
 *
 * This page preserves the referral code from localStorage and redirects.
 */
export default function AmbassadorOnlyPage() {
  const redirectUrl = 'https://central.brilliantmovement.com/r/movement/affiliate';
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Auto-redirect after countdown
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = redirectUrl;
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
          Affiliate Signup Has Moved
        </h1>

        <p className="text-gray-600 mb-6">
          Our affiliate program now supports <strong>8 countries worldwide</strong>!
          You&apos;re being redirected to our new signup page.
        </p>

        {/* Countdown */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#74A78E]/10 text-[#74A78E]">
            <span className="text-2xl font-bold">{countdown}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Redirecting in {countdown} seconds...</p>
        </div>

        {/* Manual redirect button */}
        <a
          href={redirectUrl}
          className="inline-block w-full py-3 px-6 bg-[#74A78E] hover:bg-[#74A78E]/90 transition-colors text-white rounded-full font-medium"
        >
          Continue to Signup →
        </a>

        {/* Note about countries */}
        <p className="text-xs text-gray-400 mt-6">
          Now available in: USA, Canada, UK, Australia, South Africa, Ireland, Namibia, New Zealand
        </p>
      </div>
    </div>
  );
}
