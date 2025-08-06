import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ regNr: string }> }) {
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

    const { regNr } = await params;
    const registrationNumber = regNr;
    const url = new URL(request.url);
    const reportType = url.searchParams.get('type') || 'single';
    const sessionId = url.searchParams.get('sessionId'); // För att identifiera specifik sökning

    // För MVP: Varje sökning kräver ny betalning
    // Användare kan bara se gamla rapporter via dashboard (utan sessionId)
    
    if (sessionId) {
      // Ny sökning - kräver alltid betalning
      // Kolla om denna specifika session är betald
      const { data: report } = await supabase
        .from('vehicle_reports')
        .select('unlocked_at, credits_used, id')
        .eq('user_id', user.id)
        .eq('registration_number', registrationNumber)
        .eq('report_type', reportType)
        .ilike('report_data->sessionId', sessionId)
        .maybeSingle();

      const hasAccess = Boolean(report?.unlocked_at);

      return NextResponse.json({
        hasAccess,
        isLoggedIn: true,
        unlockedAt: report?.unlocked_at || null,
        creditsUsed: report?.credits_used || null,
        isNewSearch: true
      });
    } else {
      // Dashboard access - visa senaste betalda rapporten för detta regnr
      const { data: report } = await supabase
        .from('vehicle_reports')
        .select('unlocked_at, credits_used, id, created_at')
        .eq('user_id', user.id)
        .eq('registration_number', registrationNumber)
        .eq('report_type', reportType)
        .not('unlocked_at', 'is', null)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      const hasAccess = Boolean(report?.unlocked_at);

      return NextResponse.json({
        hasAccess,
        isLoggedIn: true,
        unlockedAt: report?.unlocked_at || null,
        creditsUsed: report?.credits_used || null,
        isNewSearch: false,
        isDashboardAccess: true
      });
    }

  } catch (error) {
    console.error('Error checking report access:', error);
    return NextResponse.json({ 
      hasAccess: false, 
      isLoggedIn: false,
      error: 'Failed to check access' 
    });
  }
}