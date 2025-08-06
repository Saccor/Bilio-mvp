'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';

interface CreditBalanceProps {
  showPurchaseLink?: boolean;
  className?: string;
}

export default function CreditBalance({ showPurchaseLink = true, className = '' }: CreditBalanceProps) {
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
    
    // Check if user is authenticated before fetching credits
    const checkAuthAndFetchCredits = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        fetchCreditBalance();
      } else {
        setLoading(false);
        setError('Not authenticated');
      }
    };

    checkAuthAndFetchCredits();

    // Listen for credit updates
    const handleCreditsUpdated = (event: CustomEvent) => {
      const { remainingCredits } = event.detail;
      if (typeof remainingCredits === 'number') {
        setCredits(remainingCredits);
      }
    };

    window.addEventListener('creditsUpdated', handleCreditsUpdated as EventListener);

    return () => {
      window.removeEventListener('creditsUpdated', handleCreditsUpdated as EventListener);
    };
  }, [supabase]);

  const fetchCreditBalance = async () => {
    try {
      const response = await fetch('/api/credits/balance');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch credits');
      }

      setCredits(data.credits);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      console.error('Error fetching credit balance:', err);
    } finally {
      setLoading(false);
    }
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted || loading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full"></div>
        <span className="text-sm text-gray-500">Laddar krediter...</span>
      </div>
    );
  }

  if (error) {
    // For authentication issues, show a login prompt instead of hiding
    if (error === 'Not authenticated') {
      return (
        <div className={`flex items-center space-x-2 ${className}`}>
          <span className="text-sm text-gray-500">
            <a href="/login" className="text-orange-600 hover:text-orange-700">
              Logga in för att se krediter
            </a>
          </span>
        </div>
      );
    }
    return (
      <div className={`text-sm text-red-600 ${className}`}>
        Fel vid laddning av krediter
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="flex items-center space-x-3">
        <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-sm text-gray-700 font-medium">₭</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">
            {credits?.toLocaleString('sv-SE') || '0'} krediter
          </span>
        </div>
      </div>

      {showPurchaseLink && (
        <a
          href="/credits/purchase"
          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition-colors font-medium"
        >
          Köp krediter
        </a>
      )}
    </div>
  );
}