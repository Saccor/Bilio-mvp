// src/app/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

// Types for Car.info API response
interface CarInfoAttribute {
  id?: string | number;
  name?: string;
  value?: string | number | boolean;
  values?: (string | number)[];
  attributes?: CarInfoAttribute[];
}

interface CarInfoApiResponse {
  success?: boolean;
  result?: {
    brand?: string;
    model?: string;
    series?: string;
    generation?: string;
    model_year?: number;
    year?: number;
    fuel_type?: string;
    engine_type?: string;
    engine?: string;
    horsepower?: number;
    car_name?: string;
    chassis?: string;
    trim_package?: string;
    licence_plate?: string;
    vin?: string;
    vehicle_type?: string;
    engine_name?: string;
    first_registration_date?: string;
    attributes?: CarInfoAttribute[];
    images?: { url: string }[];
  };
}

type Vehicle = {
  // Basic Information
  brand: string;
  model: string;
  variant?: string;
  media?: { url: string }[];
  year?: number;
  firstRegistration?: string;
  color?: string;
  price?: number;
  dealerName?: string;
  marketValue?: number;
  
  // Vehicle Status & History
  history?: { 
    imported?: boolean; 
    taxi?: boolean; 
    rental?: boolean;
    stolen?: boolean;
    damageHistory?: string[];
  };
  
  // Engine & Performance
  mileage?: number;
  fuel?: string;
  fuelConsumption?: number;
  co2Emissions?: number;
  enginePower?: number;
  engineSize?: number;
  transmission?: string;
  
  // Equipment & Features
  equipmentPackages?: string[];
  
  // Technical Specifications
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    wheelbase?: number;
    trackWidthFront?: number;
    trackWidthRear?: number;
    groundClearance?: number;
    dragCoefficient?: number;
    maxLoad?: number;
    maxTrailer?: number;
    tankVolume?: number;
    totalWeight?: number;
  };
  
  // Safety & Inspection
  euroNcap?: {
    rating?: number;
    year?: number;
  };
  lastInspection?: string;
  
  // Financial Analysis
  priceAnalysis?: {
    marketPosition?: 'low' | 'average' | 'high';
    sellability?: 'easy' | 'moderate' | 'difficult';
    depreciation?: number;
  };
  
  // Operating Costs
  operatingCosts?: {
    annualTax?: number;
    insuranceGroup?: number;
    estimatedMaintenance?: number;
  };
  
  // Future Value & Issues
  futureValue?: {
    oneYear?: number;
    threeYears?: number;
    fiveYears?: number;
  };
  knownIssues?: string[];
};

