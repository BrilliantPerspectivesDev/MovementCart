'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Loading component for suspense fallback
function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <header className="w-full py-4 px-4 md:px-8 bg-white shadow-sm">
        <div className="container mx-auto max-w-7xl flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="text-sm text-gray-600">
            Ambassador Registration
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto max-w-3xl px-4 py-8 md:py-12 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </main>
    </div>
  );
}

// Content component that uses useSearchParams
function AmbassadorDetailsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get('subscriptionId');

  const [formData, setFormData] = useState({
    phoneNumber: '',
    socialMedia: '',
    referralSource: '',
    experience: '',
    goals: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    phoneNumber: '',
    socialMedia: '',
    referralSource: '',
    experience: '',
    goals: '',
  });

  useEffect(() => {
    // Verify we have a subscription ID
    if (!subscriptionId) {
      setError('Invalid access. Please complete checkout first.');
    }
  }, [subscriptionId]);

  const validateForm = () => {
    const errors = {
      phoneNumber: '',
      socialMedia: '',
      referralSource: '',
      experience: '',
      goals: '',
    };
    let isValid = true;

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
      isValid = false;
    }

    if (!formData.goals.trim()) {
      errors.goals = 'Please share your goals as an ambassador';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, you would send this data to your backend
      console.log('Submitting ambassador details:', {
        subscriptionId,
        ...formData
      });
      
      // Show success message and redirect after delay
      setShowSuccess(true);
      setTimeout(() => {
        router.push(`/success?subscriptionId=${subscriptionId}&isAmbassador=true`);
      }, 2000);
    } catch (err) {
      console.error('Error submitting ambassador details:', err);
      setError('Failed to submit your details. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="w-full py-4 px-4 md:px-8 bg-white shadow-sm">
        <div className="container mx-auto max-w-7xl flex justify-between items-center">
          <div className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Brilliant logo" 
              width={120} 
              height={30} 
              className="h-8 w-auto"
            />
          </div>
          <div className="text-sm text-gray-600">
            Ambassador Registration
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto max-w-3xl px-4 py-8 md:py-12">
        {error && !error.includes('Invalid access') ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        ) : null}

        {error && error.includes('Invalid access') ? (
          <div className="bg-white shadow-md rounded-lg p-6 md:p-8 text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              {error}
            </h2>
            <p className="mb-6 text-gray-600">
              Please return to the checkout page to complete your purchase first.
            </p>
            <Link href="/checkout" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors">
              Return to Checkout
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 md:py-5">
              <h1 className="text-xl md:text-2xl font-bold text-white">
                Complete Your Ambassador Registration
              </h1>
              <p className="text-blue-100 mt-1">
                Help us get to know you better and set up your ambassador account
              </p>
            </div>

            {showSuccess ? (
              <div className="p-6 md:p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Registration Successful!
                </h2>
                <p className="text-gray-600 mb-1">
                  Thank you for joining our Ambassador Program.
                </p>
                <p className="text-gray-500 text-sm">
                  Redirecting you to the success page...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${validationErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter your phone number"
                    />
                    {validationErrors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.phoneNumber}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="socialMedia" className="block text-sm font-medium text-gray-700 mb-1">
                      Social Media Profiles
                    </label>
                    <input
                      type="text"
                      id="socialMedia"
                      name="socialMedia"
                      value={formData.socialMedia}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Instagram, Twitter, LinkedIn, etc."
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Share any social media accounts where you plan to promote our service
                    </p>
                  </div>

                  <div>
                    <label htmlFor="referralSource" className="block text-sm font-medium text-gray-700 mb-1">
                      How did you hear about our Ambassador Program?
                    </label>
                    <select
                      id="referralSource"
                      name="referralSource"
                      value={formData.referralSource}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="friend">From a friend</option>
                      <option value="social">Social media</option>
                      <option value="email">Email newsletter</option>
                      <option value="website">Our website</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                      Previous Experience as an Ambassador or Influencer
                    </label>
                    <textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Share any relevant experience you have"
                    />
                  </div>

                  <div>
                    <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Goals as an Ambassador <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="goals"
                      name="goals"
                      value={formData.goals}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${validationErrors.goals ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="What do you hope to achieve as an ambassador for our brand?"
                    />
                    {validationErrors.goals && (
                      <p className="mt-1 text-sm text-red-600">{validationErrors.goals}</p>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Ambassador Benefits</h3>
                  <ul className="text-sm text-blue-700 space-y-1 pl-5 list-disc">
                    <li>Earn 20% commission on all referrals</li>
                    <li>Exclusive access to ambassador-only resources</li>
                    <li>Early access to new features and products</li>
                    <li>Monthly ambassador newsletter with tips and updates</li>
                  </ul>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2 rounded-md text-white font-medium transition-colors ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing
                      </span>
                    ) : (
                      'Complete Registration'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
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
export default function AmbassadorDetailsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AmbassadorDetailsContent />
    </Suspense>
  );
} 