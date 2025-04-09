import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key only if it exists
// This prevents build errors when environment variables aren't available
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16',
  });
}

// Cache for price IDs to reduce unnecessary API calls
const PRICE_CACHE: Record<string, string> = {};

// Price IDs from environment variables only
const PRICE_IDS = {
  monthly: process.env.STRIPE_MONTHLY_PRICE_ID,
  annual: process.env.STRIPE_ANNUAL_PRICE_ID,
  ambassadorFee: process.env.STRIPE_AMBASSADOR_FEE_PRICE_ID
};

// Log environment variables for debugging (excluding any sensitive values)
console.log('Environment variables check (detailed):', {
  STRIPE_MONTHLY_PRICE_ID: process.env.STRIPE_MONTHLY_PRICE_ID ? 'Set' : 'Not set',
  STRIPE_ANNUAL_PRICE_ID: process.env.STRIPE_ANNUAL_PRICE_ID ? 'Set' : 'Not set',
  STRIPE_AMBASSADOR_FEE_PRICE_ID: process.env.STRIPE_AMBASSADOR_FEE_PRICE_ID ? 'Set' : 'Not set',
  NODE_ENV: process.env.NODE_ENV,
});

// Valid ISO country codes (just a subset for common countries)
const VALID_COUNTRY_CODES = [
  'US', 'CA', 'GB', 'AU', 'DE', 'FR', 'JP', 'CN', 'IN', 'BR', 
  'MX', 'ES', 'IT', 'NL', 'CH', 'SG', 'KR', 'RU', 'ZA', 'AE'
];

// Product IDs - using environment variables only
const PRODUCT_IDS = {
  monthly: process.env.STRIPE_MONTHLY_PRODUCT_ID || '',
  annual: process.env.STRIPE_ANNUAL_PRODUCT_ID || '',
  general: process.env.STRIPE_PRODUCT_ID || '',
};

// Check if product IDs are available
if (!PRODUCT_IDS.monthly && !PRODUCT_IDS.annual && !PRODUCT_IDS.general) {
  console.warn('⚠️ No Stripe product IDs found in environment variables. Will create products as needed.');
}

// Default product data for fallback if product IDs aren't available
const DEFAULT_PRODUCT_DATA = {
  name: 'BrilliantPlus Subscription',
  description: 'A Simple, Relational way of being with God',
};

export const maxDuration = 60; // Set max duration to 60 seconds

export const dynamic = 'force-dynamic';

/**
 * API endpoint to handle direct checkout with Stripe Elements
 */
