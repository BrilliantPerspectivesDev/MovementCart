'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

// Loading component
function LoadingState() {
  return (
    <div className="min-h-screen bg-[#f9f5f0] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#E9C46A] border-r-transparent"></div>
        <p className="mt-4 text-gray-600">Getting everything ready for you...</p>
      </div>
    </div>
  );
}

// Main content component
function ThankYouContent() {
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get('subscriptionId');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => {
    setCurrentStep(prev => (prev < totalSteps ? prev + 1 : prev));
  };

  const prevStep = () => {
    setCurrentStep(prev => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Left Section (Thank You Information) */}
        <div className="flex-1 md:w-3/5 bg-white p-4 md:p-8 lg:p-12 overflow-auto">
          <div className="max-w-lg mx-auto">
            {/* Back button */}
            <div className="mb-4">
              <a 
                href="/" 
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to main page</span>
              </a>
            </div>
            
            {/* Logo */}
            <div className="mb-6 md:mb-8">
              <Image
                src="/Blacklogo.png" 
                alt="Brilliant Logo" 
                width={180}
                height={60} 
                className="h-auto w-auto"
              />
            </div>
            
            {/* Success Icon */}
            <div className="mb-6 flex justify-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#2A9D8F]/10">
                <svg className="w-10 h-10 text-[#2A9D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-[#264653] mb-4">
                Welcome to the Brilliant Movement!
              </h1>
              <p className="text-gray-600 mb-2">
                We're so excited to have you join as a member and ambassador! Your subscription is all set up and ready to go.
              </p>
            </div>

            {/* Receipt Information */}
            <div className="bg-[#2A9D8F]/5 rounded-lg p-6 mb-6 border border-[#2A9D8F]/10">
              <h2 className="text-lg font-semibold text-[#2A9D8F] mb-4">Your Subscription Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-medium text-[#264653]">Annual Member + Ambassador</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium text-[#2A9D8F]">Active</span>
                </div>
              </div>
            </div>

            {/* Email Troubleshooting Information - Now as a Carousel */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6 border border-blue-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-blue-700">Getting Started</h2>
                <div className="text-sm text-gray-500">Step {currentStep} of {totalSteps}</div>
              </div>
              
              <div className="relative overflow-hidden">
                {/* Step 1: Finding Your Confirmation Email */}
                <div 
                  className={`transition-all duration-300 ${
                    currentStep === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full absolute'
                  }`}
                >
                  <div className="space-y-4 text-gray-700">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mr-3">1</div>
                      <h3 className="font-semibold text-blue-900">Finding Your Confirmation Email</h3>
                    </div>
                    
                    <p>We've sent you an email with your login credentials and next steps to get started.</p>
                    <p className="font-medium">If you can't find the email:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Check your junk or spam folders</li>
                      <li>Search your email for <span className="font-medium">help@brilliantperspectives.com</span></li>
                      <li>It may take some time. <span className="font-bold">Your confirmation email could take up to an hour to arrive</span></li>
                    </ul>
                    <p>If you have tried all that and still do not see any email, please reach out! Our support team can help you get access or provide details:</p>
                    <div className="mt-2">
                      <a href="mailto:help@brilliantperspectives.com" className="text-[#2A9D8F] hover:text-[#2A9D8F]/80 font-medium">
                        help@brilliantperspectives.com
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Step 2: App Download & Login */}
                <div 
                  className={`transition-all duration-300 ${
                    currentStep === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute'
                  }`}
                >
                  <div className="space-y-4 text-gray-700">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mr-3">2</div>
                      <h3 className="font-semibold text-blue-900">Download The App & Login</h3>
                    </div>
                    
                    <p>Once you have your login credentials:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Download the Brilliant Plus app from your app store</li>
                      <li>Open the app and click "Sign In"</li>
                      <li>Enter the email and password from your confirmation email</li>
                      <li>You'll now have full access to all member content!</li>
                    </ul>
                  </div>
                </div>
                
                {/* Step 3: Brilliant Communities */}
                <div 
                  className={`transition-all duration-300 ${
                    currentStep === 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute'
                  }`}
                >
                  <div className="space-y-4 text-gray-700">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mr-3">3</div>
                      <h3 className="font-semibold text-blue-900">Access Brilliant Communities</h3>
                    </div>
                    
                    <p>Brilliant Communities can be accessed on the web or on your mobile device as well. You can find it on your App or Play store by searching "Brilliant Communities".</p>
                    
                    <p>Brilliant Communities is where you will find Brilliant small groups, monthly gathering replays, and your Brilliant Movement community!</p>
                    
                    <p>To access on a web browser, visit <a href="https://www.brilliant.community" target="_blank" rel="noopener noreferrer" className="text-[#2A9D8F] hover:text-[#2A9D8F]/80 font-medium">www.brilliant.community</a></p>
                    
                    <p>To sign in, use the email address you registered with and the password from your confirmation email.</p>
                  </div>
                </div>
              </div>
              
              {/* Carousel Controls */}
              <div className="flex justify-between items-center mt-6">
                <button 
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center px-3 py-1 rounded ${
                    currentStep === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                
                <div className="flex space-x-2">
                  {Array.from({length: totalSteps}).map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setCurrentStep(index + 1)}
                      className={`w-2.5 h-2.5 rounded-full ${
                        currentStep === index + 1 ? 'bg-blue-600' : 'bg-blue-200'
                      }`}
                      aria-label={`Go to step ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={nextStep}
                  disabled={currentStep === totalSteps}
                  className={`flex items-center px-3 py-1 rounded ${
                    currentStep === totalSteps 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  Next
                  <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Section (Image) */}
        <div className="hidden lg:block w-full xl:w-2/5 relative overflow-hidden">
          {/* Gradient Background with Animation */}
          <div 
            className="absolute inset-0 w-full h-full z-0"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden'
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                backgroundImage: 'url(/gradients/gradient1.jpg)',
                backgroundSize: 'cover',
                animation: 'fadeInOut 20s infinite 0s',
                zIndex: 10,
              }}
            />
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                backgroundImage: 'url(/gradients/gradient2.jpg)',
                backgroundSize: 'cover',
                animation: 'fadeInOut 20s infinite 5s',
                zIndex: 10,
              }}
            />
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                backgroundImage: 'url(/gradients/gradient3.jpg)',
                backgroundSize: 'cover',
                animation: 'fadeInOut 20s infinite 10s',
                zIndex: 10,
              }}
            />
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                backgroundImage: 'url(/gradients/gradient4.jpg)',
                backgroundSize: 'cover',
                animation: 'fadeInOut 20s infinite 15s',
                zIndex: 10,
              }}
            />
            <style jsx>{`
              @keyframes fadeInOut {
                0% { opacity: 0; }
                5% { opacity: 0; }
                15% { opacity: 1; }
                45% { opacity: 1; }
                55% { opacity: 0; }
                100% { opacity: 0; }
              }
            `}</style>
          </div>

          {/* Semi-transparent panel */}
          <div className="relative z-20 h-full w-full p-8 sm:p-12 text-white flex flex-col justify-between">
            <div className="bg-black/30 rounded-2xl p-6 backdrop-blur-md">
              <h2 className="text-2xl font-bold mb-4">Your Ambassador Journey Begins</h2>
              
              <div className="mb-8">
                <div className="font-semibold text-lg mb-2">What's next:</div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-3 text-green-300">✓</span>
                    <span>Check your email for your login details</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-green-300">✓</span>
                    <span>Download the Brilliant Plus app</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-green-300">✓</span>
                    <span>Access your Ambassador dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-green-300">✓</span>
                    <span>Get your unique referral link</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 text-green-300">✓</span>
                    <span>Start sharing and earning</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-sm opacity-90 italic">
                "Being an ambassador has allowed me to share this movement with others while supporting my own journey."
                <div className="mt-2 font-semibold not-italic">— Michael J.</div>
              </div>
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