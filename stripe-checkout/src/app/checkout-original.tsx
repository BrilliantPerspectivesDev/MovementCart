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
import { Switch } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import LegalModal from './components/LegalModal';
import PoliciesModal from './components/PoliciesModal';

// Load Stripe outside of component to avoid recreating it on renders
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// Country code mapping for common countries
const COUNTRY_OPTIONS = [
  { code: 'AF', name: 'Afghanistan' },
  { code: 'AL', name: 'Albania' },
  { code: 'DZ', name: 'Algeria' },
  { code: 'AD', name: 'Andorra' },
  { code: 'AO', name: 'Angola' },
  { code: 'AG', name: 'Antigua and Barbuda' },
  { code: 'AR', name: 'Argentina' },
  { code: 'AM', name: 'Armenia' },
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'AZ', name: 'Azerbaijan' },
  { code: 'BS', name: 'Bahamas' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'BB', name: 'Barbados' },
  { code: 'BY', name: 'Belarus' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BZ', name: 'Belize' },
  { code: 'BJ', name: 'Benin' },
  { code: 'BT', name: 'Bhutan' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BA', name: 'Bosnia and Herzegovina' },
  { code: 'BW', name: 'Botswana' },
  { code: 'BR', name: 'Brazil' },
  { code: 'BN', name: 'Brunei' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'BI', name: 'Burundi' },
  { code: 'KH', name: 'Cambodia' },
  { code: 'CM', name: 'Cameroon' },
  { code: 'CA', name: 'Canada' },
  { code: 'CV', name: 'Cape Verde' },
  { code: 'CF', name: 'Central African Republic' },
  { code: 'TD', name: 'Chad' },
  { code: 'CL', name: 'Chile' },
  { code: 'CN', name: 'China' },
  { code: 'CO', name: 'Colombia' },
  { code: 'KM', name: 'Comoros' },
  { code: 'CG', name: 'Congo' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'HR', name: 'Croatia' },
  { code: 'CU', name: 'Cuba' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'DK', name: 'Denmark' },
  { code: 'DJ', name: 'Djibouti' },
  { code: 'DM', name: 'Dominica' },
  { code: 'DO', name: 'Dominican Republic' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'EG', name: 'Egypt' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'GQ', name: 'Equatorial Guinea' },
  { code: 'ER', name: 'Eritrea' },
  { code: 'EE', name: 'Estonia' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'FJ', name: 'Fiji' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'GA', name: 'Gabon' },
  { code: 'GM', name: 'Gambia' },
  { code: 'GE', name: 'Georgia' },
  { code: 'DE', name: 'Germany' },
  { code: 'GH', name: 'Ghana' },
  { code: 'GR', name: 'Greece' },
  { code: 'GD', name: 'Grenada' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'GN', name: 'Guinea' },
  { code: 'GW', name: 'Guinea-Bissau' },
  { code: 'GY', name: 'Guyana' },
  { code: 'HT', name: 'Haiti' },
  { code: 'HN', name: 'Honduras' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IS', name: 'Iceland' },
  { code: 'IN', name: 'India' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IR', name: 'Iran' },
  { code: 'IQ', name: 'Iraq' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IL', name: 'Israel' },
  { code: 'IT', name: 'Italy' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'JP', name: 'Japan' },
  { code: 'JO', name: 'Jordan' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'KE', name: 'Kenya' },
  { code: 'KI', name: 'Kiribati' },
  { code: 'KP', name: 'North Korea' },
  { code: 'KR', name: 'South Korea' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'KG', name: 'Kyrgyzstan' },
  { code: 'LA', name: 'Laos' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'LS', name: 'Lesotho' },
  { code: 'LR', name: 'Liberia' },
  { code: 'LY', name: 'Libya' },
  { code: 'LI', name: 'Liechtenstein' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MK', name: 'North Macedonia' },
  { code: 'MG', name: 'Madagascar' },
  { code: 'MW', name: 'Malawi' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'MV', name: 'Maldives' },
  { code: 'ML', name: 'Mali' },
  { code: 'MT', name: 'Malta' },
  { code: 'MH', name: 'Marshall Islands' },
  { code: 'MR', name: 'Mauritania' },
  { code: 'MU', name: 'Mauritius' },
  { code: 'MX', name: 'Mexico' },
  { code: 'FM', name: 'Micronesia' },
  { code: 'MD', name: 'Moldova' },
  { code: 'MC', name: 'Monaco' },
  { code: 'MN', name: 'Mongolia' },
  { code: 'ME', name: 'Montenegro' },
  { code: 'MA', name: 'Morocco' },
  { code: 'MZ', name: 'Mozambique' },
  { code: 'MM', name: 'Myanmar' },
  { code: 'NA', name: 'Namibia' },
  { code: 'NR', name: 'Nauru' },
  { code: 'NP', name: 'Nepal' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'NE', name: 'Niger' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'NO', name: 'Norway' },
  { code: 'OM', name: 'Oman' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'PW', name: 'Palau' },
  { code: 'PS', name: 'Palestine' },
  { code: 'PA', name: 'Panama' },
  { code: 'PG', name: 'Papua New Guinea' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Peru' },
  { code: 'PH', name: 'Philippines' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'QA', name: 'Qatar' },
  { code: 'RO', name: 'Romania' },
  { code: 'RU', name: 'Russia' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'KN', name: 'Saint Kitts and Nevis' },
  { code: 'LC', name: 'Saint Lucia' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines' },
  { code: 'WS', name: 'Samoa' },
  { code: 'SM', name: 'San Marino' },
  { code: 'ST', name: 'Sao Tome and Principe' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SN', name: 'Senegal' },
  { code: 'RS', name: 'Serbia' },
  { code: 'SC', name: 'Seychelles' },
  { code: 'SL', name: 'Sierra Leone' },
  { code: 'SG', name: 'Singapore' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'SB', name: 'Solomon Islands' },
  { code: 'SO', name: 'Somalia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'SS', name: 'South Sudan' },
  { code: 'ES', name: 'Spain' },
  { code: 'LK', name: 'Sri Lanka' },
  { code: 'SD', name: 'Sudan' },
  { code: 'SR', name: 'Suriname' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'SY', name: 'Syria' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'TJ', name: 'Tajikistan' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TL', name: 'Timor-Leste' },
  { code: 'TG', name: 'Togo' },
  { code: 'TO', name: 'Tonga' },
  { code: 'TT', name: 'Trinidad and Tobago' },
  { code: 'TN', name: 'Tunisia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'TM', name: 'Turkmenistan' },
  { code: 'TV', name: 'Tuvalu' },
  { code: 'UG', name: 'Uganda' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'VU', name: 'Vanuatu' },
  { code: 'VA', name: 'Vatican City' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'YE', name: 'Yemen' },
  { code: 'ZM', name: 'Zambia' },
  { code: 'ZW', name: 'Zimbabwe' }
];

// Add US state options
const US_STATE_OPTIONS = [
  { key: 1, value: "Alabama", abbr: "AL" },
  { key: 2, value: "Alaska", abbr: "AK" },
  { key: 3, value: "AE", abbr: "AE" },
  { key: 4, value: "AP", abbr: "AP" },
  { key: 5, value: "Arizona", abbr: "AZ" },
  { key: 6, value: "Arkansas", abbr: "AR" },
  { key: 7, value: "California", abbr: "CA" },
  { key: 8, value: "Colorado", abbr: "CO" },
  { key: 9, value: "Connecticut", abbr: "CT" },
  { key: 10, value: "DC", abbr: "DC" },
  { key: 11, value: "Delaware", abbr: "DE" },
  { key: 12, value: "Florida", abbr: "FL" },
  { key: 13, value: "Georgia", abbr: "GA" },
  { key: 14, value: "Guam", abbr: "GU" },
  { key: 15, value: "Hawaii", abbr: "HI" },
  { key: 16, value: "Idaho", abbr: "ID" },
  { key: 17, value: "Illinois", abbr: "IL" },
  { key: 18, value: "Indiana", abbr: "IN" },
  { key: 19, value: "Iowa", abbr: "IA" },
  { key: 20, value: "Kansas", abbr: "KS" },
  { key: 21, value: "Kentucky", abbr: "KY" },
  { key: 22, value: "Louisiana", abbr: "LA" },
  { key: 23, value: "Maine", abbr: "ME" },
  { key: 24, value: "Maryland", abbr: "MD" },
  { key: 25, value: "Massachusetts", abbr: "MA" },
  { key: 26, value: "Michigan", abbr: "MI" },
  { key: 27, value: "Minnesota", abbr: "MN" },
  { key: 28, value: "Mississippi", abbr: "MS" },
  { key: 29, value: "Missouri", abbr: "MO" },
  { key: 30, value: "Montana", abbr: "MT" },
  { key: 31, value: "Nebraska", abbr: "NE" },
  { key: 32, value: "Nevada", abbr: "NV" },
  { key: 33, value: "New Hampshire", abbr: "NH" },
  { key: 34, value: "New Jersey", abbr: "NJ" },
  { key: 35, value: "New Mexico", abbr: "NM" },
  { key: 36, value: "New York", abbr: "NY" },
  { key: 37, value: "North Carolina", abbr: "NC" },
  { key: 38, value: "North Dakota", abbr: "ND" },
  { key: 39, value: "Ohio", abbr: "OH" },
  { key: 40, value: "Oklahoma", abbr: "OK" },
  { key: 41, value: "Oregon", abbr: "OR" },
  { key: 42, value: "Pennsylvania", abbr: "PA" },
  { key: 43, value: "Puerto Rico", abbr: "PR" },
  { key: 44, value: "Rhode Island", abbr: "RI" },
  { key: 45, value: "South Carolina", abbr: "SC" },
  { key: 46, value: "South Dakota", abbr: "SD" },
  { key: 47, value: "Tennessee", abbr: "TN" },
  { key: 48, value: "Texas", abbr: "TX" },
  { key: 49, value: "Utah", abbr: "UT" },
  { key: 50, value: "Vermont", abbr: "VT" },
  { key: 51, value: "Virgin Islands", abbr: "VI" },
  { key: 52, value: "Virginia", abbr: "VA" },
  { key: 53, value: "Washington", abbr: "WA" },
  { key: 54, value: "West Virginia", abbr: "WV" },
  { key: 55, value: "Wisconsin", abbr: "WI" },
  { key: 56, value: "Wyoming", abbr: "WY" },
  { key: 1248, value: "American Samoa", abbr: "AS" },
  { key: 1249, value: "Northern Mariana Islands", abbr: "MP" }
];

// FormData interface for the checkout form
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  agreedToPolicies: boolean;
}

// Add legal document content
const TERMS_OF_SERVICE = `
  <h2>Terms of Service</h2>
  <p>Last updated: February 24, 2024</p>
  
  <h3>1. Agreement to Terms</h3>
  <p>By accessing or using Brilliant Movement's services, you agree to be bound by these Terms of Service.</p>
  
  <h3>2. Membership</h3>
  <p>Your membership includes access to our digital content, community features, and other services as described in your selected plan.</p>
  
  <h3>3. Payment and Billing</h3>
  <p>You agree to pay all fees associated with your selected membership plan. Fees are billed in advance on a monthly or annual basis.</p>
  
  <h3>4. Cancellation</h3>
  <p>You may cancel your membership at any time. Cancellation will take effect at the end of your current billing period.</p>
  
  <h3>5. Intellectual Property</h3>
  <p>All content provided through Brilliant Movement is protected by copyright and other intellectual property laws.</p>
`;

const PRIVACY_POLICY = `
  <h2>Privacy Policy</h2>
  <p>Last updated: February 24, 2024</p>
  
  <h3>1. Information We Collect</h3>
  <p>We collect information you provide directly to us, including name, email, and payment information.</p>
  
  <h3>2. How We Use Your Information</h3>
  <p>We use your information to provide and improve our services, process payments, and communicate with you.</p>
  
  <h3>3. Information Sharing</h3>
  <p>We do not sell your personal information. We may share it with service providers who assist in operating our services.</p>
  
  <h3>4. Data Security</h3>
  <p>We implement appropriate security measures to protect your personal information.</p>
  
  <h3>5. Your Rights</h3>
  <p>You have the right to access, correct, or delete your personal information.</p>
`;

// Inner form component that has access to Stripe hooks
function CheckoutForm({ 
  selectedFrequency
}: { 
  selectedFrequency: string
}) {
  const { items } = useCart();
  const { initiateCheckout, isLoading: checkoutLoading, error: checkoutError } = useCheckout();
  const stripe = useStripe();
  const elements = useElements();
  const pathname = usePathname();
  const router = useRouter();
  
  // Add loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardElementReady, setCardElementReady] = useState(false);
  
  // Get stored referral code from localStorage
  const [storedPathParam, setStoredPathParam] = useState<string>('');
  const [storedAffiliateCode, setStoredAffiliateCode] = useState<string>('');
  
  // Add state for modal visibility
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showPoliciesModal, setShowPoliciesModal] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToPolicies, setAgreeToPolicies] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [step1Valid, setStep1Valid] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [agreedToMarketing, setAgreedToMarketing] = useState(false);
  
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
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    agreedToPolicies: false
  });
  
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

  // Update form validation when form data changes
  useEffect(() => {
    const isAddressValid = 
      formData.firstName.trim() !== '' && 
      formData.lastName.trim() !== '' && 
      formData.email.trim() !== '' &&
      formData.address.trim() !== '' &&
      formData.city.trim() !== '' &&
      formData.state.trim() !== '' &&
      formData.zipCode.trim() !== '' &&
      formData.country !== '';

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      setStep1Valid(false);
      return;
    }

    setError(null);
    setStep1Valid(isAddressValid);
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
    
    if (isLoading) {
      console.log('Submission already in progress');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      if (checkoutStep === 1) {
        setCheckoutStep(2);
        localStorage.setItem('selectedFrequency', selectedFrequency);
        setIsLoading(false);
        return;
      }

      // Create payment method
      const { error: stripeError, paymentMethod } = await stripe!.createPaymentMethod({
        type: 'card',
        card: elements!.getElement(CardElement)!,
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
        },
      });

      if (stripeError) {
        console.error('Error creating payment method:', stripeError);
        setError(stripeError.message || 'Failed to process payment method');
        setIsLoading(false);
        return;
      }

      // Get affiliate code from localStorage or path parameter
      const affiliateCode = localStorage.getItem('affiliateCode') || storedPathParam;

      // Process checkout
      const response = await fetch('/api/direct-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerInfo: formData,
          paymentMethodId: paymentMethod.id,
          frequency: selectedFrequency,
          pathParam: affiliateCode,
          marketingConsent: agreedToMarketing
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process checkout');
      }

      // Handle main subscription payment confirmation
      if (data.mainPaymentIntentSecret) {
        const { error: confirmError } = await stripe!.confirmCardPayment(data.mainPaymentIntentSecret);
        if (confirmError) {
          throw new Error(`Failed to confirm main subscription payment: ${confirmError.message}`);
        }
      }

      // Redirect to success page
      router.push(`/success?subscriptionId=${data.subscriptionId}`);
    } catch (error: any) {
      console.error('Checkout error:', error);
      setError(error.message || 'An unexpected error occurred');
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
      address: address.streetAddress,
      city: address.city,
      state: address.state,
      zipCode: address.postalCode,
      country: countryCode // Use the country code instead of name
    }));
  };
  
  // Initialize the Google Places autocomplete
  useGooglePlacesAutocomplete({
    inputId: 'address',
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
          <label htmlFor="address" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
            Billing Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
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
            {formData.country === 'US' ? (
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 h-9 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full px-3 py-2 h-9 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
          <div>
            <label htmlFor="zipCode" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
              Postal Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
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
        
        {/* Order Summary */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <p className="text-gray-600">{priceInfo.frequency === 'monthly' ? 'Monthly' : 'Annual'} Plan:</p>
            <p className="font-medium text-gray-900">${priceInfo.discountPrice}</p>
          </div>
          {priceInfo.frequency === 'annual' && (
            <div className="flex justify-between mb-2 text-green-600 text-sm">
              <p>You save:</p>
              <p>$167</p>
            </div>
          )}
          <div className="flex justify-between mb-2">
            <p className="text-gray-600">{priceInfo.frequency === 'monthly' ? '5-Day Free Trial' : '5-Day Free Trial'}:</p>
            <p className="font-medium text-gray-900">{priceInfo.frequency === 'monthly' ? '$0.00' : '$0.00'}</p>
          </div>
          <div className="border-t border-gray-200 my-2 pt-2"></div>
          <div className="flex justify-between">
            <p className="font-medium text-gray-900">Due today:</p>
            <p className="font-bold text-gray-900">${priceInfo.totalPrice}</p>
          </div>
          <div className="mt-1 text-xs text-gray-500 flex items-center">
            <svg className="h-3 w-3 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>After trial, ${priceInfo.totalPrice} {priceInfo.frequency === 'monthly' ? 'per month' : 'per year'}</span>
          </div>
        </div>
      </div>
    );
  };

  // Render step 2 form (payment)
  const renderStep2 = (): JSX.Element => {
    return (
      <div className="space-y-6">
        {/* Terms of Service and Marketing Checkbox */}
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
              I agree to the{' '}
              <button
                type="button"
                onClick={() => window.open('https://brilliantperspectives.clickfunnels.com/terms-of-servicefskn0ipf', '_blank')}
                className="text-blue-600 hover:text-blue-800"
              >
                Terms of Service
              </button>
              {' '}and give permission to receive communications
            </label>
          </div>
        </div>

        {/* Credit Card Input */}
        <div className="space-y-2">
          <label htmlFor="card-element" className="block text-sm font-medium text-gray-700">
            Credit Card
          </label>
          <div className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm">
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

        {/* Show any error messages */}
        {error && (
          <div className="text-red-600 text-sm mt-2">
            {error}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
        {/* Checkout Steps Progress Indicator */}
        {renderSteps()}
        
        <div className="pr-1 pb-2">
          {checkoutStep === 1 && renderStep1()}
          {checkoutStep === 2 && renderStep2()}
        </div>

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
              "Pay Now"
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
            <span className="text-xs text-gray-500">Cancel Anytime</span>
          </div>
        </div>
      </form>

      <LegalModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title="Terms of Service"
        content={TERMS_OF_SERVICE}
      />

      <LegalModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        title="Privacy Policy"
        content={PRIVACY_POLICY}
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
    </>
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
  
  // Set initial frequency from URL parameter
  useEffect(() => {
    // Get referrer from document if available
    const referrer = document.referrer || '';

    // Set initial frequency from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const frequencyParam = urlParams.get('frequency');
    if (frequencyParam === 'monthly' || frequencyParam === 'annual') {
      setSelectedFrequency(frequencyParam);
    }
  }, []);
  
  // Update priceInfo when selectedFrequency changes
  useEffect(() => {
    setPriceInfo(getPriceInfo(selectedFrequency));
  }, [selectedFrequency]);

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
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Left Section (Checkout) */}
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
                    <p className="text-lg font-bold text-gray-900">$47/mo</p>
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
                      <p className="text-xs text-green-600 font-semibold mt-1">Save $167</p>
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
                    <p className="text-lg font-bold text-gray-900">$397/yr</p>
                    <p className="text-xs text-gray-500">Less than $1.09/day</p>
                    <p className="text-xs mt-2"><span className="text-amber-500">★★★★★</span> <span className="text-gray-600">|</span> <span className="text-gray-600">4000+ Reviews</span></p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Checkout Form */}
            <Elements stripe={stripePromise}>
              <CheckoutForm 
                selectedFrequency={selectedFrequency}
              />
            </Elements>
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
      </main>

      {/* Footer */}
      <footer className="bg-[#222222] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            {/* Logo and copyright */}
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-2">Brilliant Perspectives LLC</h2>
              <p className="text-gray-400 text-sm">
                © 2025 Brilliant Perspectives LLC. All rights reserved.
              </p>
            </div>
            
            {/* Contact info */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p className="text-gray-400">
                <a href="mailto:help@brilliantperspectives.com" className="hover:text-white transition-colors">
                  help@brilliantperspectives.com
                </a>
              </p>
              <p className="text-gray-400">Voicemail: (800) 351-7541</p>
              <p className="text-gray-400">735 State St. #517<br />Santa Barbara, CA 93101</p>
            </div>
          </div>
          
          {/* Bottom bar */}
          <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>
              <a 
                href="https://brilliantperspectives.clickfunnels.com/terms-of-service7l3p11kd" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <span className="mx-2">|</span>
              <a 
                href="https://brilliantperspectives.clickfunnels.com/terms-of-servicefskn0ipf" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
