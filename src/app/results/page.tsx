"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { vehicleService, type VehicleServiceResult } from '@/services/vehicle-service';
import type { Vehicle, CarInfoApiResponse } from '@/types/vehicle';
import VehicleCard from '@/components/VehicleCard';
import HealthMeter from '@/components/HealthMeter';
import PriceAnalysis from '@/components/PriceAnalysis';
import CostCalculator from '@/components/CostCalculator';
import SellerInformation from '@/components/SellerInformation';
import VehicleStatus from '@/components/VehicleStatus';
import OwnerHistory from '@/components/OwnerHistory';
import PriceDevelopment from '@/components/PriceDevelopment';
import SafetyAnalysis from '@/components/SafetyAnalysis';
import VehicleSpecifications from '@/components/VehicleSpecifications';
import DamageAndService from '@/components/DamageAndService';

export default function Results() {
  const searchParams = useSearchParams();
  const regnr = searchParams.get('regnr');
  const compareRegnr = searchParams.get('compare');
  const isComparison = Boolean(compareRegnr);
  
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [vehicleRawData, setVehicleRawData] = useState<CarInfoApiResponse | null>(null);
  const [compareVehicle, setCompareVehicle] = useState<Vehicle | null>(null);
  const [compareVehicleRawData, setCompareVehicleRawData] = useState<CarInfoApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicleData = async () => {
      if (!regnr) {
        setError('Inget registreringsnummer angivet');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch primary vehicle data
        const result = await vehicleService.getVehicleData({
          type: 'license-plate',
          country: 'S',
          id: regnr
        });

        if (result.success && result.data) {
          setVehicle(result.data);
          setVehicleRawData(result.rawApiData || null); // Store raw API data
        } else {
          setError(result.error || 'Kunde inte hämta fordonsdata');
          setLoading(false);
          return;
        }

        // Fetch comparison vehicle data if provided
        if (compareRegnr) {
          const compareResult = await vehicleService.getVehicleData({
            type: 'license-plate',
            country: 'S',
            id: compareRegnr
          });

          if (compareResult.success && compareResult.data) {
            setCompareVehicle(compareResult.data);
            setCompareVehicleRawData(compareResult.rawApiData || null); // Store raw API data
          } else {
            // Don't fail completely if comparison vehicle fails, just show error
            console.warn(`Could not fetch comparison vehicle data: ${compareResult.error}`);
          }
        }
      } catch (err) {
        setError('Ett fel uppstod vid hämtning av data');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleData();
  }, [regnr, compareRegnr]);

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
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
                <span className="font-semibold">
                  {isComparison ? 'Fullständig jämförelse - 199 kr' : 'Fullständig bilanalys - 149 kr'}
                </span>
              </div>
              <p className="text-sm opacity-90">
                {isComparison 
                  ? 'Förhandsgranskning aktiv. Få tillgång till komplett jämförelse sida vid sida med detaljerad analys av båda bilarna.'
                  : 'Förhandsgranskning aktiv. Få tillgång till komplett värdering, detaljerad säkerhetsbedömning, marknadsanalys och expertköpråd.'
                }
              </p>
            </div>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors ml-6">
              {isComparison ? 'Få fullständig jämförelse för 199 kr' : 'Få fullständig analys för 149 kr'}
            </button>
          </div>
        </div>

        {/* Comparison Mode Header */}
        {isComparison && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Jämförelse</h1>
            <p className="text-gray-600">Direktjämförelse mellan {regnr} och {compareRegnr}</p>
          </div>
        )}

        {/* Vehicle Cards - Single or Comparison */}
        {isComparison ? (
          // Comparison Mode: Side by side
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Primary Vehicle */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Bil 1 - {regnr}</h2>
              {vehicle && <VehicleCard vehicle={vehicle} registrationNumber={regnr || ''} isComparison={true} />}
            </div>
            
            {/* Comparison Vehicle */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Bil 2 - {compareRegnr}</h2>
              {compareVehicle ? (
                <VehicleCard vehicle={compareVehicle} registrationNumber={compareRegnr || ''} isComparison={true} />
              ) : (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Kunde inte hämta fordonsdata</h3>
                  <p className="text-gray-600">Registreringsnummer {compareRegnr} kunde inte hittas i databasen.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Single Mode: Full width
          <div className="mb-8">
            <VehicleCard vehicle={vehicle} registrationNumber={regnr || ''} isComparison={false} />
          </div>
        )}

        {/* Health Meter - Single mode OR comparison mode side by side */}
        {isComparison ? (
          // Comparison Mode: Side by side Health Meters
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {vehicleRawData && (
              <HealthMeter 
                vehicleData={vehicleRawData}
                registrationNumber={regnr || undefined} 
                isComparison={true} 
              />
            )}
            {compareVehicleRawData && (
              <HealthMeter 
                vehicleData={compareVehicleRawData}
                registrationNumber={compareRegnr || undefined} 
                isComparison={true} 
              />
            )}
          </div>
        ) : (
          // Single mode: Original Health Meter
          vehicle && vehicleRawData && (
            <div className="mb-8">
              <HealthMeter 
                vehicleData={vehicleRawData}
                registrationNumber={regnr || undefined}
                isComparison={false} 
              />
            </div>
          )
        )}

        {/* Price Analysis - Single mode OR comparison mode side by side */}
        {isComparison ? (
          // Comparison Mode: Side by side Price Analysis
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <PriceAnalysis 
              vehicle={vehicle || undefined} 
              registrationNumber={regnr || undefined} 
              isComparison={true} 
            />
            <PriceAnalysis 
              vehicle={compareVehicle || undefined} 
              registrationNumber={compareRegnr || undefined} 
              isComparison={true} 
            />
          </div>
        ) : (
          // Single mode: Original Price Analysis
          vehicle && (
            <PriceAnalysis 
              vehicle={vehicle || undefined} 
              isComparison={false} 
            />
          )
        )}

        {/* Cost Calculator */}
        <CostCalculator 
          vehicle={vehicle || undefined}
          compareVehicle={compareVehicle || undefined}
          isComparison={isComparison}
          regnr={regnr || undefined}
          compareRegnr={compareRegnr || undefined}
        />

        {/* Seller Information */}
        <div className="mb-8">
          <SellerInformation 
            isComparison={isComparison}
            regnr={regnr || undefined}
            compareRegnr={compareRegnr || undefined}
          />
        </div>

                  {/* Vehicle Status */}
          {isComparison ? (
            // Comparison Mode: Side by side Vehicle Status
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {vehicle && vehicleRawData && (
                <VehicleStatus 
                  vehicleData={vehicleRawData}
                  registrationNumber={regnr || undefined}
                />
              )}
              {compareVehicle && compareVehicleRawData && (
                <VehicleStatus 
                  vehicleData={compareVehicleRawData}
                  registrationNumber={compareRegnr || undefined}
                />
              )}
            </div>
          ) : (
            // Single mode: Original Vehicle Status
            vehicle && vehicleRawData && (
              <div className="mb-8">
                <VehicleStatus 
                  vehicleData={vehicleRawData}
                  registrationNumber={regnr || undefined}
                />
              </div>
            )
          )}

        {/* Owner History */}
        {isComparison ? (
          // Comparison Mode: Side by side Owner History
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {vehicle && vehicleRawData && (
              <OwnerHistory 
                vehicleData={vehicleRawData}
                registrationNumber={regnr || undefined}
              />
            )}
            {compareVehicle && compareVehicleRawData && (
              <OwnerHistory 
                vehicleData={compareVehicleRawData}
                registrationNumber={compareRegnr || undefined}
              />
            )}
          </div>
        ) : (
          // Single mode: Original Owner History
          vehicle && vehicleRawData && (
            <div className="mb-8">
              <OwnerHistory 
                vehicleData={vehicleRawData}
                registrationNumber={regnr || undefined}
              />
            </div>
          )
        )}

        {/* Price Development */}
        {isComparison ? (
          // Comparison Mode: Side by side Price Development
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {vehicle && vehicleRawData && (
              <PriceDevelopment 
                vehicleData={vehicleRawData}
                registrationNumber={regnr || undefined}
              />
            )}
            {compareVehicle && compareVehicleRawData && (
              <PriceDevelopment 
                vehicleData={compareVehicleRawData}
                registrationNumber={compareRegnr || undefined}
              />
            )}
          </div>
        ) : (
          // Single mode: Original Price Development
          vehicle && vehicleRawData && (
            <div className="mb-8">
              <PriceDevelopment 
                vehicleData={vehicleRawData}
                registrationNumber={regnr || undefined}
              />
            </div>
          )
        )}

        {/* Safety Analysis */}
        {isComparison ? (
          // Comparison Mode: Side by side Safety Analysis
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {vehicle && vehicleRawData && (
              <SafetyAnalysis 
                vehicleData={vehicleRawData}
                registrationNumber={regnr || undefined}
              />
            )}
            {compareVehicle && compareVehicleRawData && (
              <SafetyAnalysis 
                vehicleData={compareVehicleRawData}
                registrationNumber={compareRegnr || undefined}
              />
            )}
          </div>
        ) : (
          // Single mode: Original Safety Analysis
          vehicle && vehicleRawData && (
            <div className="mb-8">
              <SafetyAnalysis 
                vehicleData={vehicleRawData}
                registrationNumber={regnr || undefined}
              />
            </div>
          )
        )}

        {/* Vehicle Specifications */}
        {isComparison ? (
          // Comparison Mode: Side by side Specifications
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {vehicle && vehicleRawData && (
              <VehicleSpecifications 
                vehicleData={vehicleRawData}
                registrationNumber={regnr || undefined}
              />
            )}
            {compareVehicle && compareVehicleRawData && (
              <VehicleSpecifications 
                vehicleData={compareVehicleRawData}
                registrationNumber={compareRegnr || undefined}
              />
            )}
          </div>
        ) : (
          // Single mode: Original Specifications
          vehicle && vehicleRawData && (
            <div className="mb-8">
              <VehicleSpecifications 
                vehicleData={vehicleRawData}
                registrationNumber={regnr || undefined}
              />
            </div>
          )
        )}

        {/* Damage and Service */}
        {isComparison ? (
          // Comparison Mode: Side by side Damage and Service
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {vehicle && vehicleRawData && (
              <DamageAndService 
                vehicleData={vehicleRawData}
                registrationNumber={regnr || undefined}
              />
            )}
            {compareVehicle && compareVehicleRawData && (
              <DamageAndService 
                vehicleData={compareVehicleRawData}
                registrationNumber={compareRegnr || undefined}
              />
            )}
          </div>
        ) : (
          // Single mode: Original Damage and Service
          vehicle && vehicleRawData && (
            <div className="mb-8">
              <DamageAndService 
                vehicleData={vehicleRawData}
                registrationNumber={regnr || undefined}
              />
            </div>
          )
        )}

      </div>
    </div>
  );
} 