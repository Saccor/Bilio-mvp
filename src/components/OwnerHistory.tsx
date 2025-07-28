import type { CarInfoApiResponse } from '@/types/vehicle';

interface OwnerHistoryProps {
  vehicleData: CarInfoApiResponse;
  registrationNumber?: string;
  isComparison?: boolean;
}

export default function OwnerHistory({ 
  vehicleData, 
  registrationNumber, 
  isComparison = false 
}: OwnerHistoryProps) {
  
  // Ownership and warranty data - MOCK DATA since not available from Car.info API
  const ownershipData = [
    {
      id: 'owners',
      label: 'Antal ägare',
      value: '2 ägare',
      status: 'good',
      isMock: true
    },
    {
      id: 'warranty',
      label: 'Nybilsgaranti',
      value: 'Aktiv',
      status: 'good',
      isMock: true
    },
    {
      id: 'warranty-expiry',
      label: 'Garanti utgår',
      value: '2025-04-15',
      status: 'info',
      isMock: true
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Ägarhistorik & Garanti
          </h2>
          <p className="text-sm text-gray-600">
            Information om tidigare ägare och garantistatus
          </p>
        </div>
      </div>

      {/* Ownership and Warranty Information */}
      <div className="space-y-4">
        {ownershipData.map((item) => (
          <div 
            key={item.id} 
            className={`flex items-center justify-between p-4 rounded-lg ${
              item.status === 'info' 
                ? 'bg-blue-50 border border-blue-200' 
                : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              {/* Status Icon */}
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                
                {/* Label */}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-900 font-medium">{item.label}</span>
                  {item.isMock && (
                    <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded">
                      MOCKUP
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Value */}
            <div className="flex items-center space-x-2">
              <span className={`font-medium ${
                item.status === 'info' 
                  ? 'text-blue-900' 
                  : 'text-gray-900'
              }`}>
                {item.value}
              </span>
              {item.status === 'good' && (
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-2">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">Om ägarhistorik & garanti</p>
            <p className="text-xs text-blue-700">
              Ägarhistorik och garantiinformation baseras på mockup-data då denna information inte är tillgänglig via Car.info API. 
              För verklig ägar- och garantihistorik krävs integration med svenska registerdatabaser och biltillverkares garantisystem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 