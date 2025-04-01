import { NextResponse } from 'next/server';

// In-memory store for demo purposes. In production, use a database
const detailsStore = new Map<string, any>();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const subscriptionId = data.subscriptionId;
    
    if (!subscriptionId) {
      return NextResponse.json({ error: 'Missing subscription ID' }, { status: 400 });
    }

    // Store the details for this subscription
    detailsStore.set(subscriptionId, data);
    console.log('Stored annual ambassador details for:', subscriptionId);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Annual Ambassador webhook error:', error);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const subscriptionId = searchParams.get('subscriptionId');

  if (!subscriptionId) {
    return NextResponse.json({ error: 'Missing subscription ID' }, { status: 400 });
  }

  const details = detailsStore.get(subscriptionId);
  return NextResponse.json({ success: true, details });
} 