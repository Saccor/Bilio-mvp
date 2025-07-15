export default function OmBilio() {
  return (
    <div className="bg-gray-50">

      {/* Hero Stats Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Sveriges smartaste biljämförelse
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Gör bilköpet transparent<br />
            och tryggt
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-16">
            Sveriges mest omfattande plattform för analys och jämförelse<br />
            av begagnade bilar
          </p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                10,000+
              </div>
              <div className="text-gray-600 font-medium">
                jämförelser gjorda
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                1,000+
              </div>
              <div className="text-gray-600 font-medium">
                bilmodeller analyserade
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                5 sek
              </div>
              <div className="text-gray-600 font-medium">
                för komplett analys
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Bilio Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Så fungerar Bilio
            </h2>
            <p className="text-lg text-gray-600">
              Från registreringsnummer till trygg bilaffär på några sekunder
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold mr-4">
                      1
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Ange registreringsnummer
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Ange registreringsnummer till bilarna du är intresserad av att analysera eller jämföra
                  </p>
                </div>
                <div className="ml-8 flex-shrink-0">
                  <div className="w-16 h-16 text-gray-400">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold mr-4">
                      2
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Jämför och analysera
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Analysera och jämför dessa bilar och få en djup men lättförståelig analys av allt du behöver veta för att kunna avgöra om bilen är ett bra köp eller inte.
                  </p>
                </div>
                <div className="ml-8 flex-shrink-0">
                  <div className="w-16 h-16 text-gray-400">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold mr-4">
                      3
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Repetera
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Upprepa processen tills du hittar din drömbil och kontakta sedan säljaren för att genomföra affären.
                  </p>
                </div>
                <div className="ml-8 flex-shrink-0">
                  <div className="w-16 h-16 text-gray-400">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Bilio Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Varför Bilio?
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Sveriges enda<br />jämförelseplattform
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Analysera och jämför specifika fordon genom registreringsnummer
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Förenklad<br />information
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Vi tar svårsmält information och gör den begriplig för alla
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Transparent bilköp
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Vi eliminerar kunskapströskeln många upplever vid bilköp
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Snabb analys
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Få en komplett bilanalys på några sekunder, välj mellan en eller två bilar åt gången
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">FAQ</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
              Vanliga frågor
            </h3>
          </div>

          {/* FAQ List */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {/* FAQ 1 */}
              <details className="group">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="text-lg font-medium text-gray-900">
                    Kostar det något att använda Bilio?
                  </span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    Bilio erbjuder en kostnadsfri förhandsgranskning där du kan se vad vår analys innehåller. För att få tillgång till den fullständiga analysen kostar det 149 kr, och för en jämförelse mellan två bilar kostar det 199 kr.
                  </p>
                </div>
              </details>

              {/* FAQ 2 */}
              <details className="group">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="text-lg font-medium text-gray-900">
                    Vilka källor använder ni för er bildata?
                  </span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    Vi samlar data från flera pålitliga källor inklusive Transportstyrelsen, försäkringsbolag, och andra officiella register för att ge dig den mest omfattande bilanalysen möjligt.
                  </p>
                </div>
              </details>

              {/* FAQ 3 */}
              <details className="group">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="text-lg font-medium text-gray-900">
                    Vilka bilar och vilka områden täcker ni?
                  </span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    Vi täcker alla personbilar registrerade i Sverige. Vår databas innehåller information om över 1000 olika bilmodeller från alla större tillverkare.
                  </p>
                </div>
              </details>

              {/* FAQ 4 */}
              <details className="group">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="text-lg font-medium text-gray-900">
                    Är Bilio oberoende eller samarbetar ni med bilhandlare?
                  </span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    Bilio är helt oberoende. Vi samarbetar inte med bilhandlare och får inga provisioner från försäljningar. Våra analyser är objektiva och baserade enbart på faktisk data.
                  </p>
                </div>
              </details>

              {/* FAQ 5 */}
              <details className="group">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="text-lg font-medium text-gray-900">
                    Kan jag lita på era analyser och rekommendationer?
                  </span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    Våra analyser baseras på verifierad data från officiella källor. Vi presenterar fakta och trender, men den slutgiltiga köpbeslut är alltid ditt. Vi rekommenderar alltid att du också gör en fysisk besiktning.
                  </p>
                </div>
              </details>

              {/* FAQ 6 */}
              <details className="group">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="text-lg font-medium text-gray-900">
                    Vad händer med mina uppgifter när jag använder Bilio?
                  </span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    Vi respekterar din integritet och hanterar alla uppgifter enligt GDPR. Vi delar aldrig dina personuppgifter med tredje part utan ditt medgivande och lagrar endast nödvändig information.
                  </p>
                </div>
              </details>

              {/* FAQ 7 */}
              <details className="group">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="text-lg font-medium text-gray-900">
                    Hur skiljer sig Bilio från andra bilsajter?
                  </span>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    Till skillnad från andra sajter fokuserar vi på specifika fordon genom registreringsnummer. Vi ger djupgående analyser av enskilda bilar istället för generella modellbeskrivningar, vilket gör ditt bilköp mycket mer informerat.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 