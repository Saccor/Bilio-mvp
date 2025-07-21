'use client';
import { createClient } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

export default function UserButton() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  if (loading) {
    return (
      <div className="text-sm text-gray-500">Laddar...</div>
    );
  }



  if (!user) {
    return (
      <a 
        href="/login" 
        className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
      >
        Logga in
      </a>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-700">
        Hej, {user.email?.split('@')[0]}!
      </span>
      <button 
        onClick={handleLogout} 
        className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
      >
        Logga ut
      </button>
    </div>
  );
} 