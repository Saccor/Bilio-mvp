'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';

export default function DebugOAuth() {
  const supabase = createClient();
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    // Samla all debug-information
    const info = {
      currentOrigin: typeof window !== 'undefined' ? window.location.origin : 'N/A',
      currentUrl: typeof window !== 'undefined' ? window.location.href : 'N/A',
      expectedRedirectUri: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : 'N/A',
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'N/A',
      cookieEnabled: typeof window !== 'undefined' ? window.navigator.cookieEnabled : 'N/A',
    };
    setDebugInfo(info);
  }, []);

  const testOAuthUrl = async () => {
    try {
      // Försök att få OAuth URL utan att redirecta
      console.log('🔍 Testing OAuth URL generation...');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          skipBrowserRedirect: true, // Förhindra automatisk redirect
        }
      });

      console.log('OAuth response:', { data, error });
      
      if (data?.url) {
        setDebugInfo(prev => ({ 
          ...prev, 
          generatedOAuthUrl: data.url,
          oAuthUrlParams: new URL(data.url).searchParams.toString()
        }));
      }
      
      if (error) {
        setDebugInfo(prev => ({ ...prev, supabaseError: error.message }));
      }
    } catch (err: any) {
      setDebugInfo(prev => ({ ...prev, catchError: err.message }));
    }
  };

  const performActualLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">OAuth Debug Information</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Environment</h2>
          <div className="space-y-2 font-mono text-sm">
            {Object.entries(debugInfo).map(([key, value]) => (
              <div key={key} className="flex">
                <span className="font-bold w-48 text-blue-600">{key}:</span>
                <span className="break-all text-gray-800">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test OAuth URL Generation</h2>
          <button
            onClick={testOAuthUrl}
            className="bg-blue-600 text-white px-4 py-2 rounded mr-4 hover:bg-blue-700"
          >
            Test OAuth URL (No Redirect)
          </button>
          <button
            onClick={performActualLogin}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Perform Actual Login
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Configuration Checklist</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-blue-700">✅ 1. Supabase Environment Variables</h3>
              <p className="text-sm text-gray-600">Environment variables are correctly set</p>
              <div className="bg-gray-100 p-2 rounded font-mono text-xs mt-2">
                NEXT_PUBLIC_SUPABASE_URL: {debugInfo.supabaseUrl ? '✅ Set' : '❌ Missing'}
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-semibold text-yellow-700">⚠️ 2. Google OAuth in Supabase Dashboard</h3>
              <p className="text-sm text-gray-600">Configure these in Supabase Dashboard → Authentication → Providers → Google:</p>
              <div className="bg-yellow-50 p-3 rounded mt-2">
                <p className="text-sm font-semibold">Client ID:</p>
                <p className="font-mono text-xs">1034787364228-u6jjkg9nf8p68jd5g43ue91sajl79j6f.apps.googleusercontent.com</p>
                <p className="text-sm font-semibold mt-2">Client Secret:</p>
                <p className="font-mono text-xs">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</p>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-green-700">✅ 3. Google Cloud Console URLs</h3>
              <p className="text-sm text-gray-600">These should already be configured:</p>
              
              <p className="text-sm font-semibold mt-3">Authorized redirect URIs:</p>
              <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                <div>https://jdkmwxbrztskaiwpcjfi.supabase.co/auth/v1/callback</div>
                <div>http://localhost:3000/auth/callback</div>
              </div>
              
              <p className="text-sm font-semibold mt-3">Authorized JavaScript origins:</p>
              <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                <div>https://jdkmwxbrztskaiwpcjfi.supabase.co</div>
                <div>http://localhost:3000</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <a href="/login" className="text-blue-600 hover:text-blue-800">← Tillbaka till login</a>
        </div>
      </div>
    </div>
  );
}