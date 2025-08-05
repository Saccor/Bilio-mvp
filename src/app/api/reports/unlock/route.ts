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
    const { registration_number, report_type = 'single' } = body;

    if (!registration_number) {
      return NextResponse.json({ error: 'Registration number is required' }, { status: 400 });
    }

    // Check if user already has access to this report
    const { data: existingReport } = await supabase
      .from('vehicle_reports')
      .select('id, unlocked_at')
      .eq('user_id', user.id)
      .eq('registration_number', registration_number)
      .eq('report_type', report_type)
      .maybeSingle();

    if (existingReport?.unlocked_at) {
      return NextResponse.json({ 
        success: true, 
        message: 'Report already unlocked',
        already_unlocked: true 
      });
    }

    // Use 1 credit to unlock the report
    const { data: creditResult, error: creditError } = await supabase.rpc('use_credits', {
      user_id: user.id,
      credit_amount: 1,
      transaction_description: `Bilanalys: ${registration_number}`,
      reference_id: registration_number
    });

    if (creditError || !creditResult?.success) {
      return NextResponse.json({ 
        error: creditResult?.error || 'Failed to use credits',
        current_credits: creditResult?.current_credits
      }, { status: 400 });
    }

    // Record the unlock in vehicle_reports
    const reportData = {
      user_id: user.id,
      registration_number,
      report_type,
      credits_used: 1,
      unlocked_at: new Date().toISOString(),
      unlock_type: report_type === 'comparison' ? 'comparison_unlock' : 'single_unlock',
      report_data: { unlocked: true, timestamp: new Date().toISOString() }
    };

    if (existingReport) {
      // Update existing report
      const { error: updateError } = await supabase
        .from('vehicle_reports')
        .update(reportData)
        .eq('id', existingReport.id);

      if (updateError) {
        console.error('Error updating report:', updateError);
        // Note: Credits already deducted, so we don't fail here
      }
    } else {
      // Create new report record
      const { error: insertError } = await supabase
        .from('vehicle_reports')
        .insert(reportData);

      if (insertError) {
        console.error('Error creating report record:', insertError);
        // Note: Credits already deducted, so we don't fail here
      }
    }

    return NextResponse.json({
      success: true,
      remaining_credits: creditResult.remaining_credits,
      message: 'Report unlocked successfully'
    });

  } catch (error) {
    console.error('Error in reports/unlock:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}