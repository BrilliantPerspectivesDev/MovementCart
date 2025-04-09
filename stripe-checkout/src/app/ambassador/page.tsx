'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Ambassador landing page
export default function AmbassadorPage() {
  return (
    <main className="min-h-screen bg-[#f9f5f0] pt-12">
      {/* Hero Header */}
      <div className="w-[90%] sm:w-[85%] mx-auto relative max-w-7xl py-8 sm:py-12 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 bg-[#F6F5F2] rounded-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-center mx-auto max-w-5xl px-[18px] sm:px-[37px]">
          {/* Left Content - Text and CTA */}
          <div className="flex flex-col lg:w-[45%] space-y-4 text-left">
            <p className="uppercase text-sm font-semibold tracking-wider text-[#264653]">GROWTH • IMPACT • INCOME</p>
            <h1 className="text-[3.4034rem] sm:text-[3.64rem] md:text-[3.9rem] font-bold text-black leading-[1.1] tracking-[-0.03em] mb-3">
              Become an<br />
              Ambassador
            </h1>
            <p className="text-base text-gray-700 mb-8">
              Join the Brilliant Ambassador program and share the movement while growing your impact and income.
            </p>

            {/* CTA Button */}
            <div className="w-full mt-2">
              <Link 
                href="/checkout" 
                className="block w-full text-center py-4 px-8 bg-[#74A78E] hover:bg-[#74A78E]/90 transition-colors text-white rounded-full font-medium"
                onClick={() => localStorage.setItem('fromAmbassadorPage', 'true')}
              >
                <div className="flex flex-col items-center">
                  <span>BECOME AN AMBASSADOR</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative lg:w-[55%] mt-6 lg:mt-0">
            <div className="aspect-square relative rounded-xl overflow-hidden w-[90%] mx-auto">
              <Image 
                src="/Brilliant Gradient Pack-05 Large.jpeg" 
                alt="Brilliant gradient background" 
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ambassador Benefits Section */}
      <div className="bg-white py-16 sm:py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto px-0 sm:px-8 lg:px-12">
          <div className="flex flex-wrap -mx-4">
            {/* Left Column - Big Headline */}
            <div className="w-full lg:w-1/2 px-4 mb-10 lg:mb-0">
              <div className="flex flex-col h-full">
                <span className="text-[#74A78E] font-semibold text-sm uppercase tracking-wide mb-2 inline-block">JOIN OUR COMMUNITY</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mt-2 mb-6">
                  Grow your impact while sharing what you love
                </h2>
                <div className="mt-8 lg:mt-auto">
                  <Link 
                    href="/checkout" 
                    className="inline-block py-3 px-8 bg-[#74A78E] hover:bg-[#74A78E]/90 transition-colors text-white rounded-full font-medium"
                    onClick={() => localStorage.setItem('fromAmbassadorPage', 'true')}
                  >
                    Become an Ambassador
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Descriptive Text */}
            <div className="w-full lg:w-1/2 px-4">
              <div className="flex flex-col h-full space-y-6 text-base text-gray-700">
                <p className="text-xl font-medium text-gray-800">
                  As a Brilliant Ambassador, you'll share in the growth of the movement while receiving special training and benefits.
                </p>
                
                <p>
                  For just $10 per year added to your membership, you can become an Ambassador and unlock a suite of exclusive benefits designed to help you share Brilliant with others while growing your impact and income.
                </p>
                
                <p className="font-medium">
                  The Ambassador program includes:
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#74A78E] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Provide a 5-day free trial link to the BrilliantPlus app</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#74A78E] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Share in a portion of the membership fee when people join</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#74A78E] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Receive Ambassador-only monthly training</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-[#74A78E] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Get your own Brilliant Debit Card to access your funds</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#264653] text-white py-12">
        <div className="w-full max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between">
            {/* Logo and copyright */}
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-2">Brilliant Perspectives LLC</h2>
              <p className="text-gray-300 text-sm">
                © 2025 Brilliant Perspectives LLC. All rights reserved.
              </p>
            </div>
            
            {/* Contact info */}
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p className="text-gray-300">
                <a href="mailto:help@brilliantperspectives.com" className="hover:text-white transition-colors duration-200">
                  help@brilliantperspectives.com
                </a>
              </p>
              <p className="text-gray-300">Voicemail: (800) 351-7541</p>
              <p className="text-gray-300">
                735 State St. #517<br />
                Santa Barbara, CA 93101
              </p>
            </div>
          </div>
          
          {/* Bottom bar */}
          <div className="mt-8 pt-4 border-t border-gray-500 text-center">
            <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-8">
              <a 
                href="https://brilliantperspectives.clickfunnels.com/optincxp26vyu" 
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </a>
              <a 
                href="https://brilliantperspectives.clickfunnels.com/optinlhu0kk20" 
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
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