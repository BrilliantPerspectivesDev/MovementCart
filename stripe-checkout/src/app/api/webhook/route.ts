import { NextResponse } from 'next/server';
import { storeLoginDetails } from '../login-details/route';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Verify webhook signature if needed
    // const signature = req.headers.get('x-webhook-signature');
    
    // Expect data in format: { subscriptionId: string, details: { email, password, ambassadorCode } }
    if (!data.subscriptionId || !data.details) {
      return NextResponse.json(
        { error: 'Invalid webhook payload format' },
        { status: 400 }
      );
    }

    // Store the login details
    storeLoginDetails(data.subscriptionId, data.details);
    console.log('Stored login details for subscription:', data.subscriptionId);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Invalid webhook payload' },
      { status: 400 }
    );
  }
} 