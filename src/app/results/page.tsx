"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { vehicleService } from '@/services/vehicle-service';
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
import LockedSection from '@/components/LockedSection';
import CreditBalance from '@/components/CreditBalance';
import { UnlockProvider } from '@/contexts/UnlockContext';

export default function Results() {
  const searchParams = useSearchParams();
  const regnr = searchParams.get('regnr');
  const compareRegnr = searchParams.get('compare');
  const isComparison = Boolean(compareRegnr);
  
  // Generate sessionId for new searches (not from dashboard)
  const [sessionId] = useState(() => {
    // If this is a dashboard access (no sessionId in URL), don't generate one
    const existingSessionId = searchParams.get('sessionId');
    if (existingSessionId) return existingSessionId;
    
    // Check if this is likely a dashboard access (based on referrer or lack of form submission)
    // Only check document.referrer on client side
    const isDashboardAccess = (typeof window !== 'undefined' && document.referrer.includes('/dashboard')) || 
                            !searchParams.get('fromSearch');
    
    return isDashboardAccess ? null : `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  });
  
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
          // For demo purposes: if comparing same car, reuse the data
          if (compareRegnr === regnr && result.success && result.data) {
            console.log('Demo: Reusing data for same registration number comparison');
            setCompareVehicle(result.data);
            setCompareVehicleRawData(result.rawApiData || null);
          } else {
            try {
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
            } catch (compareError) {
              // Handle API errors gracefully for comparison vehicle
              console.warn(`Comparison vehicle API error: ${compareError}`);
              // Continue without the comparison vehicle rather than failing
            }
          }
        }
      } catch {
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
          <Link href="/" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium">
            Tillbaka till startsidan
          </Link>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Inget fordon hittades</h1>
          <Link href="/" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium">
            Tillbaka till startsidan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <UnlockProvider 
      registrationNumber={regnr || ''} 
      reportType={isComparison ? 'comparison' : 'single'}
      sessionId={sessionId}
    >
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Tillbaka
          </Link>
        </div>

        {/* Credit Status & Upgrade Banner */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-start sm:items-center mb-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <span className="font-medium text-gray-900 text-sm sm:text-base">
                    Förhandsgranskning aktiv
                  </span>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                    {isComparison 
                      ? 'Lås upp komplett jämförelse med detaljerad analys av båda bilarna för 1 kredit.'
                      : 'Lås upp fullständig värdering, säkerhetsbedömning och marknadsanalys för 1 kredit.'
                    }
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <CreditBalance showPurchaseLink={false} className="hidden sm:flex" />
              
              <div className="flex gap-2 sm:gap-3">
                <a 
                  href="/credits/purchase"
                  className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2.5 rounded-lg font-medium transition-colors text-xs sm:text-sm text-center whitespace-nowrap"
                >
                  Köp krediter
                </a>
                <button 
                  className="flex-1 sm:flex-none bg-gray-900 hover:bg-gray-800 text-white px-3 sm:px-4 py-2.5 rounded-lg font-medium transition-colors text-xs sm:text-sm whitespace-nowrap"
                  onClick={() => {
                    const firstLocked = document.querySelector('.locked-section-trigger');
                    if (firstLocked) {
                      (firstLocked as HTMLElement).click();
                    }
                  }}
                >
                  Lås upp för 1 kredit
                </button>
              </div>
            </div>
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
          // Comparison Mode: Side by side on desktop, stacked on mobile
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
            {/* Primary Vehicle */}
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Bil 1 - {regnr}</h2>
              {vehicle && <VehicleCard vehicle={vehicle} registrationNumber={regnr || ''} isComparison={true} />}
            </div>
            
            {/* Comparison Vehicle */}
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Bil 2 - {compareRegnr}</h2>
              {compareVehicle ? (
                <VehicleCard vehicle={compareVehicle} registrationNumber={compareRegnr || ''} isComparison={true} />
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-8 sm:w-12 h-8 sm:h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Kunde inte hämta fordonsdata</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Registreringsnummer {compareRegnr} kunde inte hämtas från demo-API:et. 
                    Detta kan bero på API-begränsningar för vissa fordon.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Single Mode: Full width
          <div className="mb-6 sm:mb-8">
            <VehicleCard vehicle={vehicle} registrationNumber={regnr || ''} isComparison={false} />
          </div>
        )}

        {/* Health Meter - LOCKED */}
        {isComparison ? (
          // Comparison Mode: Side by side Health Meters
          <LockedSection
            sectionName="Fullständig Bilhälsometer"
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8"
          >
            {vehicleRawData && (
              <HealthMeter 
                vehicleData={vehicleRawData}
              />
            )}
            {compareVehicleRawData && (
              <HealthMeter 
                vehicleData={compareVehicleRawData}
              />
            )}
          </LockedSection>
        ) : (
          // Single mode: Original Health Meter
          vehicle && vehicleRawData && (
            <LockedSection
              sectionName="Fullständig Bilhälsometer"
              className="mb-6 sm:mb-8"
            >
              <HealthMeter 
                vehicleData={vehicleRawData}
              />
            </LockedSection>
          )
        )}

        {/* Price Analysis - Single mode OR comparison mode side by side */}
        {isComparison ? (
          // Comparison Mode: Side by side Price Analysis
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
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
            <div className="mb-6 sm:mb-8">
              <PriceAnalysis 
                vehicle={vehicle || undefined} 
                isComparison={false} 
              />
            </div>
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

        {/* Vehicle Status - LOCKED */}
        {isComparison ? (
          // Comparison Mode: Side by side Vehicle Status
          <LockedSection
            sectionName="Fullständig Fordonsstatus"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          >
            {vehicle && vehicleRawData && (
              <VehicleStatus />
            )}
            {compareVehicle && compareVehicleRawData && (
              <VehicleStatus />
            )}
          </LockedSection>
        ) : (
          // Single mode: Original Vehicle Status
          vehicle && vehicleRawData && (
            <LockedSection
              sectionName="Fullständig Fordonsstatus"
              className="mb-8"
            >
              <VehicleStatus />
            </LockedSection>
          )
        )}

        {/* Owner History - LOCKED */}
        {isComparison ? (
          // Comparison Mode: Side by side Owner History
          <LockedSection
            sectionName="Fullständig Ägarhistorik & Garanti"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          >
            {vehicle && vehicleRawData && (
              <OwnerHistory />
            )}
            {compareVehicle && compareVehicleRawData && (
              <OwnerHistory />
            )}
          </LockedSection>
        ) : (
          // Single mode: Original Owner History
          vehicle && vehicleRawData && (
            <LockedSection
              sectionName="Fullständig Ägarhistorik & Garanti"
              className="mb-8"
            >
              <OwnerHistory />
            </LockedSection>
          )
        )}

        {/* Price Development - LOCKED */}
        {isComparison ? (
          // Comparison Mode: Side by side Price Development
          <LockedSection
            sectionName="Fullständig Prisutveckling"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          >
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
          </LockedSection>
        ) : (
          // Single mode: Original Price Development
          vehicle && vehicleRawData && (
            <LockedSection
              sectionName="Fullständig Prisutveckling"
              className="mb-8"
            >
              <PriceDevelopment 
                vehicleData={vehicleRawData}
                registrationNumber={regnr || undefined}
              />
            </LockedSection>
          )
        )}

        {/* Safety Analysis - LOCKED */}
        {isComparison ? (
          // Comparison Mode: Side by side Safety Analysis
          <LockedSection
            sectionName="Fullständig Säkerhetsanalys"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          >
            {vehicle && vehicleRawData && (
              <SafetyAnalysis />
            )}
            {compareVehicle && compareVehicleRawData && (
              <SafetyAnalysis />
            )}
          </LockedSection>
        ) : (
          // Single mode: Original Safety Analysis
          vehicle && vehicleRawData && (
            <LockedSection
              sectionName="Fullständig Säkerhetsanalys"
              className="mb-8"
            >
              <SafetyAnalysis />
            </LockedSection>
          )
        )}

        {/* Vehicle Specifications - LOCKED */}
        {isComparison ? (
          // Comparison Mode: Side by side Specifications
          <LockedSection
            sectionName="Fullständig Tekniska Specifikationer"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          >
            {vehicle && vehicleRawData && (
              <VehicleSpecifications />
            )}
            {compareVehicle && compareVehicleRawData && (
              <VehicleSpecifications />
            )}
          </LockedSection>
        ) : (
          // Single mode: Original Specifications
          vehicle && vehicleRawData && (
            <LockedSection
              sectionName="Fullständig Tekniska Specifikationer"
              className="mb-8"
            >
              <VehicleSpecifications />
            </LockedSection>
          )
        )}

        {/* Damage and Service - LOCKED */}
        {isComparison ? (
          // Comparison Mode: Side by side Damage and Service
          <LockedSection
            sectionName="Fullständig Skade- och Servicehistorik"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          >
            {vehicle && vehicleRawData && (
              <DamageAndService />
            )}
            {compareVehicle && compareVehicleRawData && (
              <DamageAndService />
            )}
          </LockedSection>
        ) : (
          // Single mode: Original Damage and Service
          vehicle && vehicleRawData && (
            <LockedSection
              sectionName="Fullständig Skade- och Servicehistorik"
              className="mb-8"
            >
              <DamageAndService />
            </LockedSection>
          )
        )}

        </div>
      </div>
    </UnlockProvider>
  );
} 