import type { Vehicle } from '@/types/vehicle';
import ComparisonRow from '@/components/ui/ComparisonRow';

interface ComparisonTableProps {
  vehicles: (Vehicle | null)[];
}

export default function ComparisonTable({ vehicles }: ComparisonTableProps) {
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