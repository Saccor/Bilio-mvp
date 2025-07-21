import type { CarInfoApiResponse } from '@/types/vehicle';
import { calculateHealthScore, getHealthStatus } from '@/utils/health-calculator';

interface HealthMeterProps {
  vehicleData: CarInfoApiResponse;
  registrationNumber?: string;
  isComparison?: boolean;
}

export default function HealthMeter({ 
  vehicleData,
  registrationNumber, 
  isComparison = false 
}: HealthMeterProps) {
  /** MOCK DATA - Hälsoberäkningar baseras på real API-data men algoritmen är mock */
  const healthResult = calculateHealthScore(vehicleData);
  const healthStatus = getHealthStatus(healthResult.healthIndex);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressWidth = (score: number, maxScore: number) => {
    return Math.round((score / maxScore) * 100);
  };

  const getProgressColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center mb-4">
        <svg className="w-6 h-6 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
        <h2 className="text-lg font-semibold text-gray-900">
          Bilhälsometer{registrationNumber && ` - ${registrationNumber}`}
        </h2>
      </div>
      
      {/* Overall Health Score */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6 text-center">
        <div className={`text-4xl font-bold mb-2 ${healthStatus.colorClass}`}>
          {healthResult.healthIndex}/100
        </div>
        <p className="text-lg font-semibold text-gray-900 mb-1">{healthStatus.status}</p>
        <p className="text-sm text-gray-600">{healthStatus.description}</p>
      </div>

      {/* Category Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hälsoanalys per kategori</h3>

        {/* Technical Status */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Teknisk status</span>
            <span className="text-sm text-gray-600">
              {healthResult.breakdown.tech}/{healthResult.maxScores.tech}p
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getProgressColor(healthResult.breakdown.tech, healthResult.maxScores.tech)}`}
              style={{ width: `${getProgressWidth(healthResult.breakdown.tech, healthResult.maxScores.tech)}%` }}
            ></div>
          </div>
        </div>

        {/* Safety */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Säkerhetsutrustning</span>
            <span className="text-sm text-gray-600">
              {healthResult.breakdown.safety}/{healthResult.maxScores.safety}p
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getProgressColor(healthResult.breakdown.safety, healthResult.maxScores.safety)}`}
              style={{ width: `${getProgressWidth(healthResult.breakdown.safety, healthResult.maxScores.safety)}%` }}
            ></div>
          </div>
        </div>

        {/* Ownership History */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Ägarhistorik</span>
            <span className="text-sm text-gray-600">
              {healthResult.breakdown.ownership}/{healthResult.maxScores.ownership}p
              <span className="text-xs text-gray-400 ml-1">/** MOCK DATA */</span>
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getProgressColor(healthResult.breakdown.ownership, healthResult.maxScores.ownership)}`}
              style={{ width: `${getProgressWidth(healthResult.breakdown.ownership, healthResult.maxScores.ownership)}%` }}
            ></div>
          </div>
        </div>

        {/* Price Analysis */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Prisanalys</span>
            <span className="text-sm text-gray-600">
              {healthResult.breakdown.price}/{healthResult.maxScores.price}p
              <span className="text-xs text-gray-400 ml-1">/** MOCK DATA */</span>
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getProgressColor(healthResult.breakdown.price, healthResult.maxScores.price)}`}
              style={{ width: `${getProgressWidth(healthResult.breakdown.price, healthResult.maxScores.price)}%` }}
            ></div>
          </div>
        </div>

        {/* Service History */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Skade- & Servicehistorik</span>
            <span className="text-sm text-gray-600">
              {healthResult.breakdown.service}/{healthResult.maxScores.service}p
              <span className="text-xs text-gray-400 ml-1">/** MOCK DATA */</span>
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getProgressColor(healthResult.breakdown.service, healthResult.maxScores.service)}`}
              style={{ width: `${getProgressWidth(healthResult.breakdown.service, healthResult.maxScores.service)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          Hälsoindexet baseras på tekniska specifikationer från Car.info API samt mockad ägarhistorik, 
          prisanalys och servicedata. Poängen beräknas utifrån fordonets ålder, tekniska status, 
          säkerhetsutrustning och uppskattad historik.
        </p>
      </div>
    </div>
  );
} 