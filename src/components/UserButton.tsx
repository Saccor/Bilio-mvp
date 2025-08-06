'use client';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabaseClient';
import CreditBalance from './CreditBalance';

export default function UserButton() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Get initial user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  if (!mounted || loading) {
    return (
      <div className="text-sm text-gray-500">Laddar...</div>
    );
  }



  if (!user) {
    return (
      <a 
        href="/login" 
        className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
      >
        Logga in
      </a>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <CreditBalance showPurchaseLink={false} className="hidden sm:flex" />
      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-700 font-medium">
          Hej, {user.email?.split('@')[0]}!
        </span>
        <button 
          onClick={handleLogout} 
          className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
        >
          Logga ut
        </button>
      </div>
    </div>
  );
} 