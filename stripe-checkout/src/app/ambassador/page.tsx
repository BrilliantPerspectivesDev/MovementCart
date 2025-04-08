'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Ambassador landing page
export default function AmbassadorPage() {
  return (
    <main className="min-h-screen bg-[#f9f5f0]">
      {/* Hero Header Container - With rounded corners on all sides */}
      <div className="w-[80%] mx-auto rounded-[2rem] overflow-hidden relative mt-32 mb-16" style={{ height: 'calc(75vh)' }}>
        {/* Background Image - Covers the entire container */}
        <div className="absolute inset-0 z-0">
          {/* Added left-to-right black gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
          <Image
            src="/Brilliant Gradient Pack-05 Large.jpeg"
            alt="Brilliant gradient background"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        </div>

        {/* Content Container */}
        <div className="relative z-20 h-full flex flex-col">
          {/* Text and Interactive Elements - In a centered column */}
          <div className="p-6 md:p-10 flex flex-col justify-center h-full max-w-3xl mx-auto md:mx-10">
            <div className="space-y-6 md:space-y-8">
              {/* Category Label */}
              <p className="text-[#F5F5F0] text-sm tracking-[0.05em] uppercase font-medium">
                GROWTH • IMPACT • INCOME
              </p>
              
              {/* Primary Headline - Now Much Bigger */}
              <h1 className="text-[#F5F5F0] text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium font-serif leading-[1.05] tracking-tight max-w-2xl">
                Become an<br />Ambassador
              </h1>
              
              {/* Subheadline */}
              <p className="text-[#F5F5F0]/90 text-base md:text-lg max-w-xl leading-relaxed">
                Join the Brilliant Ambassador program and share the movement while growing your impact and income.
              </p>
              
              {/* CTA Button - Replacing email signup */}
              <div className="mt-8">
                <Link 
                  href="/checkout" 
                  className="inline-flex items-center px-8 py-4 border border-transparent rounded-full text-base font-medium bg-[#E9C46A] text-[#264653] hover:bg-[#e6bd58] transition-all shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-0"
                  onClick={() => localStorage.setItem('fromAmbassadorPage', 'true')}
                >
                  BECOME AN AMBASSADOR
                  <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ambassador Benefits Section */}
      <div className="bg-white py-16 sm:py-24 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
            {/* Left Column - Big Headline */}
            <div>
              <h2 className="text-4xl sm:text-5xl font-medium font-serif tracking-tight text-[#264653] leading-tight">
                Grow your impact while sharing what you love
              </h2>
              <div className="mt-8">
                <Link 
                  href="/checkout" 
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-[#264653] bg-[#E9C46A] hover:bg-[#e6bd58] transition-colors"
                  onClick={() => localStorage.setItem('fromAmbassadorPage', 'true')}
                >
                  BECOME AN AMBASSADOR
                  <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Column - Descriptive Text */}
            <div className="space-y-6 text-base text-gray-600">
              <p className="text-2xl text-gray-800 font-medium">
                As a Brilliant Ambassador, you'll share in the growth of the movement while receiving special training and benefits.
              </p>
              
              <p>
                For just $10 per year added to your membership, you can become an Ambassador and unlock a suite of exclusive benefits designed to help you share Brilliant with others while growing your impact and income.
              </p>
              
              <p>
                The Ambassador program includes:
              </p>
              
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide a 5-day free trial link to the BrilliantPlus app</li>
                <li>Share in a portion of the membership fee when people join</li>
                <li>Receive Ambassador-only monthly training</li>
                <li>Get your own Brilliant Debit Card to access your funds</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#222222] text-white py-8">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between">
            {/* Logo and copyright */}
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-2">Brilliant Perspectives LLC</h2>
              <p className="text-gray-400 text-sm">
                © 2025 Brilliant Perspectives LLC. All rights reserved.
              </p>
            </div>
            
            {/* Contact info */}
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p className="text-gray-400">
                <a href="mailto:help@brilliantperspectives.com" className="hover:text-white transition-colors duration-200">
                  help@brilliantperspectives.com
                </a>
              </p>
              <p className="text-gray-400">Voicemail: (800) 351-7541</p>
              <p className="text-gray-400">
                735 State St. #517<br />
                Santa Barbara, CA 93101
              </p>
            </div>
          </div>
          
          {/* Bottom bar */}
          <div className="mt-8 pt-4 border-t border-gray-700 text-center">
            <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-8">
              <a 
                href="https://brilliantperspectives.clickfunnels.com/optincxp26vyu" 
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </a>
              <a 
                href="https://brilliantperspectives.clickfunnels.com/optinlhu0kk20" 
                className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
} 