import type { Vehicle } from '@/types/vehicle';

interface VehicleStatusProps {
  vehicle: Vehicle;
  registrationNumber: string;
}

export default function VehicleStatus({ vehicle, registrationNumber }: VehicleStatusProps) {
  /** MOCK DATA - Statusbedömning baseras på real API-data men algoritmen är mock */
  const getVehicleStatus = () => {
    let score = 0;
    let factors = [];

    // Assess based on real API data but calculations are MOCK
    if (vehicle.year && vehicle.year >= 2020) {
      score += 2;
      factors.push("modern årsmodell");
    } else if (vehicle.year && vehicle.year >= 2015) {
      score += 1;
      factors.push("relativt ny");
    }

    if (vehicle.enginePower && vehicle.enginePower >= 100) {
      score += 1;
      factors.push("kraftfull motor");
    }

    if (vehicle.euroNcap?.rating && vehicle.euroNcap.rating >= 4) {
      score += 2;
      factors.push("hög säkerhetsrating");
    }

    // Determine status based on score
    if (score >= 4) {
      return { status: "Utmärkt skick", factors };
    } else if (score >= 2) {
      return { status: "Bra skick", factors };
    } else if (score >= 1) {
      return { status: "Godkänt skick", factors };
    } else {
      return { status: "Kräver uppmärksamhet", factors };
    }
  };

  const vehicleAssessment = getVehicleStatus();

  return (
    <section className="p-6 bg-white rounded-xl shadow-md border">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Fullständig Fordonsstatus</h2>

      {/* 1. Grundläggande fordonsinfo - FROM API */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {vehicle.brand} {vehicle.model}
          {vehicle.variant && <span className="text-gray-600"> {vehicle.variant}</span>}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Registreringsnummer</p>
              <p className="text-sm font-semibold text-gray-900">{registrationNumber}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Årsmodell</p>
              <p className="text-sm font-semibold text-gray-900">{vehicle.year || 2014}</p>
            </div>
          </div>

          {vehicle.color && (
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2V3z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Färg</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.color}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Övergripande statusbedömning */}
      <div className="mb-8">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-xs text-gray-500">Fordonsstatus</p>
            <p className="text-sm font-semibold text-gray-900">
              {vehicleAssessment.status}
              {vehicleAssessment.factors.length > 0 && (
                <span className="text-gray-600"> – {vehicleAssessment.factors.join(', ')}</span>
              )}
            </p>
            <p className="text-xs text-gray-400">/** MOCK DATA */</p>
          </div>
        </div>
      </div>

      {/* 3. Kritiska statusflaggor */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Kritiska statusflaggor</h3>
        <div className="space-y-4">
          
          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Importstatus</p>
              <p className="text-sm font-semibold text-gray-900">
                {vehicle.history?.imported ? "Importerad" : "Ej importerad"}
                <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Användningshistorik</p>
              <p className="text-sm font-semibold text-gray-900">
                {vehicle.history?.taxi || vehicle.history?.rental ? "Taxi eller hyrbil" : "Ej taxi eller hyrbil"}
                <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Säkerhetsstatus</p>
              <p className="text-sm font-semibold text-gray-900">
                {vehicle.history?.stolen ? "Stulen" : "Ej stulen"}
                <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Mätarställning</p>
              <p className="text-sm font-semibold text-gray-900">
                Rimlig
                <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.865-.833-2.631 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Återkallelser</p>
              <p className="text-sm font-semibold text-gray-900">
                Ingen aktiv återkallelse
                <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
              </p>
            </div>
          </div>
          
        </div>
      </div>

      {/* 4. Statussammanfattning */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Statussammanfattning</h3>
        <div className="space-y-4">
          
          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Övergripande bedömning</p>
              <p className="text-sm font-semibold text-gray-900">
                {vehicleAssessment.status}
                <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Senaste statuskontroll</p>
              <p className="text-sm font-semibold text-gray-900">
                Genomförd utan anmärkning
                <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
              </p>
            </div>
          </div>

          {vehicle.firstRegistration && (
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500">Första registrering</p>
                <p className="text-sm font-semibold text-gray-900">{vehicle.firstRegistration}</p>
              </div>
            </div>
          )}

          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Status uppdaterad</p>
              <p className="text-sm font-semibold text-gray-900">
                {new Date().toLocaleDateString('sv-SE')}
                <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
} 