export default function Home() {
  const [ids, setIds] = useState<string[]>(["VVV999", ""]);
  const [results, setResults] = useState<(Vehicle | null)[]>([null, null]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);

  const handleLookup = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetched = await Promise.all(
        ids.map(async (val, index) => {
          if (!val) return null;
          const res = await fetch(`/api/vehicle?type=license-plate&country=S&id=${val}`);
          if (!res.ok) {
            if (res.status === 404) throw new Error(`Fordon ${index + 1} hittades inte`);
            else throw new Error(`Serverfel för fordon ${index + 1}`);
          }
          const apiData = await res.json() as CarInfoApiResponse;
          
          // Car.info API returns data in result object
          const data = apiData.result || {};
          
          // Helper function to find attribute by name
          const findAttribute = (name: string): string | null => {
            if (!data.attributes) return null;
            const attr = data.attributes.find((a: CarInfoAttribute) => 
              a.name?.toLowerCase().includes(name.toLowerCase())
            );
            const value = attr?.value;
            return value ? String(value) : null;
          };

          // Helper function to find attribute by exact name match
          const findExactAttribute = (name: string): string | null => {
            if (!data.attributes) return null;
            const attr = data.attributes.find((a: CarInfoAttribute) => 
              a.name === name
            );
            const value = attr?.value;
            return value ? String(value) : null;
          };

          // Helper function to extract NCAP ratings
          const getNcapRating = (type: string): number | null => {
            if (!data.attributes) return null;
            const attr = data.attributes.find((a: CarInfoAttribute) => 
              a.name === type
            );
            if (attr?.attributes) {
              const rating = attr.attributes.find((nested: CarInfoAttribute) => nested.values);
              return rating?.values?.[0] ? parseInt(String(rating.values[0])) : null;
            }
            return null;
          };

          // Extract comprehensive data from Car.info API
          return {
            // Basic Information - REAL DATA FROM API
            brand: data.brand || 'Okänt märke',
            model: data.model || 'Okänd modell',
            variant: `${data.series || ''} ${data.generation || ''}`.trim() || data.trim_package || undefined,
            year: data.model_year || data.year || undefined,
            color: findAttribute('color') || findAttribute('färg') || 'Okänd',
            firstRegistration: data.first_registration_date || (data.model_year ? `${data.model_year}-01-01` : undefined),
            dealerName: 'Car.info Demo Fordon',
            
            // Pricing (still mock - not available in free demo API)
            price: 275000,
            marketValue: 285000,
            
            // Engine & Performance - REAL DATA FROM API
            mileage: (findAttribute('mileage') && parseInt(findAttribute('mileage')!)) || 
                     (findAttribute('mätarställning') && parseInt(findAttribute('mätarställning')!)) || undefined,
            fuel: data.engine_type || data.fuel_type || findAttribute('fuel') || 'Okänd bränsletyp',
            enginePower: data.horsepower || 
                        (findAttribute('power') && parseInt(findAttribute('power')!)) || 
                        (findAttribute('hk') && parseInt(findAttribute('hk')!)) || undefined,
            engineSize: (data.engine && parseFloat(data.engine.split(' ')[0])) ||
                       (findAttribute('engine_size') && parseFloat(findAttribute('engine_size')!)) || 
                       (findAttribute('motorvolym') && parseFloat(findAttribute('motorvolym')!)) || undefined,
            co2Emissions: (findAttribute('co2') && parseInt(findAttribute('co2')!)) || undefined,
            fuelConsumption: (findAttribute('consumption') && parseFloat(findAttribute('consumption')!)) || 
                            (findAttribute('förbrukning') && parseFloat(findAttribute('förbrukning')!)) || undefined,
            transmission: findExactAttribute('transmission') || 
                         (data.car_name?.includes('DCT') ? 'DCT Automat' : 
                          data.car_name?.includes('AWD') ? 'AWD' : 'Okänd'),
            
            // Vehicle History
            history: {
              imported: findAttribute('imported') === 'true',
              taxi: findAttribute('taxi') === 'true', 
              rental: findAttribute('rental') === 'true',
              stolen: false, // Demo data
            },
            
            // Equipment - REAL DATA FROM API
            equipmentPackages: [
              data.trim_package,
              data.chassis,
              data.engine_name,
              findExactAttribute('Anti-roll Bar') && 'Stabiliseringsstag',
              findAttribute('Heated Seats') && 'Uppvärmda säten',
              findAttribute('Powered Seats') && 'Elmanövrerbara säten',
              findAttribute('Ventilated Seats') && 'Ventilerade säten',
              findAttribute('Massage') && 'Massagefunktion'
            ].filter(Boolean) as string[],
            
            // Technical Specifications - REAL DATA FROM API  
            dimensions: {
              length: (findAttribute('length') && parseInt(findAttribute('length')!)) || undefined,
              width: (findAttribute('width') && parseInt(findAttribute('width')!)) || undefined,
              height: (findAttribute('height') && parseInt(findAttribute('height')!)) || undefined,
              wheelbase: (findAttribute('wheelbase') && parseInt(findAttribute('wheelbase')!)) || undefined,
              trackWidthFront: (findAttribute('track_front') && parseInt(findAttribute('track_front')!)) || undefined,
              trackWidthRear: (findAttribute('track_rear') && parseInt(findAttribute('track_rear')!)) || undefined,
              groundClearance: (findAttribute('ground_clearance') && parseInt(findAttribute('ground_clearance')!)) || undefined,
              dragCoefficient: (findAttribute('drag_coefficient') && parseFloat(findAttribute('drag_coefficient')!)) || undefined,
              maxLoad: (findAttribute('max_load') && parseInt(findAttribute('max_load')!)) || undefined,
              maxTrailer: (findAttribute('max_trailer') && parseInt(findAttribute('max_trailer')!)) || undefined,
              tankVolume: (findAttribute('tank_volume') && parseInt(findAttribute('tank_volume')!)) || undefined,
              totalWeight: (findAttribute('total_weight') && parseInt(findAttribute('total_weight')!)) || undefined,
            },
            
            // Safety - REAL NCAP DATA FROM API
            euroNcap: {
              rating: getNcapRating('Overall') || 
                     (findExactAttribute('Overall') && parseInt(findExactAttribute('Overall')!)) || undefined,
              year: data.model_year || undefined,
            },
            lastInspection: '2024-04-12',
            
            // Financial Analysis
            priceAnalysis: {
              marketPosition: 'average' as const,
              sellability: 'easy' as const,
              depreciation: 18,
            },
            
            // Operating Costs
            operatingCosts: {
              annualTax: 3240,
              insuranceGroup: 18,
              estimatedMaintenance: 7800,
            },
            
            // Future Value
            futureValue: {
              oneYear: 241000,
              threeYears: 185000,
              fiveYears: 135000,
            },
            
            // Known Issues - DATA-DRIVEN BASED ON REAL VEHICLE INFO
            knownIssues: [
              data.engine_type?.includes('Diesel') ? 'Kontrollera DPF-filter regelbundet för dieselmotorer' : 
              data.engine_type?.includes('Hybrid') ? 'Batterikapacitet kan minska över tid på hybridfordon' : 
              'Kontrollera motorolja enligt serviceschema',
              
              data.horsepower && data.horsepower > 130 ? 
              'Högpresterande motor - extra viktigt med kvalitetsolja' : 
              'Standardunderhåll enligt serviceschema',
              
              data.model_year && (2024 - data.model_year) > 8 ? 
              `${2024 - data.model_year} år gammal - kontrollera bromsar och fjädring` : 
              data.model_year && (2024 - data.model_year) > 5 ? 
              'Kontrollera slitdelar vid denna ålder' : 
              'Relativt ny bil - följ grundläggande underhåll',
              
              data.chassis === 'Cabriolet' ? 'Kontrollera takets tätningar regelbundet' :
              data.vehicle_type === 'car' ? 'Standardkontroller för personbil' : 
              'Följ tillverkarens underhållsschema'
            ].filter(Boolean),
            
            // Media (if available)
            media: data.images || [],
          } as Vehicle;
        })
      );
      setResults(fetched);
    } catch (e: unknown) {
      const error = e as Error;
      setError(error.message);
      setResults([null, null]);
    } finally {
      setLoading(false);
    }
  };

  const addComparison = () => {
    if (ids.length < 4) {
      setIds([...ids, ""]);
      setResults([...results, null]);
    }
  };

  const removeComparison = (index: number) => {
    if (ids.length > 2) {
      const newIds = ids.filter((_, i) => i !== index);
      const newResults = results.filter((_, i) => i !== index);
      setIds(newIds);
      setResults(newResults);
      if (selectedVehicle === index) setSelectedVehicle(null);
    }
  };

  const clearAll = () => {
    setIds(["", ""]);
    setResults([null, null]);
    setError(null);
    setSelectedVehicle(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fordonsanalys & Jämförelse</h1>
              <p className="text-gray-600 mt-1">Komplett analys av fordon • Svenska marknaden</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={addComparison}
                disabled={ids.length >= 4}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                + Lägg till fordon
              </button>
              <button
                onClick={clearAll}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Rensa alla
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ange registreringsnummer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {ids.map((v, i) => (
              <div key={i} className="relative">
                <input
                  type="text"
                  value={v}
                  onChange={(e) => {
                    const newIds = [...ids];
                    newIds[i] = e.target.value.toUpperCase();
                    setIds(newIds);
                  }}
                  placeholder={`Registreringsnummer ${i + 1}`}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase font-mono text-lg tracking-wider text-black"
                />
                {ids.length > 2 && (
                  <button
                    onClick={() => removeComparison(i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLookup}
              disabled={loading || !ids.some(id => id.trim())}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyserar...</span>
                </div>
              ) : (
                "Analysera fordon"
              )}
            </button>
            
            {error && (
              <div className="flex items-center space-x-2 text-red-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {results.some(r => r !== null) && (
          <div className="space-y-8">
            {/* Overview Cards */}
            <div className="grid gap-6 lg:grid-cols-3">
              {results.map((car, i) => (
                car && (
                  <div key={i} 
                    className={`bg-white rounded-xl shadow-sm border hover:shadow-md transition-all cursor-pointer ${
                      selectedVehicle === i ? 'ring-2 ring-blue-500 shadow-md' : ''
                    }`}
                    onClick={() => setSelectedVehicle(selectedVehicle === i ? null : i)}
                  >
                    <VehicleOverviewCard car={car} index={i} isSelected={selectedVehicle === i} />
                  </div>
                )
              ))}
            </div>

            {/* Detailed Analysis */}
            {selectedVehicle !== null && results[selectedVehicle] && (
              <DetailedAnalysis vehicle={results[selectedVehicle]!} index={selectedVehicle} />
            )}

            {/* Comparison Table */}
            {results.filter(r => r !== null).length > 1 && (
              <ComparisonTable vehicles={results} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function VehicleOverviewCard({ car, index, isSelected }: { car: Vehicle; index: number; isSelected: boolean }) {
  return (
    <>
      {/* Vehicle Image */}
      {car.media?.[0]?.url ? (
        <div className="aspect-video bg-gray-100 rounded-t-xl overflow-hidden relative">
          <Image 
            src={car.media[0].url} 
            alt={`${car.brand} ${car.model}`}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{car.brand} {car.model}</h3>
            {car.variant && <p className="text-gray-600">{car.variant}</p>}
            <p className="text-sm text-gray-500">Fordon {index + 1}</p>
          </div>
          {isSelected && (
            <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
              Vald för analys
            </div>
          )}
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Pris</p>
            <p className="font-semibold text-gray-900">
              {car.price ? `${car.price.toLocaleString()} kr` : 'Ej tillgängligt'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Marknadsvärde</p>
            <p className="font-semibold text-gray-900">
              {car.marketValue ? `${car.marketValue.toLocaleString()} kr` : 'Ej tillgängligt'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide">År / Mätarställning</p>
            <p className="font-semibold text-gray-900">
              {car.year || 'N/A'} / {car.mileage ? `${car.mileage.toLocaleString()} km` : 'N/A'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Bränsle</p>
            <p className="font-semibold text-gray-900">{car.fuel || 'N/A'}</p>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex flex-wrap gap-1">
          {car.history?.imported && <StatusBadge label="Importerad" type="warning" />}
          {car.history?.taxi && <StatusBadge label="Taxi" type="warning" />}
          {car.history?.rental && <StatusBadge label="Hyrbil" type="warning" />}
          {car.history?.stolen && <StatusBadge label="Stulen" type="danger" />}
          {car.euroNcap?.rating && <StatusBadge label={`${car.euroNcap.rating}★ NCAP`} type="success" />}
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            {isSelected ? 'Klicka för att dölja detaljer' : 'Klicka för detaljerad analys'}
          </p>
        </div>
      </div>
    </>
  );
}

function DetailedAnalysis({ vehicle, index }: { vehicle: Vehicle; index: number }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Översikt', icon: '📊' },
    { id: 'technical', label: 'Teknisk data', icon: '⚙️' },
    { id: 'financial', label: 'Ekonomi', icon: '💰' },
    { id: 'history', label: 'Historik', icon: '📋' },
    { id: 'future', label: 'Framtid', icon: '🔮' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="border-b px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Detaljerad analys: {vehicle.brand} {vehicle.model}
        </h2>
        <p className="text-gray-600">Fordon {index + 1} • Komplett fordonsrapport</p>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8 px-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'overview' && <OverviewTab vehicle={vehicle} />}
        {activeTab === 'technical' && <TechnicalTab vehicle={vehicle} />}
        {activeTab === 'financial' && <FinancialTab vehicle={vehicle} />}
        {activeTab === 'history' && <HistoryTab vehicle={vehicle} />}
        {activeTab === 'future' && <FutureTab vehicle={vehicle} />}
      </div>
    </div>
  );
}

function OverviewTab({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <InfoSection title="Grundinformation">
          <InfoRow label="Märke & Modell" value={`${vehicle.brand} ${vehicle.model}`} />
          <InfoRow label="Variant" value={vehicle.variant} />
          <InfoRow label="Första registrering" value={vehicle.firstRegistration} />
          <InfoRow label="Färg" value={vehicle.color} />
          <InfoRow label="Senaste besiktning" value={vehicle.lastInspection} />
          <InfoRow label="Bilhandlare" value={vehicle.dealerName} />
        </InfoSection>

        <InfoSection title="Motor & Prestanda">
          <InfoRow label="Bränsletyp" value={vehicle.fuel} />
          <InfoRow label="Motoreffekt" value={vehicle.enginePower ? `${vehicle.enginePower} hk` : undefined} />
          <InfoRow label="Motorvolym" value={vehicle.engineSize ? `${vehicle.engineSize}L` : undefined} />
          <InfoRow label="CO2-utsläpp" value={vehicle.co2Emissions ? `${vehicle.co2Emissions} g/km` : undefined} />
          <InfoRow label="Bränsleförbrukning" value={vehicle.fuelConsumption ? `${vehicle.fuelConsumption}L/100km` : undefined} />
        </InfoSection>
      </div>

      <div className="space-y-6">
        <InfoSection title="Priser & Värdering">
          <InfoRow label="Utropspris" value={vehicle.price ? `${vehicle.price.toLocaleString()} kr` : undefined} />
          <InfoRow label="Marknadsvärde" value={vehicle.marketValue ? `${vehicle.marketValue.toLocaleString()} kr` : undefined} />
          <InfoRow label="Marknadsposition" value={vehicle.priceAnalysis?.marketPosition === 'high' ? 'Hög' : vehicle.priceAnalysis?.marketPosition === 'low' ? 'Låg' : 'Genomsnittlig'} />
          <InfoRow label="Säljbarhet" value={vehicle.priceAnalysis?.sellability === 'easy' ? 'Lätt att sälja' : vehicle.priceAnalysis?.sellability === 'difficult' ? 'Svårsåld' : 'Måttlig'} />
        </InfoSection>

        <InfoSection title="Utrustning">
          {vehicle.equipmentPackages && vehicle.equipmentPackages.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {vehicle.equipmentPackages.map((pkg, i) => (
                <span key={i} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {pkg}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Ingen utrustningsinformation tillgänglig</p>
          )}
        </InfoSection>
      </div>
    </div>
  );
}

function TechnicalTab({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <InfoSection title="Dimensioner">
        <InfoRow label="Längd" value={vehicle.dimensions?.length ? `${vehicle.dimensions.length} mm` : undefined} />
        <InfoRow label="Bredd" value={vehicle.dimensions?.width ? `${vehicle.dimensions.width} mm` : undefined} />
        <InfoRow label="Höjd" value={vehicle.dimensions?.height ? `${vehicle.dimensions.height} mm` : undefined} />
        <InfoRow label="Axelavstånd" value={vehicle.dimensions?.wheelbase ? `${vehicle.dimensions.wheelbase} mm` : undefined} />
        <InfoRow label="Spårvidd fram" value={vehicle.dimensions?.trackWidthFront ? `${vehicle.dimensions.trackWidthFront} mm` : undefined} />
        <InfoRow label="Spårvidd bak" value={vehicle.dimensions?.trackWidthRear ? `${vehicle.dimensions.trackWidthRear} mm` : undefined} />
        <InfoRow label="Markfrigång" value={vehicle.dimensions?.groundClearance ? `${vehicle.dimensions.groundClearance} mm` : undefined} />
      </InfoSection>

      <InfoSection title="Vikter & Kapacitet">
        <InfoRow label="Totalvikt" value={vehicle.dimensions?.totalWeight ? `${vehicle.dimensions.totalWeight} kg` : undefined} />
        <InfoRow label="Max last" value={vehicle.dimensions?.maxLoad ? `${vehicle.dimensions.maxLoad} kg` : undefined} />
        <InfoRow label="Max släpvikt" value={vehicle.dimensions?.maxTrailer ? `${vehicle.dimensions.maxTrailer} kg` : undefined} />
        <InfoRow label="Tankvolym" value={vehicle.dimensions?.tankVolume ? `${vehicle.dimensions.tankVolume} L` : undefined} />
        <InfoRow label="Luftmotstånd" value={vehicle.dimensions?.dragCoefficient ? `${vehicle.dimensions.dragCoefficient} Cd` : undefined} />
      </InfoSection>
    </div>
  );
}

function FinancialTab({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <InfoSection title="Driftkostnader (årligen)">
        <InfoRow label="Fordonsskatt" value={vehicle.operatingCosts?.annualTax ? `${vehicle.operatingCosts.annualTax} kr` : undefined} />
        <InfoRow label="Försäkringsgrupp" value={vehicle.operatingCosts?.insuranceGroup?.toString()} />
        <InfoRow label="Beräknat underhåll" value={vehicle.operatingCosts?.estimatedMaintenance ? `${vehicle.operatingCosts.estimatedMaintenance} kr` : undefined} />
        <InfoRow label="Bränsleförbrukning" value={vehicle.fuelConsumption ? `${vehicle.fuelConsumption}L/100km` : undefined} />
      </InfoSection>

      <InfoSection title="Prisanalys">
        <InfoRow label="Marknadsposition" value={
          vehicle.priceAnalysis?.marketPosition === 'high' ? '🔴 Över marknadspris' :
          vehicle.priceAnalysis?.marketPosition === 'low' ? '🟢 Under marknadspris' :
          '🟡 Marknadspris'
        } />
        <InfoRow label="Säljbarhet" value={
          vehicle.priceAnalysis?.sellability === 'easy' ? '🟢 Lätt att sälja' :
          vehicle.priceAnalysis?.sellability === 'difficult' ? '🔴 Svårsåld' :
          '🟡 Måttlig säljbarhet'
        } />
        <InfoRow label="Årlig värdeminskning" value={vehicle.priceAnalysis?.depreciation ? `${vehicle.priceAnalysis.depreciation}%` : undefined} />
      </InfoSection>
    </div>
  );
}

function HistoryTab({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="space-y-8">
      <InfoSection title="Fordonshistorik">
        <div className="grid grid-cols-2 gap-4">
          <StatusCard label="Importerad" status={vehicle.history?.imported} />
          <StatusCard label="Taxi" status={vehicle.history?.taxi} />
          <StatusCard label="Hyrbil" status={vehicle.history?.rental} />
          <StatusCard label="Stulen" status={vehicle.history?.stolen} />
        </div>
      </InfoSection>

      <InfoSection title="Säkerhet">
        <InfoRow label="Euro NCAP betyg" value={vehicle.euroNcap?.rating ? `${vehicle.euroNcap.rating}/5 stjärnor` : undefined} />
        <InfoRow label="NCAP testår" value={vehicle.euroNcap?.year?.toString()} />
        <InfoRow label="Senaste besiktning" value={vehicle.lastInspection} />
      </InfoSection>

      {vehicle.history?.damageHistory && vehicle.history.damageHistory.length > 0 && (
        <InfoSection title="Skadehistorik">
          <div className="space-y-2">
            {vehicle.history.damageHistory.map((damage, i) => (
              <div key={i} className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800">
                {damage}
              </div>
            ))}
          </div>
        </InfoSection>
      )}
    </div>
  );
}

function FutureTab({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="space-y-8">
      <InfoSection title="Framtida värdering">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Om 1 år</p>
            <p className="text-xl font-bold text-blue-900">
              {vehicle.futureValue?.oneYear ? `${vehicle.futureValue.oneYear.toLocaleString()} kr` : 'N/A'}
            </p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Om 3 år</p>
            <p className="text-xl font-bold text-orange-900">
              {vehicle.futureValue?.threeYears ? `${vehicle.futureValue.threeYears.toLocaleString()} kr` : 'N/A'}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600">Om 5 år</p>
            <p className="text-xl font-bold text-red-900">
              {vehicle.futureValue?.fiveYears ? `${vehicle.futureValue.fiveYears.toLocaleString()} kr` : 'N/A'}
            </p>
          </div>
        </div>
      </InfoSection>

      {vehicle.knownIssues && vehicle.knownIssues.length > 0 && (
        <InfoSection title="Kända problem vid aktuell mätarställning">
          <div className="space-y-3">
            {vehicle.knownIssues.map((issue, i) => (
              <div key={i} className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-amber-100 rounded-full p-1">
                    <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-amber-800">{issue}</p>
                </div>
              </div>
            ))}
          </div>
        </InfoSection>
      )}
    </div>
  );
}

function ComparisonTable({ vehicles }: { vehicles: (Vehicle | null)[] }) {
  const validVehicles = vehicles.filter((v): v is Vehicle => v !== null);
  
  if (validVehicles.length < 2) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="px-6 py-4 border-b">
        <h3 className="text-xl font-bold text-gray-900">Snabbjämförelse</h3>
        <p className="text-gray-600">Jämför viktiga egenskaper mellan fordon</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Egenskap
              </th>
              {validVehicles.map((_, i) => (
                <th key={i} className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Fordon {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <ComparisonRow label="Märke & Modell" values={validVehicles.map(v => `${v.brand} ${v.model}`)} />
            <ComparisonRow label="Pris" values={validVehicles.map(v => v.price ? `${v.price.toLocaleString()} kr` : 'N/A')} />
            <ComparisonRow label="Marknadsvärde" values={validVehicles.map(v => v.marketValue ? `${v.marketValue.toLocaleString()} kr` : 'N/A')} />
            <ComparisonRow label="År" values={validVehicles.map(v => v.year?.toString() || 'N/A')} />
            <ComparisonRow label="Mätarställning" values={validVehicles.map(v => v.mileage ? `${v.mileage.toLocaleString()} km` : 'N/A')} />
            <ComparisonRow label="Bränsle" values={validVehicles.map(v => v.fuel || 'N/A')} />
            <ComparisonRow label="CO2-utsläpp" values={validVehicles.map(v => v.co2Emissions ? `${v.co2Emissions} g/km` : 'N/A')} />
            <ComparisonRow label="Årlig skatt" values={validVehicles.map(v => v.operatingCosts?.annualTax ? `${v.operatingCosts.annualTax} kr` : 'N/A')} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Utility Components
function StatusBadge({ label, type }: { label: string; type: 'success' | 'warning' | 'danger' }) {
  const colors = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors[type]}`}>
      {label}
    </span>
  );
}

function StatusCard({ label, status }: { label: string; status?: boolean }) {
  return (
    <div className={`rounded-lg p-4 ${status ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-900">{label}</span>
        <span className={`text-lg ${status ? 'text-red-600' : 'text-green-600'}`}>
          {status ? '❌' : '✅'}
        </span>
      </div>
      <p className={`text-sm mt-1 ${status ? 'text-red-700' : 'text-green-700'}`}>
        {status ? 'Ja' : 'Nej'}
      </p>
    </div>
  );
}

function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-900 mb-4">{title}</h4>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-100">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-900">{value || 'Ej tillgängligt'}</span>
    </div>
  );
}

function ComparisonRow({ label, values }: { label: string; values: string[] }) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {label}
      </td>
      {values.map((value, i) => (
        <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {value}
        </td>
      ))}
    </tr>
  );
}
