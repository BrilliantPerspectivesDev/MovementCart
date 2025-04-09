import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customerInfo, selectedFrequency } = body;

    // Validate the request
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Please provide items to checkout' }, { status: 400 });
    }

    // Get the correct product ID based on the frequency
    let priceId;
    if (selectedFrequency === 'monthly') {
      // Use the monthly subscription product ID from environment variables
      priceId = process.env.STRIPE_MONTHLY_PRODUCT_ID; 
      if (!priceId) {
        return NextResponse.json({ error: 'Missing monthly product ID configuration' }, { status: 500 });
      }
    } else {
      // Default to annual subscription from environment variables
      priceId = process.env.STRIPE_ANNUAL_PRODUCT_ID;
      if (!priceId) {
        return NextResponse.json({ error: 'Missing annual product ID configuration' }, { status: 500 });
      }
    }

    // Prepare customer details if available
    const customerDetails = 
      (customerInfo?.firstName || customerInfo?.lastName || customerInfo?.email) 
        ? {
            name: customerInfo.firstName && customerInfo.lastName 
              ? `${customerInfo.firstName} ${customerInfo.lastName}` 
              : (customerInfo.firstName || customerInfo.lastName || undefined),
            email: customerInfo.email || undefined,
          }
        : undefined;
    
    // Create a Stripe checkout session for subscription
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product: priceId,
            recurring: {
              interval: selectedFrequency === 'monthly' ? 'month' : 'year',
            },
            unit_amount: selectedFrequency === 'monthly' ? 4700 : 39700, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      ...(customerDetails?.email && { customer_email: customerDetails.email }),
      billing_address_collection: 'required', // Always collect billing address for subscriptions
      // Include customer name and other metadata
      metadata: {
        ...(customerDetails?.name && { customer_name: customerDetails.name }),
        ...(body.pathParam && { pathParam: body.pathParam }),
        plan: selectedFrequency === 'monthly' ? 'Monthly Subscription' : 'Annual Subscription'
      },
      // Add a trial period if needed
      subscription_data: {
        trial_period_days: 5, // 5-day free trial
      }
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 });
  }
} 