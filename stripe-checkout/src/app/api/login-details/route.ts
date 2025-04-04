import { NextResponse } from 'next/server';

// In a real implementation, you would store this in a database or cache
const loginDetailsStore = new Map<string, any>();

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const subscriptionId = searchParams.get('subscriptionId');

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Subscription ID is required' },
        { status: 400 }
      );
    }

    // Check if we have login details for this subscription
    const details = loginDetailsStore.get(subscriptionId);

    if (!details) {
      return NextResponse.json({ success: true, details: null });
    }

    return NextResponse.json({ success: true, details });
  } catch (error) {
    console.error('Error retrieving login details:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve login details' },
      { status: 500 }
    );
  }
}

// This function would be called by your webhook handler when Zapier sends the data
export function storeLoginDetails(subscriptionId: string, details: any) {
  loginDetailsStore.set(subscriptionId, details);
} 