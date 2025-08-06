import type { CarInfoApiResponse } from '@/types/vehicle';
import { ShieldCheck } from 'lucide-react';

interface VehicleStatusProps {
  vehicleData: CarInfoApiResponse;
  registrationNumber?: string;
  isComparison?: boolean;
}

export default function VehicleStatus({ 
  vehicleData, 
  registrationNumber, 
  isComparison = false 
}: VehicleStatusProps) {
  
  // Vehicle status checks - MOCK DATA since not available from Car.info API
  const statusChecks = [
    {
      id: 'taxi',
      label: 'Använts som taxi',
      status: 'Nej',
      isClean: true,
      isMock: true
    },
    {
      id: 'rental',
      label: 'Använts som hyrbil',
      status: 'Nej', 
      isClean: true,
      isMock: true
    },
    {
      id: 'imported',
      label: 'Importerad från utlandet',
      status: 'Nej',
      isClean: true,
      isMock: true
    },
    {
      id: 'stolen',
      label: 'Registrerad som stulen',
      status: 'Nej',
      isClean: true,
      isMock: true
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
          <ShieldCheck className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Fordonsstatus
          </h2>
          <p className="text-sm text-gray-600">
            Fyra viktiga kontroller
          </p>
        </div>
      </div>

      {/* Status Checks */}
      <div className="space-y-4">
        {statusChecks.map((check) => (
          <div key={check.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              {/* Status Icon */}
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                check.isClean 
                  ? 'border-gray-300 bg-white' 
                  : 'border-red-500 bg-red-50'
              }`}>
                {check.isClean && (
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                )}
                {!check.isClean && (
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              
              {/* Label */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 font-medium">{check.label}</span>
                {check.isMock && (
                  <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded">
                    MOCKUP
                  </span>
                )}
              </div>
            </div>

            {/* Status */}
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              check.isClean 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {check.status}
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
            <p className="text-sm font-medium text-blue-900 mb-1">Om fordonsstatus</p>
            <p className="text-xs text-blue-700">
              Fordonsstatus baseras på mockup-data då denna information inte är tillgänglig via Car.info API. 
              För verklig fordonshistorik krävs integration med svenska registerdatabaser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 