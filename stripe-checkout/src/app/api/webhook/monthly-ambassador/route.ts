import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory store for demo purposes. In production, use a database
const detailsStore = new Map<string, any>();

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.subscriptionId || !body.details) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate details object
    const { email, password, ambassadorCode } = body.details;
    if (!email || !password || !ambassadorCode) {
      return NextResponse.json(
        { error: 'Missing required details' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Validate the subscription with Stripe
    // 2. Create the user account
    // 3. Store the ambassador code
    // 4. Send welcome email
    // For now, we'll just return success

    return NextResponse.json({
      success: true,
      subscriptionId: body.subscriptionId,
      details: {
        email: body.details.email,
        password: body.details.password,
        ambassadorCode: body.details.ambassadorCode
      }
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Invalid payload' },
      { status: 400 }
    );
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