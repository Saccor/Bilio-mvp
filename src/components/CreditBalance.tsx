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
  const supabase = createClient();

  useEffect(() => {
    fetchCreditBalance();
  }, []);

  const fetchCreditBalance = async () => {
    try {
      const response = await fetch('/api/credits/balance');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch credits');
      }

      setCredits(data.credits);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching credit balance:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="animate-spin w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full"></div>
        <span className="text-sm text-gray-500">Laddar krediter...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-sm text-red-600 ${className}`}>
        Fel vid laddning av krediter
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">₭</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">
            {credits?.toLocaleString('sv-SE') || '0'} krediter
          </span>
          <span className="text-xs text-gray-500">
            1 kredit = 1 analys
          </span>
        </div>
      </div>

      {showPurchaseLink && (
        <a
          href="/credits/purchase"
          className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 px-2 py-1 rounded-full transition-colors"
        >
          Köp krediter
        </a>
      )}
    </div>
  );
}