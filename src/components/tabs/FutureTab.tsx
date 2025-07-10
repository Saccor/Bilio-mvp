import type { Vehicle } from '@/types/vehicle';
import InfoSection from '@/components/ui/InfoSection';

interface FutureTabProps {
  vehicle: Vehicle;
}

export default function FutureTab({ vehicle }: FutureTabProps) {
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