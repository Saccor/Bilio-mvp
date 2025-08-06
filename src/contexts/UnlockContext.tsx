'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UnlockContextType {
  isUnlocked: boolean;
  unlockReport: (registrationNumber: string, reportType: 'single' | 'comparison', sessionId?: string, comparisonRegistration?: string) => Promise<boolean>;
  checkUnlockStatus: (registrationNumber: string, reportType: 'single' | 'comparison', sessionId?: string) => Promise<void>;
}

const UnlockContext = createContext<UnlockContextType | undefined>(undefined);

export function useUnlock() {
  const context = useContext(UnlockContext);
  if (context === undefined) {
    throw new Error('useUnlock must be used within an UnlockProvider');
  }
  return context;
}

interface UnlockProviderProps {
  children: ReactNode;
  registrationNumber: string;
  reportType: 'single' | 'comparison';
  sessionId?: string | null;
}

export function UnlockProvider({ children, registrationNumber, reportType, sessionId }: UnlockProviderProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const checkUnlockStatus = async (regNr: string, type: 'single' | 'comparison', sessId?: string) => {
    try {
      const params = new URLSearchParams({ type });
      if (sessId || sessionId) {
        params.append('sessionId', sessId || sessionId || '');
      }
      const response = await fetch(`/api/reports/check-access/${encodeURIComponent(regNr)}?${params.toString()}`);
      const data = await response.json();
      setIsUnlocked(data.hasAccess || false);
    } catch (error) {
      console.error('Error checking unlock status:', error);
      setIsUnlocked(false);
    }
  };

  const unlockReport = async (regNr: string, type: 'single' | 'comparison', sessId?: string, comparisonRegNr?: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/reports/unlock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registration_number: regNr,
          report_type: type,
          sessionId: sessId || sessionId,
          comparison_registration: comparisonRegNr || null
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsUnlocked(true);
        // Trigger custom event to refresh credit balance
        window.dispatchEvent(new CustomEvent('creditsUpdated', { 
          detail: { remainingCredits: data.remaining_credits } 
        }));
        return true;
      } else {
        console.error('Failed to unlock report:', data.error);
        return false;
      }
    } catch (error) {
      console.error('Error unlocking report:', error);
      return false;
    }
  };

  useEffect(() => {
    checkUnlockStatus(registrationNumber, reportType, sessionId || undefined);
  }, [registrationNumber, reportType, sessionId]);

  const value = {
    isUnlocked,
    unlockReport,
    checkUnlockStatus
  };

  return (
    <UnlockContext.Provider value={value}>
      {children}
    </UnlockContext.Provider>
  );
}