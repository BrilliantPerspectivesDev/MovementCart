'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from './context/CartContext';
import { useCheckout } from './hooks/useCheckout';
import { products } from './data/products';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe, StripeCardElementChangeEvent, StripeCardElement } from '@stripe/stripe-js';
import { CustomerInfo } from './types';
import { useGooglePlacesAutocomplete } from './hooks/useGooglePlacesAutocomplete';
import { parseAddressComponents } from './utils/addressParser';

// Load Stripe outside of component to avoid recreating it on renders
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// Country code mapping for common countries
const COUNTRY_OPTIONS = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
  { code: 'IN', name: 'India' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'ES', name: 'Spain' },
  { code: 'IT', name: 'Italy' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'CH', name: 'Switzerland' },
];

// FormData interface for the checkout form
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string; // This will now hold the 2-letter country code
}

// Inner form component that has access to Stripe hooks
function CheckoutForm({ 
  selectedFrequency,
  isAmbassador,
  setIsAmbassador
}: { 
  selectedFrequency: string,
  isAmbassador: boolean,
  setIsAmbassador: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { items } = useCart();
  const { initiateCheckout, isLoading: checkoutLoading, error: checkoutError } = useCheckout();
  const stripe = useStripe();
  const elements = useElements();
  const pathname = usePathname();
  
  // Add loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardElementReady, setCardElementReady] = useState(false);
  
  // Get stored referral code from localStorage
  const [storedPathParam, setStoredPathParam] = useState<string>('');
  const [storedAffiliateCode, setStoredAffiliateCode] = useState<string>('');
  
  // Add state for modal visibility
  const [showAmbassadorModal, setShowAmbassadorModal] = useState(false);
  
  useEffect(() => {
    // Get the stored path param from localStorage
    const pathParam = localStorage.getItem('pathParam');
    const affiliateCode = localStorage.getItem('affiliateCode');
    
    if (pathParam) {
      console.log('Retrieved stored path param:', pathParam);
      setStoredPathParam(pathParam);
    } else {
      console.log('No path param found in localStorage');
    }
    
    if (affiliateCode) {
      console.log('Retrieved stored affiliate code:', affiliateCode);
      setStoredAffiliateCode(affiliateCode);
    } else {
      console.log('No affiliate code found in localStorage');
    }
  }, []);

  // Add effect to check if Stripe is loaded
  useEffect(() => {
    if (!stripe || !elements) {
      console.log('Stripe.js has not yet loaded.');
      return;
    }
  }, [stripe, elements]);

  // Define getPriceInfo function
  const getPriceInfo = (frequency: string) => {
    if (frequency === 'monthly') {
      return {
        frequency: 'monthly',
        price: 47,
        discountPrice: 47,
        dailyPrice: (47 / 30).toFixed(2),
        savingsPercent: 0,
        totalPrice: 47,
        trialDays: 5
      };
    } else {
      // Calculate savings compared to monthly
      const annualCost = 397;
      const monthlyCostForYear = 47 * 12;
      const savings = monthlyCostForYear - annualCost;
      const savingsPercent = Math.round((savings / monthlyCostForYear) * 100);
      
      return {
        frequency: 'annual',
        price: monthlyCostForYear,
        discountPrice: annualCost,
        dailyPrice: (annualCost / 365).toFixed(2),
        savingsPercent: savingsPercent,
        totalPrice: annualCost,
        trialDays: 5
      };
    }
  };
  
  // Form state
  const [priceInfo, setPriceInfo] = useState(() => getPriceInfo(selectedFrequency));
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US'
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [step1Valid, setStep1Valid] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  
  // Features data for carousel
  const features = [
    {
      title: "Relational routines",
      description: "Mini teachings and guided sessions to practice being with God"
    },
    {
      title: "Library of over 600 teachings",
      description: "Meditations, prayers and more from Graham Cooke"
    },
    {
      title: "Multi-day challenges",
      description: "Unpacking teaching series for deeper understanding"
    },
    {
      title: "Restful sleep content",
      description: "Prayers and music to help you rest in God's presence"
    }
  ];
  
  // Auto-rotate carousel
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentFeatureIndex((prevIndex) => 
        prevIndex === features.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change slide every 4 seconds
    
    return () => clearInterval(intervalId);
  }, [features.length]);

  // Update priceInfo when selectedFrequency changes
  useEffect(() => {
    setPriceInfo(getPriceInfo(selectedFrequency));
  }, [selectedFrequency]);

  // Check if form step 1 is valid
  useEffect(() => {
    setStep1Valid(
      formData.firstName.trim() !== '' && 
      formData.lastName.trim() !== '' && 
      formData.email.trim() !== '' &&
      formData.streetAddress.trim() !== '' &&
      formData.city.trim() !== '' &&
      formData.state.trim() !== '' &&
      formData.postalCode.trim() !== '' &&
      formData.country.trim() !== ''
    );
  }, [formData]);

  // Check if entire form is valid
  useEffect(() => {
    setFormValid(
      step1Valid &&
      agreeToTerms &&
      cardComplete
    );
  }, [step1Valid, agreeToTerms, cardComplete]);

  // Save URL path parameter to localStorage
  useEffect(() => {
    if (pathname && pathname.length > 1) {
      // Remove the first slash and save the rest to localStorage
      const pathParam = pathname.substring(1);
      localStorage.setItem('pathParam', pathParam);
      console.log('Saved to localStorage:', pathParam);
    }
  }, [pathname]);

  // Automatically add a sample product to the cart if it's empty
  useEffect(() => {
    if (items.length === 0 && products.length > 0) {
      // Add a sample product to the cart
      const sampleProduct = products[0];
      // addToCart(sampleProduct);
    }
  }, [items.length]);

  // Add effect to update priceInfo when isAmbassador changes
  useEffect(() => {
    // Start with the base price info
    const baseInfo = getPriceInfo(selectedFrequency);
    
    // Ambassador specific price IDs with the same billing intervals as the main products
    const ambassadorPriceIds = {
      monthly: 'price_1R42eZEWsQ0IpmHON2lotuyg', // Monthly ambassador subscription
      annual: 'price_1R42f9EWsQ0IpmHO1u0VzEiC'   // Annual ambassador subscription
    };
    
    // Update the price info based on ambassador status
    const updatedInfo = {
      ...baseInfo,
      // If ambassador is selected, add the ambassador program fee to display price
      totalPrice: isAmbassador ? baseInfo.totalPrice + 10 : baseInfo.totalPrice,
      // Set trialDays to 0 if ambassador, otherwise keep 5-day trial
      trialDays: isAmbassador ? 0 : 5,
    };
    
    // Store the ambassador status in localStorage
    localStorage.setItem('isAmbassador', isAmbassador ? 'yes' : 'no');
    
    // If ambassador is selected, store the appropriate ambassador price ID
    if (isAmbassador) {
      const priceId = selectedFrequency.includes('month') 
        ? ambassadorPriceIds.monthly 
        : ambassadorPriceIds.annual;
      localStorage.setItem('ambassadorPriceId', priceId);
    } else {
      localStorage.removeItem('ambassadorPriceId');
    }
    
    setPriceInfo(updatedInfo);
  }, [isAmbassador, selectedFrequency]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCardChange = (event: StripeCardElementChangeEvent) => {
    setCardComplete(event.complete);
    setCardElementReady(true);
    if (event.error) {
      setError(event.error.message || 'An error occurred with the card element');
    } else {
      setError(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // If we're in step 1, just move to step 2
    if (checkoutStep === 1) {
      // Store isAmbassador in localStorage when moving to step 2
      localStorage.setItem('isAmbassador', isAmbassador ? 'yes' : 'no');
      
      // Ambassador specific price IDs with the same billing intervals as the main products
      const ambassadorPriceIds = {
        monthly: 'price_1R42eZEWsQ0IpmHON2lotuyg', // Monthly ambassador subscription
        annual: 'price_1R42f9EWsQ0IpmHO1u0VzEiC'   // Annual ambassador subscription
      };
      
      // If ambassador is selected, store the appropriate ambassador price ID
      if (isAmbassador) {
        const priceId = selectedFrequency.includes('month') 
          ? ambassadorPriceIds.monthly 
          : ambassadorPriceIds.annual;
        localStorage.setItem('ambassadorPriceId', priceId);
      } else {
        localStorage.removeItem('ambassadorPriceId');
      }
      
      setCheckoutStep(2);
      return;
    }
    
    // Only validate Stripe in step 2
    if (!stripe || !elements) {
      setError('Stripe.js has not loaded. Please try again.');
      return;
    }

    if (!cardElementReady) {
      setError('Please enter your card details.');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }
      
      // Create payment method
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          address: {
            line1: formData.streetAddress,
            city: formData.city,
            state: formData.state,
            postal_code: formData.postalCode,
            country: formData.country,
          },
        },
      });
      
      if (stripeError) {
        throw new Error(stripeError.message);
      }
      
      if (!paymentMethod) {
        throw new Error('Payment method creation failed');
      }
      
      // Get the ambassador price ID if the ambassador option is selected
      const ambassadorPriceId = isAmbassador ? localStorage.getItem('ambassadorPriceId') : undefined;
      
      // Use affiliateCode if available, fallback to pathParam
      const referralCode = storedAffiliateCode || storedPathParam || undefined;
      console.log(`Using referral code for checkout: ${referralCode}`);
      
      // Process checkout
      const response = await initiateCheckout(
        items,
        formData,
        selectedFrequency,
        paymentMethod.id,
        referralCode, // Pass the affiliate code or path param
        isAmbassador, // Pass the ambassador status
        ambassadorPriceId // Pass the ambassador price ID if applicable
      );
      
      console.log(`Submitting checkout with frequency: ${selectedFrequency}, affiliateCode: ${storedAffiliateCode}, pathParam: ${storedPathParam}, isAmbassador: ${isAmbassador} ${isAmbassador ? '(bypassing 5-day trial and adding $10 ambassador fee)' : '(with 5-day trial)'}`);
      
      if (!response.success) {
        throw new Error(response.error || 'Checkout failed');
      }
      
      // Store the subscription ID in localStorage for reference on the next page
      if (response.subscriptionId) {
        localStorage.setItem('subscriptionId', response.subscriptionId);
      }
      
      // Redirect based on ambassador status
      if (isAmbassador) {
        // If user is an ambassador, redirect to ambassador details page
        window.location.href = `/ambassador-details?subscriptionId=${response.subscriptionId}`;
      } else {
        // Otherwise, redirect to the standard success page
        window.location.href = `/success?subscriptionId=${response.subscriptionId}`;
      }
      
    } catch (error: any) {
      console.error('Checkout error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (checkoutStep > 1) {
      setCheckoutStep(checkoutStep - 1);
    }
  };

  const handlePlaceSelected = (place: any) => {
    if (!place || !place.address_components) return;
    
    const address = parseAddressComponents(place);
    
    // Find country code for the selected country name
    let countryCode = 'US'; // Default to US
    const countryOption = COUNTRY_OPTIONS.find(c => 
      c.name.toLowerCase() === address.country.toLowerCase()
    );
    
    if (countryOption) {
      countryCode = countryOption.code;
    }
    
    // Update form data with the parsed address
    setFormData(prevData => ({
      ...prevData,
      streetAddress: address.streetAddress,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: countryCode // Use the country code instead of name
    }));
  };
  
  // Initialize the Google Places autocomplete
  useGooglePlacesAutocomplete({
    inputId: 'streetAddress',
    onPlaceSelected: handlePlaceSelected
  });

  // Render progress steps
  const renderSteps = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${checkoutStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            1
          </div>
          <div className={`flex-1 h-0.5 mx-2 ${checkoutStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${checkoutStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            2
          </div>
        </div>
        <div className="flex justify-between mt-1 text-xs">
          <span className={checkoutStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>Your Information</span>
          <span className={checkoutStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}>Payment</span>
        </div>
      </div>
    );
  };

  // Render step 1 form (customer information)
  const renderStep1 = () => {
    return (
      <div className="space-y-3 md:space-y-4">
        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
          <div>
            <label htmlFor="firstName" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 h-9 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 h-9 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 h-9 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="streetAddress" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Billing Address
          </label>
          <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleInputChange}
            required
            autoComplete="off"
            className="w-full px-3 py-2 h-9 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
          <div>
            <label htmlFor="city" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 h-9 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              State/Province
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 h-9 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
          <div>
            <label htmlFor="postalCode" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 h-9 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 h-9 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
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

        {/* Ambassador Program Section - Styled with rounded corners and background */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100 shadow-sm">
          <h3 className="text-base font-medium text-blue-800 mb-2">Brilliant Ambassador Program</h3>
          
          {/* Toggle and Learn More Row */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isAmbassador}
                  onChange={() => setIsAmbassador(!isAmbassador)}
                />
                <div className={`block w-10 h-6 rounded-full transition ${isAmbassador ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${isAmbassador ? 'translate-x-4' : ''}`}></div>
              </div>
              <span className="ml-3 font-medium text-gray-700">Become an Ambassador</span>
            </label>
            <button 
              onClick={(e) => {
                e.preventDefault();
                setShowAmbassadorModal(true);
              }}
              className="px-3 py-1.5 bg-white text-blue-600 hover:bg-blue-50 text-sm font-medium rounded-md border border-blue-200 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Learn More
            </button>
          </div>
          
          {/* Description - Shown regardless of toggle state */}
          <p className="mt-2 text-sm text-blue-700">
            Join our ambassador program to help spread the word about our Christian prayer app.
          </p>
          
          {/* Price info - Only shown when toggle is on */}
          {isAmbassador && (
            <div className="mt-3 py-2 px-3 bg-white rounded-md flex items-center justify-between">
              <span className="text-sm text-gray-600">Ambassador program fee:</span>
              <span className="text-sm font-semibold text-blue-700">$10/year (no trial period)</span>
            </div>
          )}
          
          {/* Ambassador Modal */}
          {showAmbassadorModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Brilliant Ambassador Program</h3>
                  <button 
                    onClick={() => setShowAmbassadorModal(false)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="mb-6">
                  <p className="mb-4">Join our Brilliant Ambassador program and help spread the word about our Christian prayer app while earning rewards.</p>
                  
                  <h4 className="font-semibold mb-2">Benefits:</h4>
                  <ul className="list-disc pl-5 mb-4 space-y-1">
                    <li>Earn commission on every referral</li>
                    <li>Get exclusive content and resources</li>
                    <li>Connect with other ambassadors</li>
                    <li>Receive promotional materials</li>
                  </ul>
                  
                  <div className="p-3 bg-blue-50 rounded-md mb-4">
                    <p className="font-medium text-blue-800 mb-1">Important Information:</p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>The annual fee for the Ambassador program is $10.</li>
                      <li>This fee is legally required to distinguish ambassadors.</li>
                      <li>Becoming an ambassador bypasses the 5-day free trial period.</li>
                      <li>You'll be charged immediately when signing up as an ambassador.</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      setShowAmbassadorModal(false);
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setIsAmbassador(true);
                      setShowAmbassadorModal(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Sign me up ($10/year)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render step 2 form (payment)
  const renderStep2 = () => {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
        
        <div className="mb-4">
          <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 mb-1">
            Credit or debit card
          </label>
          <div className="p-3 border border-gray-300 rounded-md bg-white">
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
            {checkoutStep === 2 && !cardElementReady && (
              <p className="mt-1 text-xs text-gray-500">
                Please enter your card details
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-start mb-4">
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
              I agree to the <a href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
            </label>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isLoading || !cardComplete || !agreeToTerms}
            className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm ${
              isLoading || !cardComplete || !agreeToTerms
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {isLoading ? 'Processing...' : 'Complete Purchase'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
      {/* Checkout Steps Progress Indicator */}
      {renderSteps()}
      
      <div className="max-h-[45vh] md:max-h-[55vh] overflow-y-auto pr-1 pb-2">
        {checkoutStep === 1 && renderStep1()}
        {checkoutStep === 2 && renderStep2()}
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between space-x-3 md:space-x-4 mt-4">
        {checkoutStep > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 py-2 md:py-3 px-3 md:px-4 border border-gray-300 rounded-md shadow-sm text-sm md:text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          disabled={checkoutStep === 1 ? !step1Valid : (isLoading || !formValid || !agreeToTerms)}
          className={`flex-1 py-2 md:py-3 px-3 md:px-4 rounded-md shadow-sm text-sm md:text-base font-medium text-white ${
            (checkoutStep === 1 ? !step1Valid : (isLoading || !formValid || !agreeToTerms))
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : checkoutStep === 1 ? (
            "Continue to Payment"
          ) : (
            "Start Your Free Trial"
          )}
        </button>
      </div>
      <div className="flex justify-center space-x-4 mt-2">
        <div className="flex items-center">
          <svg className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-xs text-gray-500">Secure</span>
        </div>
        <div className="flex items-center">
          <svg className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-xs text-gray-500">Cancel Anytime</span>
        </div>
      </div>
    </form>
  );
}

// Main component - wraps the checkout form with Stripe Elements
export default function Home() {
  const { items, totalPrice, clearCart, addToCart } = useCart();
  const pathname = usePathname();
  
  // Define getPriceInfo function before using it in useState
  const getPriceInfo = (frequency: string) => {
    if (frequency === 'monthly') {
      return {
        frequency: 'monthly',
        price: 47,
        discountPrice: 47,
        dailyPrice: (47 / 30).toFixed(2),
        savingsPercent: 0,
        totalPrice: 47,
        trialDays: 5
      };
    } else {
      // Calculate savings compared to monthly
      const annualCost = 397;
      const monthlyCostForYear = 47 * 12;
      const savings = monthlyCostForYear - annualCost;
      const savingsPercent = Math.round((savings / monthlyCostForYear) * 100);
      
      return {
        frequency: 'annual',
        price: monthlyCostForYear,
        discountPrice: annualCost,
        dailyPrice: (annualCost / 365).toFixed(2),
        savingsPercent: savingsPercent,
        totalPrice: annualCost,
        trialDays: 5
      };
    }
  };
  
  const [selectedFrequency, setSelectedFrequency] = useState('annual');
  const [priceInfo, setPriceInfo] = useState(() => getPriceInfo('annual'));
  const [referralCode, setReferralCode] = useState<string>('');
  const [isAmbassador, setIsAmbassador] = useState(false);
  
  // Check if the user came from the ambassador page and set isAmbassador accordingly
  useEffect(() => {
    // Check if the previous page was the ambassador page
    const referrer = document.referrer;
    const fromAmbassadorPage = referrer.includes('/ambassador') || 
                               localStorage.getItem('fromAmbassadorPage') === 'true';
    
    // If coming from ambassador page, automatically set the ambassador toggle to true
    if (fromAmbassadorPage) {
      setIsAmbassador(true);
      // Clear the flag after using it
      localStorage.removeItem('fromAmbassadorPage');
    }
  }, []);

  // Update priceInfo when selectedFrequency or isAmbassador changes
  useEffect(() => {
    const baseInfo = getPriceInfo(selectedFrequency);
    setPriceInfo({
      ...baseInfo,
      totalPrice: isAmbassador ? baseInfo.totalPrice + 10 : baseInfo.totalPrice,
    });
  }, [selectedFrequency, isAmbassador]);

  // Set referral code from URL path parameter
  useEffect(() => {
    if (pathname && pathname.length > 1) {
      // Remove the first slash and get the path parameter
      const pathParam = pathname.substring(1);
      setReferralCode(pathParam);
    }
  }, [pathname]);

  // Automatically add a sample product to the cart if it's empty
  useEffect(() => {
    if (items.length === 0 && products.length > 0) {
      // Add a sample product to the cart
      const sampleProduct = products[0];
      addToCart(sampleProduct);
    }
  }, [items.length, addToCart]);
  
  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Section (Checkout) */}
      <div className="flex-1 md:w-3/5 bg-white p-4 md:p-8 lg:p-12 overflow-auto">
        <div className="max-w-lg mx-auto">
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
          
          {/* Headline */}
          <div className="mb-6 md:mb-8">
            {/* Removed headline and subtext as requested */}
          </div>
          
          {/* Pricing Section */}
          <div className="mb-6 md:mb-8">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {/* Monthly Option */}
              <div
                className={`border ${
                  selectedFrequency === 'monthly' ? 'border-blue-500 border-2' : 'border-gray-300'
                } rounded-lg p-3 md:p-4 cursor-pointer hover:border-blue-400 transition-colors`}
                onClick={() => setSelectedFrequency('monthly')}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">Monthly</h3>
                    <p className="text-sm text-gray-500">Auto-renews monthly</p>
                  </div>
                  <input
                    type="radio"
                    name="plan"
                    checked={selectedFrequency === 'monthly'}
                    onChange={() => setSelectedFrequency('monthly')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                </div>
                <div>
                  <p className="text-lg font-bold">$47/mo</p>
                  <p className="text-xs text-gray-500">Less than $1.57/day</p>
                  <p className="text-xs mt-2"><span className="text-amber-500">★★★★★</span> <span className="text-gray-600">|</span> <span className="text-gray-600">4000+ Reviews</span></p>
                </div>
              </div>
              
              {/* Annual Option */}
              <div
                className={`border ${
                  selectedFrequency === 'annual' ? 'border-blue-500 border-2' : 'border-gray-300'
                } rounded-lg p-3 md:p-4 cursor-pointer hover:border-blue-400 transition-colors relative`}
                onClick={() => setSelectedFrequency('annual')}
              >
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded">
                  BEST VALUE
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">Annual</h3>
                    <p className="text-sm text-gray-500">Auto-renews yearly</p>
                    <p className="text-xs text-green-600 font-semibold mt-1">Save 30%</p>
                  </div>
                  <input
                    type="radio"
                    name="plan"
                    checked={selectedFrequency === 'annual'}
                    onChange={() => setSelectedFrequency('annual')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                </div>
                <div>
                  <p className="text-lg font-bold">$397/yr</p>
                  <p className="text-xs text-gray-500">Less than $1.09/day</p>
                  <p className="text-xs mt-2"><span className="text-amber-500">★★★★★</span> <span className="text-gray-600">|</span> <span className="text-gray-600">4000+ Reviews</span></p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 md:mb-8">
            <h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <p className="text-gray-600">{priceInfo.frequency === 'monthly' ? 'Monthly' : 'Annual'} Plan:</p>
              <p className="font-medium">${priceInfo.discountPrice}</p>
            </div>
            {priceInfo.frequency === 'annual' && (
              <div className="flex justify-between mb-2 text-green-600 text-sm">
                <p>You save:</p>
                <p>$167</p>
              </div>
            )}
            {isAmbassador && (
              <div className="flex justify-between mb-2">
                <p className="text-gray-600">Ambassador Program (Annual):</p>
                <p className="font-medium">$10.00</p>
              </div>
            )}
            <div className="flex justify-between mb-2">
              <p className="text-gray-600">{isAmbassador ? 'No Trial Period' : '5-Day Free Trial'}:</p>
              <p className="font-medium">{isAmbassador ? 'N/A' : '$0.00'}</p>
            </div>
            <div className="border-t border-gray-200 my-2 pt-2"></div>
            <div className="flex justify-between">
              <p className="font-medium">Due today:</p>
              <p className="font-bold">{isAmbassador ? `$${priceInfo.totalPrice.toFixed(2)}` : '$0.00'}</p>
            </div>
            <div className="mt-1 text-xs text-gray-500 flex items-center">
              <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {isAmbassador ? (
                <span>Charged immediately: ${priceInfo.totalPrice.toFixed(2)} {priceInfo.frequency === 'monthly' ? 'per month' : 'per year'}</span>
              ) : (
                <span>After trial, ${priceInfo.totalPrice} {priceInfo.frequency === 'monthly' ? 'per month' : 'per year'}</span>
              )}
            </div>
          </div>
          
          {/* Checkout Form */}
          <Elements stripe={stripePromise}>
            <CheckoutForm 
              selectedFrequency={selectedFrequency}
              isAmbassador={isAmbassador}
              setIsAmbassador={setIsAmbassador}
            />
          </Elements>
        </div>
      </div>
      
      {/* Right Section (Image) */}
      <div className="hidden lg:block w-full xl:w-2/5 min-h-screen relative overflow-hidden">
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
            <h2 className="text-2xl font-bold mb-4">The Christian Prayer App</h2>
            
            <div className="mb-8">
              <div className="font-semibold text-lg mb-2">What you get:</div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-3 text-green-300">✓</span>
                  <span>Daily structured prayer guides</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-green-300">✓</span>
                  <span>Prayer tracking with insights</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-green-300">✓</span>
                  <span>Community prayer circles</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-green-300">✓</span>
                  <span>Scripture-based meditations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-green-300">✓</span>
                  <span>Prayer reminders & journals</span>
                </li>
              </ul>
            </div>
            
            <div className="text-sm opacity-90 italic">
              "This app has transformed my prayer life. The daily structure and community features keep me accountable."
              <div className="mt-2 font-semibold not-italic">— Sarah M.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
