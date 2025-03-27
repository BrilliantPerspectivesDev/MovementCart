import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body;

    // Validate the request
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Please provide items to checkout' }, { status: 400 });
    }

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
          description: item.description || '',
        },
        unit_amount: Math.round(item.price * 100), // Stripe requires amounts in cents
      },
      quantity: item.quantity || 1,
    }));

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 });
  }
} 