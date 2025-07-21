import type { Vehicle } from '@/types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
  registrationNumber: string;
  isComparison?: boolean;
}

export default function VehicleCard({ vehicle, registrationNumber, isComparison = false }: VehicleCardProps) {
  // Calculate values for mock data based on real API data
  const getTaxFromCO2 = (co2: number) => Math.round(2000 + (co2 * 25));
  const getNextInspectionDate = () => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    return `${nextYear}-03-10`;
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${isComparison ? 'h-fit' : 'mb-8'}`}>
      {/* Vehicle Image */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
        {vehicle.media && vehicle.media[0] ? (
          <img 
            src={vehicle.media[0].url} 
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
        ) : (
          // Default vehicle image placeholder
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
            <div className="text-center">
              <svg className="w-20 h-20 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <p className="text-sm text-gray-500">{vehicle.brand} {vehicle.model}</p>
            </div>
          </div>
        )}
        
        {/* Registration number overlay */}
        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-md shadow-sm">
          <span className="font-mono font-bold text-gray-900">{registrationNumber}</span>
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

      {/* Vehicle Details Grid */}
      <div className="p-6">
        {/* Main Header */}
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          {vehicle.brand} {vehicle.model}
        </h3>

        {/* Comprehensive Vehicle Information Grid */}
        <div className="grid grid-cols-2 gap-6">
          
          {/* Left Column */}
          <div className="space-y-4">
            
            {/* Märke/Modell - FROM API */}
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Märke/Modell</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.brand} {vehicle.model}</p>
              </div>
            </div>

            {/* Modellår - FROM API */}
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Modellår</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.year || 'N/A'}</p>
              </div>
            </div>

            {/* Mätarställning - MOCK (not available in demo API) */}
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Mätarställning</p>
                <p className="text-sm font-semibold text-gray-900">
                  {vehicle.mileage ? `${Math.round(vehicle.mileage / 10).toLocaleString()} mil` : '3 200 mil'}
                </p>
              </div>
            </div>

            {/* Hästkrafter - FROM API */}
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Hästkrafter</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.enginePower || 150} hk</p>
              </div>
            </div>

            {/* Antal ägare - MOCK (not available in demo API) */}
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Antal ägare</p>
                <p className="text-sm font-semibold text-gray-900">4 ägare</p>
              </div>
            </div>

            {/* Förbrukning - FROM API */}
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Förbrukning</p>
                <p className="text-sm font-semibold text-gray-900">
                  {vehicle.fuelConsumption ? `${vehicle.fuelConsumption} l/100km` : '0.5 l/100km'}
                </p>
              </div>
            </div>

            {/* Säljare - MOCK (not available in demo API) */}
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Säljare</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.dealerName || 'Bilio AB'}</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            
            {/* Växellåda - FROM API */}
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Växellåda</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.transmission || 'Automat'}</p>
              </div>
            </div>

            {/* Färg - FROM API */}
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2V3z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Färg</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.color || 'Svart'}</p>
              </div>
            </div>

            {/* Bränsle - FROM API */}
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Bränsle</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.fuel || 'Diesel'}</p>
              </div>
            </div>

            {/* Drivhjul - MOCK (not available in demo API) */}
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Drivhjul</p>
                <p className="text-sm font-semibold text-gray-900">Framhjulsdrift</p>
              </div>
            </div>

            {/* Utelåpp - FROM API */}
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Utelåpp</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.co2Emissions || 125} g/km</p>
              </div>
            </div>

            {/* Årlig skatt - Enhanced with real CO2 data */}
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Årlig skatt</p>
                <p className="text-sm font-semibold text-gray-900">
                  {vehicle.operatingCosts?.annualTax 
                    ? `${vehicle.operatingCosts.annualTax.toLocaleString()} kr`
                    : vehicle.co2Emissions 
                      ? `${getTaxFromCO2(vehicle.co2Emissions).toLocaleString()} kr`
                      : '3 200 kr'
                  }
                </p>
              </div>
            </div>

            {/* Nästa besiktning - MOCK (not available in demo API) */}
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Nästa besiktning senast</p>
                <p className="text-sm font-semibold text-gray-900">{getNextInspectionDate()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Price Analysis for comparison mode */}
        {isComparison && (
          <div className="border-t pt-6 mt-6">
            <h4 className="font-medium text-gray-900 mb-3">Prisanalys</h4>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Begärt pris</div>
                <div className="text-lg font-bold text-gray-900">
                  {vehicle.price ? `${vehicle.price.toLocaleString()} kr` : '240,000 kr'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">Marknadsvärde</div>
                <div className="text-lg font-bold text-gray-900">
                  {vehicle.marketValue ? `${vehicle.marketValue.toLocaleString()} kr` : '259,200 kr'}
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="text-xs font-medium text-green-800">7% under marknadsvärde</div>
              <div className="text-xs text-green-700">Mycket bra pris!</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 