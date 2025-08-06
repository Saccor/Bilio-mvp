import type { Vehicle } from '@/types/vehicle';
import { Car, Calendar, Gauge, Zap, Users, Fuel, Building, Settings, Palette, FileText, Shield, Cloud } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  registrationNumber?: string;
  isComparison?: boolean;
}

export default function VehicleCard({ vehicle, registrationNumber, isComparison = false }: VehicleCardProps) {
  /** MOCK DATA - Vissa beräkningar baseras på real API-data men värdena är simulerade */

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden ${isComparison ? 'h-fit' : 'mb-8'}`}>
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
        <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-200">
          <span className="font-mono font-medium text-gray-900 text-sm">{registrationNumber}</span>
        </div>
        
        {/* Navigation arrows */}
        <div className="absolute inset-y-0 left-4 flex items-center">
          <button className="w-9 h-9 bg-white/90 hover:bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-200/50 transition-all">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        <div className="absolute inset-y-0 right-4 flex items-center">
          <button className="w-9 h-9 bg-white/90 hover:bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-200/50 transition-all">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Vehicle Information */}
      <div className="p-4 sm:p-6">
        {/* Main Header */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
          {vehicle.brand} {vehicle.model}
          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">API</span>
        </h3>

        {/* Comprehensive Vehicle Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Left Column */}
          <div className="space-y-4">
            
            {/* Märke/Modell */}
            <div className="flex items-center">
              <Car className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-xs text-gray-500">Märke/Modell</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.brand} {vehicle.model}</p>
              </div>
            </div>

            {/* Mätarställning */}
            <div className="flex items-center">
              <Gauge className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-xs text-gray-500">Mätarställning</p>
                <p className="text-sm font-semibold text-gray-900">
                  {vehicle.mileage ? `${Math.round(vehicle.mileage / 10).toLocaleString()} mil` : '2 100 mil'}
                </p>
              </div>
            </div>

            {/* Antal ägare */}
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-xs text-gray-500">Antal ägare</p>
                <p className="text-sm font-semibold text-gray-900">2 ägare</p>
              </div>
            </div>

            {/* Växellåda */}
            <div className="flex items-center">
              <Settings className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-xs text-gray-500">Växellåda</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.transmission || 'Automat'}</p>
              </div>
            </div>

            {/* Bränsle */}
            <div className="flex items-center">
              <Fuel className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-xs text-gray-500">Bränsle</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.fuel || 'Bensin'}</p>
              </div>
            </div>

            {/* Säljare */}
            <div className="flex items-center">
              <Building className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-xs text-gray-500">Säljare</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.dealerName || 'Bilio AB'}</p>
              </div>
            </div>

            {/* Årlig skatt */}
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-xs text-gray-500">Årlig skatt</p>
                <p className="text-sm font-semibold text-gray-900">3 200 kr</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            
            {/* Modellår */}
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-xs text-gray-500">Modellår</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.year || '2022'}</p>
              </div>
            </div>

            {/* Hästkrafter */}
            <div className="flex items-center">
              <Zap className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-xs text-gray-500">Hästkrafter</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.enginePower || 180} hk</p>
              </div>
            </div>

            {/* Förbrukning */}
            <div className="flex items-center">
              <Fuel className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-xs text-gray-500">Förbrukning</p>
                <p className="text-sm font-semibold text-gray-900">
                  {vehicle.fuelConsumption ? `${vehicle.fuelConsumption} l/100km` : '0.6l/100km'}
                </p>
              </div>
            </div>

            {/* Färg */}
            <div className="flex items-center">
              <Palette className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-xs text-gray-500">Färg</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.color || 'Silver'}</p>
              </div>
            </div>

            {/* Drivhjul */}
            <div className="flex items-center">
              <Settings className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-xs text-gray-500">Drivhjul</p>
                <p className="text-sm font-semibold text-gray-900">Framhjulsdrift</p>
              </div>
            </div>

            {/* Utsläpp */}
            <div className="flex items-center">
              <Cloud className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-xs text-gray-500">Utsläpp</p>
                <p className="text-sm font-semibold text-gray-900">119 g/km</p>
              </div>
            </div>

            {/* Nästa besiktning senast */}
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-xs text-gray-500">Nästa besiktning senast</p>
                <p className="text-sm font-semibold text-gray-900">2025-04-15</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 