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
    const { amount, description, reference_id } = body;

    // Validate input
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid credit amount' }, { status: 400 });
    }

    if (!description) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }

    // Use the Supabase function to deduct credits atomically
    const { data, error } = await supabase.rpc('use_credits', {
      user_id: user.id,
      credit_amount: amount,
      transaction_description: description,
      reference_id: reference_id || null
    });

    if (error) {
      console.error('Error using credits:', error);
      return NextResponse.json({ error: 'Failed to use credits' }, { status: 500 });
    }

    // Check if the function returned an error
    if (!data.success) {
      return NextResponse.json({ 
        error: data.error,
        current_credits: data.current_credits,
        required_credits: data.required_credits
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      remaining_credits: data.remaining_credits,
      credits_used: data.credits_used
    });

  } catch (error) {
    console.error('Error in credits/use:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}