import type { Vehicle } from '@/types/vehicle';

interface SafetyAnalysisProps {
  vehicle: Vehicle;
}

export default function SafetyAnalysis({ vehicle }: SafetyAnalysisProps) {
  // ✅ REAL DATA - Säkerhetsutrustning från Car.info API
  const safetyEquipment = vehicle.equipmentPackages || [];
  
  // Check for specific safety features in equipment
  const hasABS = safetyEquipment.some(item => 
    item.includes('ABS') || item.includes('Anti-lock')
  );
  
  const hasBLIS = safetyEquipment.some(item => 
    item.includes('BLIS') || item.includes('Blind Spot')
  );
  
  const hasAirbags = safetyEquipment.some(item => 
    item.includes('Airbag') || item.includes('airbag')
  );
  
  const hasESC = safetyEquipment.some(item => 
    item.includes('ESC') || item.includes('Electronic Stability')
  );
  
  const hasAEB = safetyEquipment.some(item => 
    item.includes('AEB') || item.includes('Emergency Brake')
  );
  
  const hasLaneAssist = safetyEquipment.some(item => 
    item.includes('Lane') || item.includes('LKA')
  );

  /** MOCK DATA - Euro NCAP betyg är simulerad data */
  const mockEuroNcap = {
    rating: 4,
    adultOccupant: 91,
    childOccupant: 83,
    pedestrian: 74,
    safetyAssist: 82
  }; /** MOCK DATA */

  return (
    <section className="p-6 bg-white rounded-xl shadow-md border">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Fullständig Säkerhetsanalys</h2>

      {/* 1. Euro NCAP Betyg - MOCK */}
      <div className="mb-8">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <div>
            <p className="text-xs text-gray-500">Euro NCAP Betyg</p>
            <p className="text-sm font-semibold text-gray-900">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className="text-gray-400">
                  {i < mockEuroNcap.rating ? '★' : '☆'}
                </span>
              ))} ({mockEuroNcap.rating}/5)
              <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
            </p>
          </div>
        </div>
      </div>

      {/* 2. Euro NCAP Details - MOCK */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Säkerhetsbetyg detaljer</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Vuxna passagerare</p>
              <p className="text-sm font-semibold text-gray-900">
                {mockEuroNcap.adultOccupant}%
                <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Barn</p>
              <p className="text-sm font-semibold text-gray-900">
                {mockEuroNcap.childOccupant}%
                <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Fotgängare</p>
              <p className="text-sm font-semibold text-gray-900">
                {mockEuroNcap.pedestrian}%
                <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Säkerhetsassistans</p>
              <p className="text-sm font-semibold text-gray-900">
                {mockEuroNcap.safetyAssist}%
                <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Real Safety Equipment from API */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Säkerhetsutrustning</h3>
        <div className="space-y-4">
          
          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">ABS (Anti-lock Braking System)</p>
              <p className="text-sm font-semibold text-gray-900">
                {hasABS ? "✅ Ja" : "❌ Nej"}
                {!hasABS && <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">BLIS (Blind Spot Detection)</p>
              <p className="text-sm font-semibold text-gray-900">
                {hasBLIS ? "✅ Ja" : "❌ Nej"}
                {!hasBLIS && <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Airbags</p>
              <p className="text-sm font-semibold text-gray-900">
                {hasAirbags ? "✅ Fullständigt system" : "❌ Begränsat"}
                {!hasAirbags && <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">ESC (Electronic Stability Control)</p>
              <p className="text-sm font-semibold text-gray-900">
                {hasESC ? "✅ Ja" : "❌ Ej bekräftat"}
                {!hasESC && <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.865-.833-2.631 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Automatisk nödbroms (AEB)</p>
              <p className="text-sm font-semibold text-gray-900">
                {hasAEB ? "✅ Ja" : "❌ Ej bekräftat"}
                {!hasAEB && <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Filassistans</p>
              <p className="text-sm font-semibold text-gray-900">
                {hasLaneAssist ? "✅ Ja" : "❌ Ej bekräftat"}
                {!hasLaneAssist && <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Real Euro NCAP if available from API */}
      {vehicle.euroNcap?.rating && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Euro NCAP från API</h3>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">API Betyg</p>
              <p className="text-sm font-semibold text-gray-900">
                {vehicle.euroNcap.rating}/5 stjärnor
                {vehicle.euroNcap.year && <span> ({vehicle.euroNcap.year})</span>}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. Säkerhetsbedömning - MOCK */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Säkerhetsbedömning</h3>
        <div className="flex items-start">
          <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-xs text-gray-500">Övergripande bedömning</p>
            <p className="text-sm font-semibold text-gray-900">
              Denna modell har ett starkt skydd för både förare och passagerare
              <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Baserat på Euro NCAP-betyg och tillgänglig säkerhetsutrustning från tillverkaren
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 