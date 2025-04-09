'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AmbassadorAgreementModal from '../components/AmbassadorAgreementModal';
import PoliciesModal from '../components/PoliciesModal';
import { ambassadorOnlyMetadata, ambassadorSchema } from '../metadata';
import { Metadata } from 'next';

// Export the metadata for Next.js
export const metadata = ambassadorOnlyMetadata;

// Load Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// Country code mapping for common countries
const COUNTRY_OPTIONS = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  // Add more countries as needed
];

// US States
const US_STATE_OPTIONS = [
  { key: 'AL', abbr: 'AL', value: 'Alabama' },
  { key: 'AK', abbr: 'AK', value: 'Alaska' },
  { key: 'AZ', abbr: 'AZ', value: 'Arizona' },
  { key: 'AR', abbr: 'AR', value: 'Arkansas' },
  { key: 'CA', abbr: 'CA', value: 'California' },
  { key: 'CO', abbr: 'CO', value: 'Colorado' },
  { key: 'CT', abbr: 'CT', value: 'Connecticut' },
  { key: 'DE', abbr: 'DE', value: 'Delaware' },
  { key: 'FL', abbr: 'FL', value: 'Florida' },
  { key: 'GA', abbr: 'GA', value: 'Georgia' },
  { key: 'HI', abbr: 'HI', value: 'Hawaii' },
  { key: 'ID', abbr: 'ID', value: 'Idaho' },
  { key: 'IL', abbr: 'IL', value: 'Illinois' },
  { key: 'IN', abbr: 'IN', value: 'Indiana' },
  { key: 'IA', abbr: 'IA', value: 'Iowa' },
  { key: 'KS', abbr: 'KS', value: 'Kansas' },
  { key: 'KY', abbr: 'KY', value: 'Kentucky' },
  { key: 'LA', abbr: 'LA', value: 'Louisiana' },
  { key: 'ME', abbr: 'ME', value: 'Maine' },
  { key: 'MD', abbr: 'MD', value: 'Maryland' },
  { key: 'MA', abbr: 'MA', value: 'Massachusetts' },
  { key: 'MI', abbr: 'MI', value: 'Michigan' },
  { key: 'MN', abbr: 'MN', value: 'Minnesota' },
  { key: 'MS', abbr: 'MS', value: 'Mississippi' },
  { key: 'MO', abbr: 'MO', value: 'Missouri' },
  { key: 'MT', abbr: 'MT', value: 'Montana' },
  { key: 'NE', abbr: 'NE', value: 'Nebraska' },
  { key: 'NV', abbr: 'NV', value: 'Nevada' },
  { key: 'NH', abbr: 'NH', value: 'New Hampshire' },
  { key: 'NJ', abbr: 'NJ', value: 'New Jersey' },
  { key: 'NM', abbr: 'NM', value: 'New Mexico' },
  { key: 'NY', abbr: 'NY', value: 'New York' },
  { key: 'NC', abbr: 'NC', value: 'North Carolina' },
  { key: 'ND', abbr: 'ND', value: 'North Dakota' },
  { key: 'OH', abbr: 'OH', value: 'Ohio' },
  { key: 'OK', abbr: 'OK', value: 'Oklahoma' },
  { key: 'OR', abbr: 'OR', value: 'Oregon' },
  { key: 'PA', abbr: 'PA', value: 'Pennsylvania' },
  { key: 'RI', abbr: 'RI', value: 'Rhode Island' },
  { key: 'SC', abbr: 'SC', value: 'South Carolina' },
  { key: 'SD', abbr: 'SD', value: 'South Dakota' },
  { key: 'TN', abbr: 'TN', value: 'Tennessee' },
  { key: 'TX', abbr: 'TX', value: 'Texas' },
  { key: 'UT', abbr: 'UT', value: 'Utah' },
  { key: 'VT', abbr: 'VT', value: 'Vermont' },
  { key: 'VA', abbr: 'VA', value: 'Virginia' },
  { key: 'WA', abbr: 'WA', value: 'Washington' },
  { key: 'WV', abbr: 'WV', value: 'West Virginia' },
  { key: 'WI', abbr: 'WI', value: 'Wisconsin' },
  { key: 'WY', abbr: 'WY', value: 'Wyoming' },
];

