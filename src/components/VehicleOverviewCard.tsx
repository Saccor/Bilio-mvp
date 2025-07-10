import Image from "next/image";
import type { Vehicle } from '@/types/vehicle';
import StatusBadge from '@/components/ui/StatusBadge';

interface VehicleOverviewCardProps {
  car: Vehicle;
  index: number;
  isSelected: boolean;
}

export default function VehicleOverviewCard({ car, index, isSelected }: VehicleOverviewCardProps) {
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