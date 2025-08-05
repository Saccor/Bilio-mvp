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

    // Get all active credit packages
    const { data: packages, error } = await supabase
      .from('credit_packages')
      .select('*')
      .eq('is_active', true)
      .order('price_sek', { ascending: true });

    if (error) {
      console.error('Error fetching credit packages:', error);
      return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
    }

    // Format prices for display
    const formattedPackages = packages.map(pkg => ({
      ...pkg,
      price_kr: pkg.price_sek / 100, // Convert öre to kronor
      price_display: `${(pkg.price_sek / 100).toLocaleString('sv-SE')} kr`
    }));

    return NextResponse.json({ packages: formattedPackages });

  } catch (error) {
    console.error('Error in credits/packages:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}