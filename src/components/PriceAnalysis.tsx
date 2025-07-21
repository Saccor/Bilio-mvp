import type { Vehicle } from '@/types/vehicle';

interface PriceAnalysisProps {
  vehicle?: Vehicle;
  registrationNumber?: string;
  isComparison?: boolean;
}

export default function PriceAnalysis({ vehicle, registrationNumber, isComparison = false }: PriceAnalysisProps) {
  // Mock data for comparison vehicle
  const mockPrice = registrationNumber?.includes('compare') ? 235000 : 240000;
  const mockMarketValue = registrationNumber?.includes('compare') ? 245800 : 259200;
  
  const price = vehicle?.price || mockPrice;
  const marketValue = vehicle?.marketValue || mockMarketValue;
  const difference = marketValue - price;
  const percentageDifference = Math.round((difference / marketValue) * 100);
  
  const isGoodPrice = percentageDifference > 5;
  const priceStatusColor = isGoodPrice ? 'green' : percentageDifference > 0 ? 'yellow' : 'red';

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Prisanalys{registrationNumber && ` - ${registrationNumber}`}
      </h2>
      <p className="text-sm text-gray-600 mb-6">Jämförelse mot marknadsvärde</p>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">Begärt pris</div>
          <div className={`${isComparison ? 'text-xl' : 'text-2xl'} font-bold text-gray-900`}>
            {price.toLocaleString()} kr
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">Marknadsvärde</div>
          <div className={`${isComparison ? 'text-xl' : 'text-2xl'} font-bold text-gray-900`}>
            {marketValue.toLocaleString()} kr
          </div>
        </div>
      </div>

      <div className={`bg-${priceStatusColor}-50 border border-${priceStatusColor}-200 rounded-lg p-4`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium text-${priceStatusColor}-800`}>
            {percentageDifference}% {difference > 0 ? 'under' : 'över'} marknadsvärde
          </span>
          <span className={`text-sm font-bold text-${priceStatusColor}-600`}>
            {difference > 0 ? '-' : '+'}{Math.abs(difference).toLocaleString()} kr
          </span>
        </div>
        <div className={`flex items-center text-sm text-${priceStatusColor}-700`}>
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">
            {isGoodPrice ? 'Mycket bra pris!' : percentageDifference > 0 ? 'Rimligt pris' : 'Högt pris'}
          </span>
        </div>
      </div>
    </div>
  );
} 