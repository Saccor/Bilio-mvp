"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { vehicleService, type VehicleServiceResult } from '@/services/vehicle-service';
import type { Vehicle } from '@/types/vehicle';

export default function Results() {
  const searchParams = useSearchParams();
  const regnr = searchParams.get('regnr');
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Cost calculator state
  const [yearlyDistance, setYearlyDistance] = useState(1000);
  const [timePeriod, setTimePeriod] = useState(3);
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);

  // Calculate costs based on sliders
  const calculateCosts = () => {
    const monthsTotal = timePeriod * 12;
    
    // Detailed cost breakdown
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

  useEffect(() => {
    const fetchVehicleData = async () => {
      if (!regnr) {
        setError('Inget registreringsnummer angivet');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await vehicleService.getVehicleData({
          type: 'license-plate',
          country: 'S',
          id: regnr
        });

        if (result.success && result.data) {
          setVehicle(result.data);
        } else {
          setError(result.error || 'Kunde inte hämta fordonsdata');
        }
      } catch (err) {
        setError('Ett fel uppstod vid hämtning av data');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleData();
  }, [regnr]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyserar fordon...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Något gick fel</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <a href="/" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium">
            Tillbaka till startsidan
          </a>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Inget fordon hittades</h1>
          <a href="/" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium">
            Tillbaka till startsidan
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button */}
        <div className="mb-6">
          <a href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Tillbaka
          </a>
        </div>

        {/* Full Analysis Upgrade Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Fullständig bilanalys - 149 kr</span>
              </div>
              <p className="text-sm opacity-90">
                Förhandsgranskning aktiv. Få tillgång till komplett värdering, detaljerad säkerhetsbedömning, marknadsanalys och expertköpråd.
              </p>
            </div>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors ml-6">
              Få fullständig analys för 149 kr
            </button>
          </div>
        </div>

        {/* Vehicle Overview Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          {/* Vehicle Image */}
          <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
            {vehicle.media && vehicle.media[0] ? (
              <img 
                src={vehicle.media[0].url} 
                alt={`${vehicle.brand} ${vehicle.model}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            )}
            
            {/* Registration number overlay */}
            <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-md shadow-sm">
              <span className="font-mono font-bold text-gray-900">{regnr}</span>
            </div>
            
            {/* Navigation arrows */}
            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Vehicle Details */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <div className="flex items-center mb-3">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-sm text-gray-600">{vehicle.brand} {vehicle.model}</span>
                </div>
                <div className="flex items-center mb-3">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm text-gray-600">2 ägare</span>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-3">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-sm text-gray-600">{vehicle.mileage ? `${vehicle.mileage.toLocaleString()} mil` : '2 100 mil'}</span>
                </div>
                <div className="flex items-center mb-3">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm text-gray-600">{vehicle.transmission || 'Automat'}</span>
                </div>
                <div className="flex items-center mb-3">
                  <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-sm text-gray-600">{vehicle.fuel || 'Bensin'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bilhälsometer */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">Bilhälsometer</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">Detaljerad hälsoanalys</p>
          
          {/* Health Score */}
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">85/100</div>
            <p className="text-sm text-gray-600">Bra hälsotillstånd</p>
          </div>
        </div>

        {/* Price Analysis */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Prisanalys</h2>
          <p className="text-sm text-gray-600 mb-6">Jämförelse mot marknadsvärde</p>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Begärt pris</div>
              <div className="text-2xl font-bold text-gray-900">
                {vehicle.price ? `${vehicle.price.toLocaleString()} kr` : '240,000 kr'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Marknadsvärde</div>
              <div className="text-2xl font-bold text-gray-900">
                {vehicle.marketValue ? `${vehicle.marketValue.toLocaleString()} kr` : '259,200 kr'}
              </div>
            </div>
          </div>

          {/* Price Analysis Result */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-800">7% under marknadsvärde</span>
              <span className="text-sm font-bold text-green-600">-19,200 kr</span>
            </div>
            <div className="flex items-center text-sm text-green-700">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Mycket bra pris! Detta är ett lågt pris sett till marknadsvärdet.</span>
            </div>
          </div>
                 </div>

        {/* Cost Calculator */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mt-8">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <h2 className="text-lg font-semibold text-gray-900">Kostnadskalkylätorn</h2>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Anpassa reglagen för att se din ungefärliga kostnad för {vehicle?.brand} {vehicle?.model}
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

          {/* Total Cost Display */}
          <div className="text-center mb-8 p-6 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-2">Total kostnad över {timePeriod} år</div>
            <div className="text-3xl font-bold text-gray-900">
              {costs.totalCost.toLocaleString()} kr
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="mb-6">
            <button 
              onClick={() => setShowCostBreakdown(!showCostBreakdown)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-gray-900">Kostnadsfördelning</span>
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
              <div className="mt-4 space-y-4">
                {/* Värdeminskning */}
                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                    <span className="font-medium text-gray-900">Värdeminskning</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{costs.breakdown.depreciation.total.toLocaleString()} kr</div>
                    <div className="text-sm text-blue-600">{costs.breakdown.depreciation.monthly.toLocaleString()} kr/mån</div>
                  </div>
                </div>

                {/* Bränsle */}
                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span className="font-medium text-gray-900">Bränsle</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{costs.breakdown.fuel.total.toLocaleString()} kr</div>
                    <div className="text-sm text-blue-600">{costs.breakdown.fuel.monthly.toLocaleString()} kr/mån</div>
                  </div>
                </div>

                {/* Försäkring */}
                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="font-medium text-gray-900">Försäkring</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{costs.breakdown.insurance.total.toLocaleString()} kr</div>
                    <div className="text-sm text-blue-600">{costs.breakdown.insurance.monthly.toLocaleString()} kr/mån</div>
                  </div>
                </div>

                {/* Service & reparationer */}
                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-orange-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium text-gray-900">Service & reparationer</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{costs.breakdown.serviceAndRepairs.toLocaleString()} kr</div>
                  </div>
                </div>

                {/* Updated Cost Per KM and Per Day in breakdown */}
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

                {/* Disclaimer in breakdown */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-xs text-gray-600 text-center">
                    Beräkningen är en uppskattning baserad på genomsnittliga kostnader. Verkliga kostnader kan variera 
                    beroende bil specifika faktorer.
                  </p>
                </div>
              </div>
            )}
          </div>


        </div>

       </div>
     </div>
   );
 } 