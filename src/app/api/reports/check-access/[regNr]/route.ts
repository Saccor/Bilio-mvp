import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { regNr: string } }) {
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
      return NextResponse.json({ 
        hasAccess: false, 
        isLoggedIn: false 
      });
    }

    const registrationNumber = params.regNr;
    const url = new URL(request.url);
    const reportType = url.searchParams.get('type') || 'single';

    // Check if user has unlocked this report
    const { data: report } = await supabase
      .from('vehicle_reports')
      .select('unlocked_at, credits_used')
      .eq('user_id', user.id)
      .eq('registration_number', registrationNumber)
      .eq('report_type', reportType)
      .maybeSingle();

    const hasAccess = Boolean(report?.unlocked_at);

    return NextResponse.json({
      hasAccess,
      isLoggedIn: true,
      unlockedAt: report?.unlocked_at || null,
      creditsUsed: report?.credits_used || null
    });

  } catch (error) {
    console.error('Error checking report access:', error);
    return NextResponse.json({ 
      hasAccess: false, 
      isLoggedIn: false,
      error: 'Failed to check access' 
    });
  }
}