export async function POST(request: Request) {
  try {
    // Wrap the entire request in error boundary
    if (!process.env.STRIPE_SECRET_KEY || !stripe) {
      throw new Error('Server configuration error: Missing Stripe credentials');
    }

    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json({ 
        error: 'Invalid JSON in request body',
        details: {
          message: parseError instanceof Error ? parseError.message : 'JSON parse error'
        }
      }, { status: 400 });
    }

    if (!body) {
      return NextResponse.json({ 
        error: 'Missing request body',
        details: { message: 'Request body is required' }
      }, { status: 400 });
    }

    const { customerInfo, paymentMethodId, frequency = 'monthly', pathParam, isAmbassador, isAmbassadorFee, marketingConsent } = body;

    // Validate required fields with detailed errors
    if (!customerInfo?.email) {
      return NextResponse.json({ 
        error: 'Validation error',
        details: { message: 'Customer email is required' }
      }, { status: 400 });
    }

    if (!paymentMethodId) {
      return NextResponse.json({ 
        error: 'Validation error',
        details: { message: 'Payment method ID is required' }
      }, { status: 400 });
    }

    // Enhanced debugging logs
    console.log('Processing checkout with details:', {
      frequency,
      pathParam,
      isAmbassador,
      email: customerInfo.email,
      hasPaymentMethod: !!paymentMethodId
    });

    // Validate pricing information
    const isMonthlySubscription = frequency.toLowerCase().trim() === 'monthly';
    
    // Determine the correct base price ID
    const basePriceId = isMonthlySubscription ? PRICE_IDS.monthly : PRICE_IDS.annual;
    console.log(`Using base price ID: ${basePriceId}`);
    
    if (!basePriceId) {
      console.error(`Missing base price ID for ${isMonthlySubscription ? 'monthly' : 'annual'} subscription`);
      return NextResponse.json({ 
        error: 'Server configuration error: Missing product pricing information' 
      }, { status: 500 });
    }

    // Validate country code - make sure it's a 2-letter code
    if (customerInfo.country && (
      typeof customerInfo.country !== 'string' || 
      customerInfo.country.length !== 2 ||
      !VALID_COUNTRY_CODES.includes(customerInfo.country.toUpperCase())
    )) {
      return NextResponse.json({ 
        error: 'Invalid country code. Please use a 2-letter country code (e.g., US, CA, GB)' 
      }, { status: 400 });
    }

    // Ensure country code is uppercase
    const country = customerInfo.country ? customerInfo.country.toUpperCase() : undefined;

    // Find or create a customer
    let customer;
    const existingCustomers = await stripe!.customers.list({
      email: customerInfo.email,
      limit: 1,
    });

    // Validate and process referral code if present
    let referralMetadata = {};
    if (pathParam) {
      try {
        // Look up the referring ambassador
        const referringCustomers = await stripe!.customers.list({
          limit: 1,
          metadata: {
            ambassadorCode: pathParam // Look for customer with this ambassador code
          }
        });

        if (referringCustomers.data.length > 0) {
          const referringCustomer = referringCustomers.data[0];
          referralMetadata = {
            referredBy: referringCustomer.id,
            referralCode: pathParam,
            referringEmail: referringCustomer.email
          };
          console.log('Found referring ambassador:', referringCustomer.id);
        } else {
          console.log('No ambassador found for code:', pathParam);
        }
      } catch (referralError) {
        console.error('Error processing referral code:', referralError);
        // Continue without referral if there's an error
      }
    }

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
      console.log(`Found existing customer: ${customer.id}`);
      
      // Update existing customer with new metadata
      const updatedCustomer = await stripe!.customers.update(customer.id, {
        metadata: {
          ...customer.metadata,
          ...referralMetadata,
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          streetAddress: customerInfo.streetAddress,
          city: customerInfo.city,
          state: customerInfo.state,
          postalCode: customerInfo.postalCode,
          country: customerInfo.country,
          isAmbassador: isAmbassador ? 'YES' : 'NO',
          phone: isAmbassador ? customerInfo.phone : undefined,
          ambassadorCode: isAmbassador ? pathParam : undefined,
          marketingConsent: marketingConsent ? 'YES' : 'NO',
          termsAgreed: 'YES' // Since they must agree to terms to submit
        }
      });
      console.log('Updated existing customer:', updatedCustomer.id);
    } else {
      customer = await stripe!.customers.create({
        email: customerInfo.email,
        metadata: {
          ...referralMetadata,
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          streetAddress: customerInfo.streetAddress,
          city: customerInfo.city,
          state: customerInfo.state,
          postalCode: customerInfo.postalCode,
          country: customerInfo.country,
          isAmbassador: isAmbassador ? 'YES' : 'NO',
          phone: isAmbassador ? customerInfo.phone : undefined,
          ambassadorCode: isAmbassador ? pathParam : undefined,
          marketingConsent: marketingConsent ? 'YES' : 'NO',
          termsAgreed: 'YES' // Since they must agree to terms to submit
        }
      });
      console.log('Created new customer:', customer.id);
    }

    // Attach the payment method to the customer
    await stripe!.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });

    // Set it as the default payment method
    await stripe!.customers.update(customer.id, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // First, create the main subscription
    const mainSubscriptionParams: any = {
      customer: customer.id,
      items: [{ price: basePriceId }],
      payment_behavior: 'allow_incomplete',
      default_payment_method: paymentMethodId,
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      metadata: {
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        firstName: customerInfo.firstName || '',
        lastName: customerInfo.lastName || '',
        customerEmail: customerInfo.email,
        referralCode: pathParam || '',
        sku: frequency.toLowerCase() === 'monthly' ? 'SKU_MONTHLY_47' : 'SKU_ANNUAL_397',
        isAmbassador: isAmbassador ? 'yes' : 'no',
      },
      expand: ['latest_invoice.payment_intent']
    };
    
    // Only add trial period if NOT an ambassador
    if (!isAmbassador) {
      mainSubscriptionParams.trial_period_days = 5;
    }
    
    const mainSubscription = await stripe!.subscriptions.create(mainSubscriptionParams);
    
    console.log(`Main subscription created: ${mainSubscription.id}`);
    
    // For ambassadors, create a separate subscription for the ambassador fee
    let ambassadorFeeSubscription = null;
    let ambassadorError = null;
    
    if (isAmbassador && isAmbassadorFee) {
      try {
        // Add a small delay before creating ambassador subscription to ensure main subscription is fully processed
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Use the ambassador fee price ID from environment variables
        const ambassadorPriceId = PRICE_IDS.ambassadorFee;
        
        if (!ambassadorPriceId) {
          throw new Error('Missing ambassador fee price ID. STRIPE_AMBASSADOR_FEE_PRICE_ID not configured.');
        }
        
        // Create a separate subscription for the ambassador fee
        ambassadorFeeSubscription = await stripe!.subscriptions.create({
          customer: customer.id,
          items: [{ price: ambassadorPriceId }],
          payment_behavior: 'default_incomplete', // Changed to default_incomplete
          default_payment_method: paymentMethodId,
          payment_settings: {
            payment_method_types: ['card'],
            save_default_payment_method: 'on_subscription',
          },
          metadata: {
            customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
            firstName: customerInfo.firstName || '',
            lastName: customerInfo.lastName || '',
            customerEmail: customerInfo.email,
            referralCode: pathParam || '',
            mainSubscriptionId: mainSubscription.id,
            sku: 'SKU_10_ANNUALFEE'
          },
          expand: ['latest_invoice.payment_intent']
        });
        
        console.log(`Ambassador fee subscription created: ${ambassadorFeeSubscription.id}`);
        
        // Update the main subscription with a reference to the ambassador fee subscription
        await stripe!.subscriptions.update(mainSubscription.id, {
          metadata: {
            ...mainSubscription.metadata,
            ambassadorFeeSubscriptionId: ambassadorFeeSubscription.id,
            ambassadorProgram: 'yes',
            ambassadorFee: '$10/year',
          }
        });
      } catch (feeError) {
        console.error('Error creating ambassador fee subscription:', feeError);
        ambassadorError = feeError;
        // Continue with the main subscription, but track the error
      }
    }
    
    console.log(`Subscription plan: ${mainSubscription.metadata.plan}`);
    console.log(`Ambassador status: ${mainSubscription.metadata.isAmbassador}`);
    console.log(`Trial period: ${!isAmbassador ? '5 days' : 'Bypassed (Ambassador)'}`);
    
    // Get the payment intents that need to be confirmed
    const mainPaymentIntent = mainSubscription.latest_invoice && 
      typeof mainSubscription.latest_invoice !== 'string' && 
      mainSubscription.latest_invoice.payment_intent;

    const ambassadorPaymentIntent = ambassadorFeeSubscription && 
      ambassadorFeeSubscription.latest_invoice && 
      typeof ambassadorFeeSubscription.latest_invoice !== 'string' && 
      ambassadorFeeSubscription.latest_invoice.payment_intent;

    // Return response with additional error information if ambassador subscription failed
    return NextResponse.json({
      success: true,
      subscriptionId: mainSubscription.id,
      frequency: frequency,
      mainPaymentIntentSecret: mainPaymentIntent && typeof mainPaymentIntent !== 'string' ? mainPaymentIntent.client_secret : null,
      ambassadorPaymentIntentSecret: ambassadorPaymentIntent && typeof ambassadorPaymentIntent !== 'string' ? ambassadorPaymentIntent.client_secret : null,
      ambassadorError: ambassadorError ? {
        message: ambassadorError.message,
        code: ambassadorError.code,
        type: ambassadorError.type
      } : null
    });
  } catch (error: any) {
    // Enhanced error handling with proper JSON structure
    console.error('Checkout error:', error);

    let statusCode = error.statusCode || 500;
    let errorResponse = {
      error: 'Checkout error',
      details: {
        message: error.message || 'An unexpected error occurred',
        type: error.type || 'unknown',
        code: error.code || 'unknown',
        param: error.param,
        decline_code: error.decline_code,
        payment_intent: error.payment_intent,
        payment_method: error.payment_method
      }
    };

    // Handle Stripe API errors specifically
    if (error.type?.startsWith('Stripe')) {
      errorResponse.details.stripeError = true;
      // Map common Stripe errors to user-friendly messages
      switch (error.code) {
        case 'card_declined':
          errorResponse.details.message = 'The card was declined. Please try another card.';
          statusCode = 402;
          break;
        case 'expired_card':
          errorResponse.details.message = 'The card has expired. Please try another card.';
          statusCode = 402;
          break;
        case 'incorrect_cvc':
          errorResponse.details.message = 'The card\'s security code is incorrect.';
          statusCode = 402;
          break;
        case 'processing_error':
          errorResponse.details.message = 'An error occurred while processing the card.';
          statusCode = 502;
          break;
        default:
          errorResponse.details.message = 'An error occurred while processing your payment.';
      }
    }

    // Clean up undefined values from details
    Object.keys(errorResponse.details).forEach(key => {
      if (errorResponse.details[key] === undefined) {
        delete errorResponse.details[key];
      }
    });

    return NextResponse.json(errorResponse, { status: statusCode });
  }
} 