import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16',
  });
}

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // Check if Stripe is initialized
    if (!stripe) {
      return NextResponse.json({
        error: 'Server configuration error: Missing Stripe credentials'
      }, { status: 500 });
    }

    // Get ambassador fee price ID from environment variables
    const ambassadorFeePriceId = process.env.STRIPE_AMBASSADOR_FEE_PRICE_ID;
    if (!ambassadorFeePriceId) {
      return NextResponse.json({
        error: 'Server configuration error: Missing ambassador fee price ID'
      }, { status: 500 });
    }

    // Parse the request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json({
        error: 'Invalid JSON in request body'
      }, { status: 400 });
    }

    const { customerInfo, paymentMethodId, pathParam, marketingConsent } = body;

    // Validate required fields
    if (!customerInfo?.email) {
      return NextResponse.json({
        error: 'Customer email is required'
      }, { status: 400 });
    }

    if (!paymentMethodId) {
      return NextResponse.json({
        error: 'Payment method ID is required'
      }, { status: 400 });
    }

    console.log('Processing ambassador-only checkout:', {
      email: customerInfo.email,
      hasPaymentMethod: !!paymentMethodId,
      referralCode: pathParam || 'None'
    });

    // Enforce US-only restriction for ambassador program
    if (customerInfo.country && customerInfo.country.toUpperCase() !== 'US') {
      return NextResponse.json({
        error: 'The ambassador program is currently only available to residents of the United States.'
      }, { status: 400 });
    }

    // Process any referral metadata
    let referralMetadata = {};
    if (pathParam) {
      try {
        // Look up the referring ambassador
        const referringCustomers = await stripe.customers.list({
          email: pathParam, // First try looking up by email
          limit: 1,
        });

        if (referringCustomers.data.length > 0) {
          const referringCustomer = referringCustomers.data[0];
          referralMetadata = {
            referredBy: referringCustomer.id,
            referralCode: pathParam,
            referringEmail: referringCustomer.email
          };
          console.log('Found referring ambassador by email:', referringCustomer.id);
        } else {
          // Try looking up by ambassador code
          const codeCustomers = await stripe.customers.list({
            limit: 10, // Increase limit to search more customers
          });
          
          // Find a customer with matching ambassador code in metadata
          const matchingCustomer = codeCustomers.data.find(
            c => c.metadata?.ambassadorCode === pathParam
          );
          
          if (matchingCustomer) {
            referralMetadata = {
              referredBy: matchingCustomer.id,
              referralCode: pathParam,
              referringEmail: matchingCustomer.email
            };
            console.log('Found referring ambassador by code:', matchingCustomer.id);
          } else {
            console.log('No ambassador found for code:', pathParam);
          }
        }
      } catch (referralError) {
        console.error('Error processing referral code:', referralError);
        // Continue without referral if there's an error
      }
    }

    // Check if customer already exists
    let customer;
    const existingCustomers = await stripe.customers.list({
      email: customerInfo.email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
      console.log(`Found existing customer: ${customer.id}`);
      
      // Update existing customer with ambassador metadata
      customer = await stripe.customers.update(customer.id, {
        metadata: {
          ...customer.metadata,
          ...referralMetadata,
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          streetAddress: customerInfo.address || customerInfo.streetAddress, // Accept either field name
          city: customerInfo.city,
          state: customerInfo.state,
          postalCode: customerInfo.zipCode || customerInfo.postalCode, // Accept either field name
          country: customerInfo.country,
          isAmbassador: 'YES',
          phone: customerInfo.phone,
          marketingConsent: marketingConsent ? 'YES' : 'NO',
          termsAgreed: 'YES',
          ambassadorOnly: 'YES' // Flag to indicate ambassador-only account
        }
      });
    } else {
      // Create a new customer
      customer = await stripe.customers.create({
        email: customerInfo.email,
        metadata: {
          ...referralMetadata,
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          streetAddress: customerInfo.address || customerInfo.streetAddress, // Accept either field name
          city: customerInfo.city,
          state: customerInfo.state,
          postalCode: customerInfo.zipCode || customerInfo.postalCode, // Accept either field name
          country: customerInfo.country,
          isAmbassador: 'YES',
          phone: customerInfo.phone,
          marketingConsent: marketingConsent ? 'YES' : 'NO',
          termsAgreed: 'YES',
          ambassadorOnly: 'YES' // Flag to indicate ambassador-only account
        }
      });
      console.log('Created new customer:', customer.id);
    }

    // Attach the payment method to the customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });

    // Set as default payment method
    await stripe.customers.update(customer.id, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Create ambassador fee subscription
    const ambassadorSubscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: ambassadorFeePriceId }],
      payment_behavior: 'default_incomplete',
      default_payment_method: paymentMethodId,
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      metadata: {
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customerEmail: customerInfo.email,
        referralCode: pathParam || '',
        sku: 'SKU_10_ANNUALFEE',
        ambassadorOnly: 'YES',
        source: 'Ambassador Only Funnel'
      },
      expand: ['latest_invoice.payment_intent']
    });

    console.log(`Ambassador fee subscription created: ${ambassadorSubscription.id}`);

    // Check if payment requires confirmation
    const paymentIntent = ambassadorSubscription.latest_invoice && 
      typeof ambassadorSubscription.latest_invoice !== 'string' && 
      ambassadorSubscription.latest_invoice.payment_intent;

    return NextResponse.json({
      success: true,
      subscriptionId: ambassadorSubscription.id,
      paymentIntentSecret: paymentIntent && typeof paymentIntent !== 'string' ? paymentIntent.client_secret : null
    });

  } catch (error: any) {
    console.error('Ambassador-only checkout error:', error);
    
    return NextResponse.json({
      error: error.message || 'An unexpected error occurred during checkout'
    }, { status: error.statusCode || 500 });
  }
} 