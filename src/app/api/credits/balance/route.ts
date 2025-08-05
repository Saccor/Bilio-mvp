import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
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

    // Get user profile with credits
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('credits, email, full_name')
      .eq('id', user.id)
      .single();

    if (profileError) {
      // If profile doesn't exist, create it
      if (profileError.code === 'PGRST116') {
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email!,
            full_name: user.user_metadata?.full_name || user.user_metadata?.name || 'Användare',
            credits: 0
          })
          .select('credits, email, full_name')
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
          return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
        }

        return NextResponse.json({
          credits: newProfile.credits,
          email: newProfile.email,
          full_name: newProfile.full_name
        });
      }

      console.error('Error fetching profile:', profileError);
      return NextResponse.json({ error: 'Failed to fetch credits' }, { status: 500 });
    }

    return NextResponse.json({
      credits: profile.credits,
      email: profile.email,
      full_name: profile.full_name
    });

  } catch (error) {
    console.error('Error in credits/balance:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}