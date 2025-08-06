import { useState } from 'react';
import type { Vehicle } from '@/types/vehicle';

interface CostCalculatorProps {
  vehicle?: Vehicle;
  compareVehicle?: Vehicle;
  isComparison?: boolean;
  regnr?: string;
  compareRegnr?: string;
}

export default function CostCalculator({ 
  vehicle, 
  compareVehicle, 
  isComparison = false, 
  regnr, 
  compareRegnr 
}: CostCalculatorProps) {
  const [yearlyDistance, setYearlyDistance] = useState(1000);
  const [timePeriod, setTimePeriod] = useState(3);
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);

  /** MOCK DATA - Alla kostnadsberäkningar är simulerade */
  const calculateCosts = () => {
    const monthsTotal = timePeriod * 12;
    
    // Detailed cost breakdown - MOCK DATA
    const depreciation = 216000; // Fixed depreciation
    const depreciationPerMonth = Math.round(depreciation / monthsTotal);
    
    const fuelCostPerKm = 1.5; // Base fuel cost per km
    const fuelTotal = yearlyDistance * timePeriod * fuelCostPerKm;
    const fuelPerMonth = Math.round(fuelTotal / monthsTotal);
    
    const insurancePerMonth = 320; // Fixed monthly insurance
    const insuranceTotal = insurancePerMonth * monthsTotal;
    
    const serviceAndRepairs = 48000; // Fixed over period
    
    const totalCost = depreciation + fuelTotal + insuranceTotal + serviceAndRepairs;
    const costPerKm = totalCost / (yearlyDistance * timePeriod);
    const costPerDay = totalCost / (timePeriod * 365);
    
    return {
      totalCost: Math.round(totalCost),
      costPerKm: Number(costPerKm.toFixed(2)),
      costPerDay: Math.round(costPerDay),
      breakdown: {
        depreciation: {
          total: depreciation,
          monthly: depreciationPerMonth
        },
        fuel: {
          total: Math.round(fuelTotal),
          monthly: fuelPerMonth
        },
        insurance: {
          total: insuranceTotal,
          monthly: insurancePerMonth
        },
        serviceAndRepairs: serviceAndRepairs
      }
    };
  };

  const costs = calculateCosts();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="flex items-center mb-4">
        <svg className="w-6 h-6 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <h2 className="text-lg font-semibold text-gray-900">Kostnadskalkylätorn</h2>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        {isComparison 
          ? `Anpassa reglagen för att se ungefärliga kostnader för båda bilarna`
          : `Anpassa reglagen för att se din ungefärliga kostnad för ${vehicle?.brand} ${vehicle?.model}`
        }
      </p>

      {/* Distance Slider */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Körsträcka per år: {yearlyDistance.toLocaleString()} km
        </label>
        <div className="relative">
          <input
            type="range"
            min="1000"
            max="10000"
            step="500"
            value={yearlyDistance}
            onChange={(e) => setYearlyDistance(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #f97316 0%, #f97316 ${((yearlyDistance - 1000) / 9000) * 100}%, #e5e7eb ${((yearlyDistance - 1000) / 9000) * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 000 km</span>
            <span>10 000 km</span>
          </div>
        </div>
      </div>

      {/* Time Period Slider */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Tidsperiod: {timePeriod} år
        </label>
        <div className="relative">
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={timePeriod}
            onChange={(e) => setTimePeriod(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #f97316 0%, #f97316 ${((timePeriod - 1) / 9) * 100}%, #e5e7eb ${((timePeriod - 1) / 9) * 100}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 år</span>
            <span>10 år</span>
          </div>
        </div>
      </div>

      {/* Cost Display - Different for comparison vs single */}
      {isComparison ? (
        // Comparison mode: Side by side cost comparison
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Primary Vehicle Costs */}
          <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-medium text-gray-900 mb-2">{regnr}</h3>
            <div className="text-2xl font-bold text-blue-900 mb-2">
              {costs.totalCost.toLocaleString()} kr
            </div>
            <div className="text-sm text-blue-700">Total över {timePeriod} år</div>
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              <div>
                <div className="text-blue-600">Per km</div>
                <div className="font-semibold">{costs.costPerKm} kr</div>
              </div>
              <div>
                <div className="text-blue-600">Per dag</div>
                <div className="font-semibold">{costs.costPerDay} kr</div>
              </div>
            </div>
          </div>
          
          {/* Comparison Vehicle Costs */}
          <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-medium text-gray-900 mb-2">{compareRegnr}</h3>
            <div className="text-2xl font-bold text-green-900 mb-2">
              {costs.totalCost.toLocaleString()} kr
            </div>
            <div className="text-sm text-green-700">Total över {timePeriod} år</div>
            <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
              <div>
                <div className="text-green-600">Per km</div>
                <div className="font-semibold">{costs.costPerKm} kr</div>
              </div>
              <div>
                <div className="text-green-600">Per dag</div>
                <div className="font-semibold">{costs.costPerDay} kr</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Single mode: Original layout
        <div className="text-center mb-8 p-6 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-2">Total kostnad över {timePeriod} år</div>
          <div className="text-3xl font-bold text-gray-900">
            {costs.totalCost.toLocaleString()} kr
          </div>
        </div>
      )}

      {/* Cost Breakdown */}
      <div className="mb-6">
        <button 
          onClick={() => setShowCostBreakdown(!showCostBreakdown)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className="font-medium text-gray-900">
            {isComparison ? 'Kostnadsfördelning för båda bilarna' : 'Kostnadsfördelning'}
          </span>
          <svg 
            className={`w-5 h-5 text-gray-500 transition-transform ${showCostBreakdown ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {/* Expanded Cost Breakdown */}
        {showCostBreakdown && (
          <div className="mt-4">
            {isComparison ? (
              // Comparison mode: Side by side breakdown
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Primary Vehicle Breakdown */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{regnr} - Kostnadsfördelning</h3>
                  
                  {/* Cost items */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                      <span className="font-medium text-gray-900">Värdeminskning</span>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{costs.breakdown.depreciation.total.toLocaleString()} kr</div>
                        <div className="text-sm text-blue-600">{costs.breakdown.depreciation.monthly.toLocaleString()} kr/mån</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                      <span className="font-medium text-gray-900">Bränsle</span>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{costs.breakdown.fuel.total.toLocaleString()} kr</div>
                        <div className="text-sm text-blue-600">{costs.breakdown.fuel.monthly.toLocaleString()} kr/mån</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                      <span className="font-medium text-gray-900">Försäkring</span>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{costs.breakdown.insurance.total.toLocaleString()} kr</div>
                        <div className="text-sm text-blue-600">{costs.breakdown.insurance.monthly.toLocaleString()} kr/mån</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                      <span className="font-medium text-gray-900">Service & reparationer</span>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{costs.breakdown.serviceAndRepairs.toLocaleString()} kr</div>
                      </div>
                    </div>
                  </div>

                  {/* Cost summary for first vehicle */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <div className="text-sm text-blue-600 mb-1">Kostnad per km</div>
                      <div className="text-xl font-bold text-blue-900">{costs.costPerKm} kr</div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                      <div className="text-sm text-gray-600 mb-1">Per dag</div>
                      <div className="text-xl font-bold text-gray-900">{costs.costPerDay} kr</div>
                    </div>
                  </div>
                </div>

                {/* Comparison Vehicle Breakdown */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{compareRegnr} - Kostnadsfördelning</h3>
                  
                  {/* Cost items (slightly different values) */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                      <span className="font-medium text-gray-900">Värdeminskning</span>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">198,000 kr</div>
                        <div className="text-sm text-blue-600">5,500 kr/mån</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                      <span className="font-medium text-gray-900">Bränsle</span>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{Math.round(yearlyDistance * timePeriod * 1.3).toLocaleString()} kr</div>
                        <div className="text-sm text-blue-600">{Math.round((yearlyDistance * timePeriod * 1.3) / (timePeriod * 12)).toLocaleString()} kr/mån</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                      <span className="font-medium text-gray-900">Försäkring</span>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{(290 * timePeriod * 12).toLocaleString()} kr</div>
                        <div className="text-sm text-blue-600">290 kr/mån</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                      <span className="font-medium text-gray-900">Service & reparationer</span>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">42,000 kr</div>
                      </div>
                    </div>
                  </div>

                  {/* Cost summary for second vehicle */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <div className="text-sm text-green-600 mb-1">Kostnad per km</div>
                      <div className="text-xl font-bold text-green-900">
                        {((198000 + (yearlyDistance * timePeriod * 1.3) + (290 * timePeriod * 12) + 42000) / (yearlyDistance * timePeriod)).toFixed(2)} kr
                      </div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                      <div className="text-sm text-gray-600 mb-1">Per dag</div>
                      <div className="text-xl font-bold text-gray-900">
                        {Math.round((198000 + (yearlyDistance * timePeriod * 1.3) + (290 * timePeriod * 12) + 42000) / (timePeriod * 365))} kr
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Single mode: Original breakdown
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-900">Värdeminskning</span>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{costs.breakdown.depreciation.total.toLocaleString()} kr</div>
                    <div className="text-sm text-blue-600">{costs.breakdown.depreciation.monthly.toLocaleString()} kr/mån</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-900">Bränsle</span>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{costs.breakdown.fuel.total.toLocaleString()} kr</div>
                    <div className="text-sm text-blue-600">{costs.breakdown.fuel.monthly.toLocaleString()} kr/mån</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-900">Försäkring</span>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{costs.breakdown.insurance.total.toLocaleString()} kr</div>
                    <div className="text-sm text-blue-600">{costs.breakdown.insurance.monthly.toLocaleString()} kr/mån</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-900">Service & reparationer</span>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{costs.breakdown.serviceAndRepairs.toLocaleString()} kr</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <div className="text-sm text-blue-600 mb-1">Kostnad per km</div>
                    <div className="text-xl font-bold text-blue-900">{costs.costPerKm} kr</div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600 mb-1">Per dag</div>
                    <div className="text-xl font-bold text-gray-900">{costs.costPerDay} kr</div>
                  </div>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
              <p className="text-xs text-gray-600 text-center">
                Beräkningen är en uppskattning baserad på genomsnittliga kostnader. Verkliga kostnader kan variera 
                beroende bil specifika faktorer.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 