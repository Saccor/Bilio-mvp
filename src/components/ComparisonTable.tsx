import type { Vehicle } from '@/types/vehicle';
import ComparisonRow from '@/components/ui/ComparisonRow';

interface ComparisonTableProps {
  vehicles: (Vehicle | null)[];
}

export default function ComparisonTable({ vehicles }: ComparisonTableProps) {
  const validVehicles = vehicles.filter((v): v is Vehicle => v !== null);
  
  if (validVehicles.length < 2) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">Snabbjämförelse</h3>
        <p className="text-sm sm:text-base text-gray-600">Jämför viktiga egenskaper mellan fordon</p>
      </div>
      
      {/* Mobile Card Layout */}
      <div className="sm:hidden">
        <div className="p-4 space-y-4">
          {validVehicles.map((vehicle, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h4 className="font-bold text-black text-base mb-4 border-b border-gray-300 pb-2">
                Fordon {index + 1}: {vehicle.brand} {vehicle.model}
              </h4>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 font-medium">Pris:</span>
                  <span className="font-semibold text-black">{vehicle.price ? `${vehicle.price.toLocaleString()} kr` : 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 font-medium">Marknadsvärde:</span>
                  <span className="font-semibold text-black">{vehicle.marketValue ? `${vehicle.marketValue.toLocaleString()} kr` : 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 font-medium">År:</span>
                  <span className="font-semibold text-black">{vehicle.year?.toString() || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 font-medium">Mätarställning:</span>
                  <span className="font-semibold text-black">{vehicle.mileage ? `${vehicle.mileage.toLocaleString()} km` : 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 font-medium">Bränsle:</span>
                  <span className="font-semibold text-black">{vehicle.fuel || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 font-medium">CO2:</span>
                  <span className="font-semibold text-black">{vehicle.co2Emissions ? `${vehicle.co2Emissions} g/km` : 'N/A'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600 font-medium">Årlig skatt:</span>
                  <span className="font-semibold text-black">{vehicle.operatingCosts?.annualTax ? `${vehicle.operatingCosts.annualTax} kr` : 'N/A'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Desktop Table Layout */}
      <div className="hidden sm:block">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Egenskap
                </th>
                {validVehicles.map((_, i) => (
                  <th key={i} className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
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
    </div>
  );
} 