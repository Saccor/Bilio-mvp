interface SellerInformationProps {
  isComparison?: boolean;
  regnr?: string;
  compareRegnr?: string;
}

export default function SellerInformation({ isComparison = false, regnr, compareRegnr }: SellerInformationProps) {
  /** MOCK DATA - Säljaresinformation är simulerad */
  const DealerCard = ({ registrationNumber }: { registrationNumber?: string }) => (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900">Bilio AB</h3>
            <div className="ml-2 w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <p className="text-sm text-blue-600 mb-1">Auktoriserad återförsäljare</p>
          <p className="text-sm text-gray-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Stockholm
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>

      {/* Trustpilot Rating */}
      <div className="flex items-center mb-4">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTUuMDkgOC4yNkwyMiA5TDE3IDEzTDE4LjE4IDIyTDEyIDE4LjM5TDUuODIgMjJMNyAxM0wyIDlMOC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjMDBCNjdBIi8+Cjwvc3ZnPgo=" alt="Trustpilot" className="w-6 h-6 mr-2" />
        <span className="text-sm font-semibold text-gray-900">4.8</span>
        <span className="text-sm text-gray-600 ml-1">(112 recensioner)</span>
      </div>

      {/* Bilhandlarbetyg */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-900 mb-1">Bilhandlarbetyg</p>
        <div className="flex items-center">
          <div className="text-2xl font-bold text-green-600">95</div>
          <div className="text-sm text-gray-600 ml-1">/100</div>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Välkommen till Bilio! Vi är en av Sveriges ledande återförsäljare av kvalitetsbilar. Trygghet och service är vårt motto.
      </p>

      <div className="text-xs text-gray-500 mb-4">
        <p className="font-medium mb-1">Öppettider</p>
        <p>Mån-Fre 09-18, Lör 10-15</p>
      </div>

      {/* Contact Buttons */}
      <div className={`${isComparison ? 'space-y-2' : 'grid grid-cols-3 gap-3'}`}>
        <button className="bg-gray-900 text-white py-3 px-4 rounded-lg flex items-center justify-center font-medium hover:bg-gray-800 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Ring
        </button>
        <button className="bg-gray-100 text-gray-900 py-3 px-4 rounded-lg flex items-center justify-center font-medium hover:bg-gray-200 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Mejla
        </button>
        <button className="border border-gray-300 text-gray-700 py-3 px-4 rounded-lg flex items-center justify-center font-medium hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Se annons
        </button>
      </div>
    </div>
  );

  const PrivateCard = ({ registrationNumber }: { registrationNumber?: string }) => (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900">Privatperson</h3>
            <div className="ml-2 w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <p className="text-sm text-blue-600 mb-1">Privatperson</p>
          <p className="text-sm text-gray-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Stockholm
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>

      {/* Verified Seller Badge */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
        <div className="flex items-center">
          <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-green-800">Verifierad säljare</span>
        </div>
        <p className="text-xs text-green-700 mt-1">Annonsen ligger på Blocket.se</p>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Kontakta säljaren för mer information om bilen och för att boka en visning.
      </p>

      {/* Contact Buttons */}
      <div className="space-y-2">
        <button className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg flex items-center justify-center font-medium hover:bg-gray-800 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Ring
        </button>
        <button className="w-full bg-gray-100 text-gray-900 py-3 px-4 rounded-lg flex items-center justify-center font-medium hover:bg-gray-200 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Mejla
        </button>
        <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg flex items-center justify-center font-medium hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Se annons
        </button>
      </div>
    </div>
  );

  if (isComparison) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Primary Vehicle Seller - Dealer */}
        <DealerCard registrationNumber={regnr} />
        
        {/* Comparison Vehicle Seller - Private */}
        <PrivateCard registrationNumber={compareRegnr} />
      </div>
    );
  }

  // Single mode: Show dealer information
  return (
    <div className="mt-8">
      <DealerCard registrationNumber={regnr} />
    </div>
  );
} 