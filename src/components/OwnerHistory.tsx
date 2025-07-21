export default function OwnerHistory() {
  // MOCKED DATA (kan senare ersättas med API-response)
  const ownerData = {
    totalOwners: 2, /** MOCK DATA */
    lastOwnershipChange: "2022-05-10", /** MOCK DATA */
    lastOwnerType: "Företag", /** MOCK DATA */
    warranty: {
      newCar: {
        validUntil: "2024-06-01", /** MOCK DATA */
        included: true, /** MOCK DATA */
      },
      extended: {
        included: true, /** MOCK DATA */
        description: "Garanti via MRF bilhandlare – täcker drivlina t.o.m. 2025", /** MOCK DATA */
      },
    },
  };

  return (
    <section className="p-6 bg-white rounded-xl shadow-md border">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Fullständig Ägarhistorik & Garanti</h2>

      {/* Ägarhistorik */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ägarhistorik</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Antal tidigare ägare</p>
              <p className="text-sm font-semibold text-gray-900">
                {ownerData.totalOwners}
                <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Senaste ägarbyte</p>
              <p className="text-sm font-semibold text-gray-900">
                {ownerData.lastOwnershipChange}
                <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Senaste ägare</p>
              <p className="text-sm font-semibold text-gray-900">
                {ownerData.lastOwnerType}
                <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Garantier */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Garanti</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Nybilsgaranti</p>
              <p className="text-sm font-semibold text-gray-900">
                {ownerData.warranty.newCar.included 
                  ? `Giltig till ${ownerData.warranty.newCar.validUntil}` 
                  : "Ingen"
                }
                <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Förlängd garanti</p>
              <p className="text-sm font-semibold text-gray-900">
                {ownerData.warranty.extended.included 
                  ? ownerData.warranty.extended.description 
                  : "Ingen"
                }
                <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 