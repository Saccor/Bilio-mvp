'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

interface VehicleReport {
  id: string;
  registration_number: string;
  report_type: 'single' | 'comparison';
  comparison_registration?: string;
  created_at: string;
}

interface CreditTransaction {
  id: string;
  credits: number;
  transaction_type: 'purchase' | 'usage';
  description: string;
  created_at: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<number>(0);
  const [totalPurchased, setTotalPurchased] = useState<number>(0);
  const [recentAnalyses, setRecentAnalyses] = useState<VehicleReport[]>([]);
  const [creditHistory, setCreditHistory] = useState<CreditTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchUserData();
    }
  }, [mounted]);

  const fetchUserData = async () => {
    try {
      // Get user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      setUser(user);

      // Fetch credits
      const response = await fetch('/api/credits/balance');
      if (response.ok) {
        const data = await response.json();
        setCredits(data.credits);
      }

      // Fetch recent vehicle reports
      const { data: vehicleReports, error: reportsError } = await supabase
        .from('vehicle_reports')
        .select('id, registration_number, comparison_registration, report_type, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (reportsError) {
        console.error('Error fetching vehicle reports:', reportsError);
      } else {
        setRecentAnalyses(vehicleReports || []);
      }

      // Fetch credit transactions
      const { data: transactions, error: transactionsError } = await supabase
        .from('credit_transactions')
        .select('id, type, amount, description, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (transactionsError) {
        console.error('Error fetching credit transactions:', transactionsError);
      } else {
        // Transform transactions to match our interface
        const transformedTransactions: CreditTransaction[] = (transactions || []).map(t => ({
          id: t.id,
          credits: t.amount,
          transaction_type: t.type as 'purchase' | 'usage',
          description: t.description,
          created_at: t.created_at
        }));
        setCreditHistory(transformedTransactions);

        // Calculate total purchased credits
        const totalPurchasedAmount = (transactions || [])
          .filter(t => t.type === 'purchase')
          .reduce((sum, t) => sum + t.amount, 0);
        setTotalPurchased(totalPurchasedAmount);
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE');
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Logga in för att se din dashboard</h1>
          <Link href="/login" className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Logga in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="bg-slate-800 rounded-2xl p-6 sm:p-8 mb-8 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Välkommen tillbaka!</h1>
          <p className="text-slate-300">
            Här har du överblick över dina bilanalyser och kontoaktivitet
          </p>
        </div>

        {/* Credits Section */}
        <div className="bg-slate-800 rounded-2xl p-6 sm:p-8 mb-8 text-white">
          <div className="flex items-center mb-4">
            <div className="bg-white/10 rounded-lg p-3 mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Dina krediter</h2>
              <p className="text-slate-300 text-sm">Använd för analyser och jämförelser</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{credits}</div>
              <div className="text-slate-300 text-sm">Krediter kvar</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{totalPurchased}</div>
              <div className="text-slate-300 text-sm">Köpta krediter</div>
            </div>
          </div>

          <Link 
            href="/credits/purchase"
            className="w-full bg-white text-slate-800 py-3 px-4 rounded-lg flex items-center justify-center font-medium hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Köp krediter
          </Link>

          <div className="mt-4 bg-blue-500/10 border border-blue-400/20 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-blue-300 mb-1">Så fungerar krediter</h3>
                <p className="text-xs text-blue-200">Krediter används för att få djupgående analyser av bilar. En analys kostar 1 kredit, en jämförelse mellan två bilar kostar 2 krediter.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Snabbåtgärder</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link 
              href="/"
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
            >
              <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ny bilanalys</h3>
              <p className="text-sm text-gray-600">Analysera en ny bil eller jämför två bilar</p>
            </Link>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="bg-green-100 rounded-lg p-3 w-fit mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Visa analyser</h3>
              <p className="text-sm text-gray-600">Se dina tidigare bilanalyser och jämförelser</p>
            </div>

            <Link 
              href="/credits/purchase"
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group"
            >
              <div className="bg-purple-100 rounded-lg p-3 w-fit mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Köp krediter</h3>
              <p className="text-sm text-gray-600">Ladda upp ditt konto med fler analyskrediter</p>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Previous Analyses */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4" />
                </svg>
                Tidigare analyser
              </h2>
              <span className="text-sm text-gray-500">{recentAnalyses.length} st</span>
            </div>

            <div className="space-y-3">
              {recentAnalyses.map((analysis) => {
                // Build the URL for this analysis
                const analysisUrl = analysis.report_type === 'comparison' 
                  ? `/results?regnr=${analysis.registration_number}&compare=${analysis.comparison_registration}`
                  : `/results?regnr=${analysis.registration_number}`;
                
                return (
                  <Link 
                    key={analysis.id} 
                    href={analysisUrl}
                    className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-gray-300 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-gray-400 mr-2 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                        <div>
                          <p className="font-medium text-gray-900 group-hover:text-gray-700">
                            {analysis.report_type === 'comparison' 
                              ? `${analysis.registration_number} vs ${analysis.comparison_registration}`
                              : analysis.registration_number
                            }
                          </p>
                          <p className="text-sm text-gray-500">{formatDate(analysis.created_at)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          analysis.report_type === 'comparison' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {analysis.report_type === 'comparison' ? 'Jämförelse' : 'Analys'}
                        </span>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Credit History */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                Kredithistorik
              </h2>
              <span className="text-sm text-gray-500">Översikt över dina kredittransaktioner</span>
            </div>

            <div className="space-y-3">
              {creditHistory.map((transaction) => (
                <div key={transaction.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${
                        transaction.transaction_type === 'purchase' 
                          ? 'bg-green-100' 
                          : 'bg-red-100'
                      }`}>
                        {transaction.transaction_type === 'purchase' ? (
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{formatDate(transaction.created_at)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.credits > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.credits > 0 ? '+' : ''}{transaction.credits} krediter
                      </p>
                      <span className="text-xs text-gray-500 font-medium">
                        {transaction.transaction_type === 'purchase' ? 'Tillägd' : 'Använd'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}