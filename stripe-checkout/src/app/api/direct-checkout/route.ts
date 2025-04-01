import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key only if it exists
// This prevents build errors when environment variables aren't available
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-02-24.acacia',
  });
}

// Cache for price IDs to reduce unnecessary API calls
const PRICE_CACHE: Record<string, string> = {};

// Price IDs - using environment variables only
const PRICE_IDS = {
  monthly: process.env.STRIPE_MONTHLY_PRICE_ID || 'price_1QzGjMEWsQ0IpmHORqlY8Rjv', // Fallback to provided monthly price ID
  annual: process.env.STRIPE_ANNUAL_PRICE_ID || 'price_1QzH6PEWsQ0IpmHOuuSCowDt', // Fallback to provided annual price ID
  // Ambassador fee price ID - the specific $10/year fee
  ambassadorFee: 'price_1R42MJEWsQ0IpmHOWcDQ5KvC'
};

// Log environment variables for debugging (excluding any sensitive values)
console.log('Environment variables check:', {
  STRIPE_MONTHLY_PRODUCT_ID: process.env.STRIPE_MONTHLY_PRODUCT_ID ? 'Set' : 'Not set',
  STRIPE_ANNUAL_PRODUCT_ID: process.env.STRIPE_ANNUAL_PRODUCT_ID ? 'Set' : 'Not set',
  STRIPE_MONTHLY_PRICE_ID: process.env.STRIPE_MONTHLY_PRICE_ID ? 'Set' : 'Not set',
  STRIPE_ANNUAL_PRICE_ID: process.env.STRIPE_ANNUAL_PRICE_ID ? 'Set' : 'Not set',
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

/**
 * API endpoint to handle direct checkout with Stripe Elements
 */
export async function POST(request: Request) {
  try {
    // Check for critical environment variables
    if (!process.env.STRIPE_SECRET_KEY || !stripe) {
      console.error('STRIPE_SECRET_KEY is not defined in environment variables');
      return NextResponse.json({ error: 'Server configuration error: Missing Stripe credentials' }, { status: 500 });
    }

    const { customerInfo, paymentMethodId, frequency = 'monthly', pathParam, isAmbassador, ambassadorPriceId } = await request.json();
    
    // Enhanced debugging logs
    console.log(`Received subscription frequency (raw): "${frequency}"`);
    console.log(`Received referral path param: "${pathParam}"`);
    console.log(`Ambassador program: ${isAmbassador ? 'Yes' : 'No'}`);
    if (isAmbassador) {
      console.log(`Ambassador fee price ID: ${PRICE_IDS.ambassadorFee}`);
    }

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

    if (!customerInfo?.email) {
      return NextResponse.json({ error: 'Customer email is required' }, { status: 400 });
    }

    if (!paymentMethodId) {
      return NextResponse.json({ error: 'Payment method ID is required' }, { status: 400 });
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

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
      console.log(`Found existing customer: ${customer.id}`);
      
      // Update customer with latest information
      customer = await stripe!.customers.update(customer.id, {
        name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        address: {
          line1: customerInfo.streetAddress,
          city: customerInfo.city,
          state: customerInfo.state,
          postal_code: customerInfo.postalCode,
          country: country,
        },
        metadata: {
          ...customer.metadata,
          firstName: customerInfo.firstName || '',
          lastName: customerInfo.lastName || '',
          updatedAt: new Date().toISOString(),
          affiliateCode: pathParam || '',  // Store referral code in customer metadata
        }
      });
    } else {
      customer = await stripe!.customers.create({
        email: customerInfo.email,
        name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        address: {
          line1: customerInfo.streetAddress,
          city: customerInfo.city,
          state: customerInfo.state,
          postal_code: customerInfo.postalCode,
          country: country,
        },
        metadata: {
          firstName: customerInfo.firstName || '',
          lastName: customerInfo.lastName || '',
          createdAt: new Date().toISOString(),
          affiliateCode: pathParam || '',  // Store referral code in customer metadata
        }
      });
      console.log(`Created new customer: ${customer.id}`);
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
    
    if (isAmbassador && ambassadorPriceId) {
      try {
        // Create a separate subscription for the ambassador fee
        ambassadorFeeSubscription = await stripe!.subscriptions.create({
          customer: customer.id,
          items: [{ price: ambassadorPriceId }],
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
        // Continue anyway with the main subscription
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

    // Return all necessary information for the frontend to handle payment confirmation
    return NextResponse.json({
      success: true,
      subscriptionId: mainSubscription.id,
      mainPaymentIntentSecret: typeof mainPaymentIntent !== 'string' ? mainPaymentIntent?.client_secret : null,
      ambassadorPaymentIntentSecret: typeof ambassadorPaymentIntent !== 'string' ? ambassadorPaymentIntent?.client_secret : null
    });
  } catch (error: any) {
    console.error('Subscription creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create subscription' },
      { status: 500 }
    );
  }
} 