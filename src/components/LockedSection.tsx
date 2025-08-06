'use client';
import { useState, useEffect } from 'react';
import { useUnlock } from '@/contexts/UnlockContext';
import { createClient } from '@/lib/supabaseClient';

interface LockedSectionProps {
  children: React.ReactNode;
  sectionName: string;
  className?: string;
}

export default function LockedSection({ 
  children, 
  sectionName, 
  className = '' 
}: LockedSectionProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unlocking, setUnlocking] = useState(false);
  
  const { isUnlocked, unlockReport } = useUnlock();
  const supabase = createClient();

  // Check login status on mount
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setIsLoggedIn(!!user);
      } catch (error) {
        console.error('Error checking login:', error);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, [supabase.auth]);

  const handleUnlock = async () => {
    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }

    setUnlocking(true);
    
    try {
      // Get current page params to determine registration number and report type
      const urlParams = new URLSearchParams(window.location.search);
      const regnr = urlParams.get('regnr') || '';
      const compareRegnr = urlParams.get('compare');
      const reportType = compareRegnr ? 'comparison' : 'single';

      const success = await unlockReport(regnr, reportType, undefined, compareRegnr);

      if (success) {
        // Success - everything is now unlocked!
        // The context will handle updating the UI
      } else {
        // Check if user has enough credits
        const response = await fetch('/api/credits/balance');
        const data = await response.json();
        
        if (data.credits < 1) {
          // Redirect to purchase page if no credits
          window.location.href = '/credits/purchase';
        } else {
          alert('Ett fel uppstod vid upplåsning. Försök igen.');
        }
      }
    } catch (error) {
      console.error('Error unlocking report:', error);
      alert('Ett fel uppstod. Försök igen.');
    } finally {
      setUnlocking(false);
    }
  };

  if (loading) {
    return (
      <div className={`relative ${className}`}>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="animate-pulse p-6">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isUnlocked) {
    return <div className={className}>{children}</div>;
  }

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Blurred content */}
        <div className="filter blur-sm select-none pointer-events-none">
          {children}
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white/90 rounded-2xl flex items-center justify-center">
          <div className="text-center p-6 bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm max-w-sm">
            <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {sectionName}
            </h3>
            
            <p className="text-sm text-gray-600 mb-5">
              Få tillgång till fullständig information med 1 kredit
            </p>

            <button
              onClick={handleUnlock}
              disabled={unlocking}
              className="locked-section-trigger bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white px-6 py-2.5 rounded-lg font-medium transition-colors text-sm disabled:cursor-not-allowed"
            >
              {unlocking ? (
                <div className="flex items-center">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Låser upp...
                </div>
              ) : isLoggedIn ? (
                'Lås upp för en kredit'
              ) : (
                'Logga in & lås upp'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}