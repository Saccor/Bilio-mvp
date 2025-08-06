'use client';
import { useState, useEffect } from 'react';

interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price_sek: number;
  price_kr: number;
  price_display: string;
  description: string;
}

interface CreditPackagesProps {
  onSelectPackage?: (pkg: CreditPackage) => void;
  selectedPackageId?: string;
}

export default function CreditPackages({ onSelectPackage, selectedPackageId }: CreditPackagesProps) {
  const [packages, setPackages] = useState<CreditPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/credits/packages');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch packages');
      }

      setPackages(data.packages);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      console.error('Error fetching packages:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Fel vid laddning av kreditpaket: {error}</p>
        <button 
          onClick={fetchPackages}
          className="mt-2 text-orange-600 hover:text-orange-700 underline"
        >
          Försök igen
        </button>
      </div>
    );
  }

  const getPackageIcon = (packageName: string) => {
    if (packageName.includes('1 ')) return '🚗';
    if (packageName.includes('3 ')) return '🔥';
    if (packageName.includes('5 ')) return '💎';
    if (packageName.includes('10 ')) return '👑';
    return '💳';
  };

  const getPackageColor = (packageName: string) => {
    if (packageName.includes('1 ')) return 'from-blue-400 to-blue-600';
    if (packageName.includes('3 ')) return 'from-green-400 to-green-600';
    if (packageName.includes('5 ')) return 'from-purple-400 to-purple-600';
    if (packageName.includes('10 ')) return 'from-yellow-400 to-yellow-600';
    return 'from-orange-400 to-orange-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {packages.map((pkg) => {
        const isSelected = selectedPackageId === pkg.id;
        const isPopular = pkg.name.includes('5 '); // 5 Analyser är populärast

        return (
          <div
            key={pkg.id}
            className={`relative bg-white rounded-xl shadow-lg border-2 transition-all cursor-pointer hover:shadow-xl ${
              isSelected 
                ? 'border-orange-500 ring-2 ring-orange-200' 
                : 'border-gray-200 hover:border-orange-300'
            }`}
            onClick={() => onSelectPackage?.(pkg)}
          >
            {isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULÄR
                </span>
              </div>
            )}

            <div className="p-6">
              <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${getPackageColor(pkg.name)} rounded-full flex items-center justify-center text-2xl`}>
                {getPackageIcon(pkg.name)}
              </div>

              <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
                {pkg.name}
              </h3>

              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-gray-900">
                  {pkg.price_display}
                </div>
                <div className="text-sm text-gray-500">
                  {pkg.credits.toLocaleString('sv-SE')} krediter
                </div>
              </div>

              <p className="text-sm text-gray-600 text-center mb-4">
                {pkg.description}
              </p>

              <div className="text-center">
                <div className="text-xs text-gray-500">
                  {(pkg.price_kr / pkg.credits).toFixed(0)} kr per analys
                </div>
                {pkg.credits > 1 && (
                  <div className="text-xs text-green-600 font-medium">
                    Spara {((149 * pkg.credits) - pkg.price_kr).toFixed(0)} kr
                  </div>
                )}
              </div>

              {isSelected && (
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center text-orange-600 text-sm font-medium">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Valt
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}