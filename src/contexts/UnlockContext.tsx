'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UnlockContextType {
  isUnlocked: boolean;
  unlockReport: (registrationNumber: string, reportType: 'single' | 'comparison') => Promise<boolean>;
  checkUnlockStatus: (registrationNumber: string, reportType: 'single' | 'comparison') => Promise<void>;
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
}

export function UnlockProvider({ children, registrationNumber, reportType }: UnlockProviderProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const checkUnlockStatus = async (regNr: string, type: 'single' | 'comparison') => {
    try {
      const response = await fetch(`/api/reports/check-access/${encodeURIComponent(regNr)}?type=${type}`);
      const data = await response.json();
      setIsUnlocked(data.hasAccess || false);
    } catch (error) {
      console.error('Error checking unlock status:', error);
      setIsUnlocked(false);
    }
  };

  const unlockReport = async (regNr: string, type: 'single' | 'comparison'): Promise<boolean> => {
    try {
      const response = await fetch('/api/reports/unlock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registration_number: regNr,
          report_type: type
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsUnlocked(true);
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
    checkUnlockStatus(registrationNumber, reportType);
  }, [registrationNumber, reportType]);

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