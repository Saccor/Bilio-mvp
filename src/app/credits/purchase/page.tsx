'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CreditPackages from '@/components/CreditPackages';
import CreditBalance from '@/components/CreditBalance';

interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price_sek: number;
  price_kr: number;
  price_display: string;
  description: string;
}

export default function CreditPurchasePage() {
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleSelectPackage = (pkg: CreditPackage) => {
    setSelectedPackage(pkg);
  };

  const handlePurchase = async () => {
    if (!selectedPackage) return;

    setIsProcessing(true);
    
    try {
      // Mockup-kassa: Lägg till krediter direkt utan betalning
      const response = await fetch('/api/credits/add-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: selectedPackage.credits }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(`Krediter tillagda! Du fick ${selectedPackage.credits} krediter. Nytt saldo: ${data.new_balance} krediter.`);
        // Refresh to update credit balance
        window.location.reload();
      } else {
        alert('Ett fel uppstod vid tillägningen av krediter. Försök igen.');
      }
      
    } catch (error) {
      console.error('Error adding credits:', error);
      alert('Ett fel uppstod. Försök igen.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Köp krediter
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Välj ett kreditpaket för att komma igång med bilanalyser
          </p>
          
          {/* Current balance */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Ditt nuvarande saldo:</h3>
              <CreditBalance showPurchaseLink={false} className="justify-center" />
            </div>
          </div>
        </div>

        {/* Package selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Välj ditt kreditpaket
          </h2>
          <CreditPackages 
            onSelectPackage={handleSelectPackage}
            selectedPackageId={selectedPackage?.id}
          />
        </div>

        {/* Purchase button */}
        {selectedPackage && (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Bekräfta ditt köp
              </h3>
              
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Paket:</span>
                  <span className="font-medium">{selectedPackage.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Krediter:</span>
                  <span className="font-medium">{selectedPackage.credits.toLocaleString('sv-SE')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pris:</span>
                  <span className="font-bold text-lg">{selectedPackage.price_display}</span>
                </div>
              </div>

              <button
                onClick={handlePurchase}
                disabled={isProcessing}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Lägger till krediter...
                  </div>
                ) : (
                  `Lägg till ${selectedPackage.credits} krediter (Mockup)`
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                MVP Mockup: Krediterna läggs till direkt utan betalning för demo-syfte.
              </p>
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.back()}
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            ← Tillbaka
          </button>
        </div>
      </div>
    </div>
  );
}