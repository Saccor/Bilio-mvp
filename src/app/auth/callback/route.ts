import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const errorDescription = requestUrl.searchParams.get('error_description');

  console.log('🔍 AUTH CALLBACK DEBUG:', {
    url: requestUrl.href,
    code: code ? 'Present' : 'Missing',
    error,
    errorDescription,
    searchParams: Object.fromEntries(requestUrl.searchParams.entries())
  });

  if (error) {
    console.error('❌ OAuth Error in callback:', { error, errorDescription });
    return NextResponse.redirect(`${requestUrl.origin}/login?error=${encodeURIComponent(error)}&description=${encodeURIComponent(errorDescription || '')}`);
  }

  if (code) {
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
            set(name: string, value: string, options: any) {
              cookieStore.set({ name, value, ...options });
            },
            remove(name: string, options: any) {
              cookieStore.set({ name, value: '', ...options });
            },
          },
        }
      );
      
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      
      if (exchangeError) {
        console.error('❌ Error exchanging code for session:', exchangeError);
        return NextResponse.redirect(`${requestUrl.origin}/login?error=exchange_failed`);
      }

      console.log('✅ Successfully exchanged code for session');
      
    } catch (err) {
      console.error('❌ Unexpected error in auth callback:', err);
      return NextResponse.redirect(`${requestUrl.origin}/login?error=unexpected_error`);
    }
  }

  // Redirect to home page after successful login
  return NextResponse.redirect(requestUrl.origin);
} 