// Inner form component with Stripe hooks
function AmbassadorOnlyForm() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    agreedToAmbassadorAgreement: false,
    agreedToPolicies: false
  });
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToAmbassador, setAgreeToAmbassador] = useState(false);
  const [agreeToPolicies, setAgreeToPolicies] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [showAmbassadorAgreementModal, setShowAmbassadorAgreementModal] = useState(false);
  const [showPoliciesModal, setShowPoliciesModal] = useState(false);
  const [pathParam, setPathParam] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  
  // Get referral code from URL or localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('ref') || '';
    if (code) {
      localStorage.setItem('pathParam', code);
    }
    
    const storedPathParam = localStorage.getItem('pathParam') || '';
    setPathParam(storedPathParam);
  }, []);
  
  // Validate form
  useEffect(() => {
    const isFormValid = 
      formData.firstName.trim() !== '' && 
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.address.trim() !== '' &&
      formData.city.trim() !== '' &&
      formData.state.trim() !== '' &&
      formData.zipCode.trim() !== '' &&
      formData.country.trim() !== '' &&
      agreeToTerms &&
      cardComplete &&
      agreeToAmbassador &&
      agreeToPolicies;
    
    setFormValid(isFormValid);
  }, [formData, agreeToTerms, cardComplete, agreeToAmbassador, agreeToPolicies]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCardChange = (event: any) => {
    setCardComplete(event.complete);
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements || !formValid || isLoading) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Create payment method
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }
      
      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          address: {
            line1: formData.address,
            city: formData.city,
            state: formData.state,
            postal_code: formData.zipCode,
            country: formData.country,
          },
          phone: formData.phone
        },
      });
      
      if (pmError) {
        throw pmError;
      }
      
      // Create ambassador-only subscription
      const response = await fetch('/api/ambassador-only-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerInfo: formData,
          paymentMethodId: paymentMethod.id,
          pathParam: pathParam,
          marketingConsent: marketingConsent
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to process payment');
      }
      
      // Confirm payment if needed
      if (data.paymentIntentSecret) {
        const { error: confirmError } = await stripe.confirmCardPayment(data.paymentIntentSecret);
        if (confirmError) {
          throw new Error(`Failed to confirm payment: ${confirmError.message}`);
        }
      }
      
      // Redirect to success page
      router.push(`/ambassador-details?subscriptionId=${data.subscriptionId}`);
      
    } catch (error: any) {
      console.error('Payment error:', error);
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="(123) 456-7890"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State/Province
            </label>
            {formData.country === 'US' ? (
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a state</option>
                {US_STATE_OPTIONS.map(state => (
                  <option key={state.key} value={state.abbr}>
                    {state.value}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a country</option>
              {COUNTRY_OPTIONS.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Ambassador Agreement */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-[#2A9D8F] font-semibold mb-2">Ambassador Fee: $10.00/year</h3>
          <p className="text-sm text-gray-700 mb-2">
            Becoming a Brilliant ambassador allows you to earn commissions by referring others. You'll receive:
          </p>
          <ul className="list-disc pl-5 text-sm text-gray-700 mb-4">
            <li>A unique referral code to share</li>
            <li>Commission on successful referrals</li>
            <li>Tools and resources to help you share</li>
            <li>Access to the ambassador community</li>
          </ul>
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> This is only the ambassador program fee. You'll need to separately purchase a Brilliant membership to access content.
          </p>
        </div>
        
        {/* Credit Card Input */}
        <div>
          <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 mb-1">
            Credit Card
          </label>
          <div className="p-3 border border-gray-300 rounded-md shadow-sm">
            <CardElement
              id="card-element"
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
              onChange={handleCardChange}
            />
          </div>
        </div>
        
        {/* Terms and Agreements */}
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-700">
                I agree to the Terms of Service and give permission to receive communications
              </label>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="marketing" className="font-medium text-gray-700">
                I agree to receive marketing communications (optional)
              </label>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={formData.agreedToAmbassadorAgreement}
                onChange={() => {}}
                onClick={(e) => {
                  e.preventDefault();
                  setShowAmbassadorAgreementModal(true);
                }}
                className="h-4 w-4 rounded border-gray-300 text-[#2A9D8F] focus:ring-[#2A9D8F] cursor-pointer"
              />
            </div>
            <div className="ml-3 text-sm">
              <p>
                I have read and agree to the{' '}
                <button
                  type="button"
                  onClick={() => setShowAmbassadorAgreementModal(true)}
                  className="font-medium text-[#2A9D8F] hover:text-[#2A9D8F]/80 underline"
                >
                  Ambassador Agreement
                </button>
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={formData.agreedToPolicies}
                onChange={() => {}}
                onClick={(e) => {
                  e.preventDefault();
                  setShowPoliciesModal(true);
                }}
                className="h-4 w-4 rounded border-gray-300 text-[#2A9D8F] focus:ring-[#2A9D8F] cursor-pointer"
              />
            </div>
            <div className="ml-3 text-sm">
              <p>
                I have read and agree to the{' '}
                <button
                  type="button"
                  onClick={() => setShowPoliciesModal(true)}
                  className="font-medium text-[#2A9D8F] hover:text-[#2A9D8F]/80 underline"
                >
                  Policies and Procedures
                </button>
              </p>
            </div>
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="text-red-600 text-sm p-2 bg-red-50 rounded">
            {error}
          </div>
        )}
      </div>
      
      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !formValid}
        className={`w-full py-3 px-4 rounded-md shadow-sm text-base font-medium text-white 
          ${isLoading || !formValid 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-[#2A9D8F] hover:bg-[#238276]"}`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : "Become an Ambassador ($10/year)"}
      </button>
      
      {/* Security Info */}
      <div className="flex justify-center space-x-4 mt-2">
        <div className="flex items-center">
          <svg className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-xs text-gray-500">Secure Payment</span>
        </div>
        <div className="flex items-center">
          <span className="text-xs text-gray-500">Cancel Anytime</span>
        </div>
      </div>
      
      {/* Modals */}
      <AmbassadorAgreementModal
        isOpen={showAmbassadorAgreementModal}
        onClose={() => setShowAmbassadorAgreementModal(false)}
        onAccept={() => {
          setAgreeToAmbassador(true);
          setFormData(prevData => ({
            ...prevData,
            agreedToAmbassadorAgreement: true
          }));
        }}
        onDecline={() => setAgreeToAmbassador(false)}
      />
      
      <PoliciesModal
        isOpen={showPoliciesModal}
        onClose={() => setShowPoliciesModal(false)}
        onAccept={() => {
          setAgreeToPolicies(true);
          setFormData(prevData => ({
            ...prevData,
            agreedToPolicies: true
          }));
        }}
        onDecline={() => setAgreeToPolicies(false)}
      />
    </form>
  );
}

// Main component
export default function AmbassadorOnlyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 p-4 md:p-8 lg:p-12 max-w-4xl mx-auto">
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
          
          <div className="mb-8 flex justify-center">
            <Image
              src="/Blacklogo.png" 
              alt="Brilliant Logo" 
              width={180}
              height={60} 
              className="h-auto w-auto"
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
                Become a Brilliant Ambassador
              </h1>
              <p className="text-gray-600 text-center mb-6">
                Join our ambassador program and earn commissions by sharing Brilliant with others.
              </p>
              
              <div className="bg-[#F8F9FF] rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Ambassador Program Fee</h3>
                    <p className="text-gray-600">Annual subscription</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">$10<span className="text-base font-normal text-gray-500">/year</span></p>
                  </div>
                </div>
              </div>
              
              <Elements stripe={stripePromise}>
                <AmbassadorOnlyForm />
              </Elements>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>
              Already have a Brilliant membership?{' '}
              <a href="/checkout" className="text-[#2A9D8F] hover:underline">
                Go to regular checkout
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 