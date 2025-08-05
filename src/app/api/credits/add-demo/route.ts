import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { amount } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Add credits using the add_credits function
    const { data: result, error: creditError } = await supabase.rpc('add_credits', {
      user_id: user.id,
      credit_amount: amount,
      transaction_description: `Demo påfyllning: ${amount} krediter`,
      reference_id: `demo-${Date.now()}`
    });

    if (creditError || !result?.success) {
      console.error('Error adding credits:', creditError);
      return NextResponse.json({ 
        error: result?.error || 'Failed to add credits' 
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      credits_added: amount,
      new_balance: result.new_balance,
      message: `${amount} krediter tillagda!`
    });

  } catch (error) {
    console.error('Error in add-demo credits:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}