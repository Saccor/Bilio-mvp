// src/app/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [regnr1, setRegnr1] = useState('');
  const [regnr2, setRegnr2] = useState('');

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (regnr1.trim()) {
      // Navigate to results page with registration number
      const params = new URLSearchParams({ 
        regnr: regnr1.trim().toUpperCase(),
        fromSearch: 'true' // Markera att detta är en ny sökning
      });
      if (regnr2.trim()) {
        params.append('compare', regnr2.trim().toUpperCase());
      }
      router.push(`/results?${params.toString()}`);
    }
  };
  
  return (
    <div className="bg-gray-50">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Jämför och analysera bilar<br />
            <span className="text-gray-700">via registreringsnumret</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Vi granskar all tillgänglig information för att du ska kunna köpa begagnad bil med trygghet
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-12 px-2 sm:px-0">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">Marknadsvärde</span>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">Ägandekostnad</span>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">Fordonsanalys</span>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">Skadehistorik</span>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">Värdeminskning</span>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-700">Säkerhetsdata</span>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="flex justify-center space-x-8 sm:space-x-12 mb-12">
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-2 font-medium">Analys</div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">149 kr</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-2 font-medium">Jämförelse</div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">199 kr</div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-medium text-gray-900 mb-4 text-center">
            Förhandsgranskning innan du betalar
          </h2>
          
          <p className="text-sm text-gray-600 text-center mb-4">
            En förhandsgranskning visar vad analysen innehåller. Därefter väljer du själv om du vill betala för att se hela analysen eller jämförelsen.
          </p>
          
          <p className="text-sm text-gray-600 text-center mb-8">
            Du kan självklart analysera och jämföra bilar som säljs av både privatpersoner och bilhandlare
          </p>

          <form onSubmit={handleAnalyze}>
            <div className="space-y-6">
              {/* First Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bil att analysera
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={regnr1}
                    onChange={(e) => setRegnr1(e.target.value)}
                    placeholder="VVV999"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Second Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jämför med bil (valfritt)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={regnr2}
                    onChange={(e) => setRegnr2(e.target.value)}
                    placeholder="VVV999"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8 text-center">
              <button 
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3.5 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!regnr1.trim()}
              >
                Ange registreringsnummer för att börja
              </button>
            </div>
          </form>

          {/* Footer Text */}
          <p className="text-xs text-gray-500 text-center mt-6">
            Kostnadsfri förhandsgranskning — Inspektera vår analys — Betala först du finner rapporten värdefull
          </p>
        </div>

        {/* What's Included Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Vad ingår?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Vår analys är utformad så att vem som helst kan förstå informationen och fatta ett bra beslut.
              </p>
              
              {/* Pricing */}
              <div className="flex justify-center space-x-12 mb-12">
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Analys</div>
                  <div className="text-3xl font-bold text-orange-500">149 kr</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Jämförelse</div>
                  <div className="text-3xl font-bold text-gray-900">199 kr</div>
                </div>
              </div>
            </div>

            {/* Features Comparison */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-100">
                
                {/* Bilhälsomätarn */}
                <div className="p-4 sm:p-6 flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Bilhälsomätarn</h3>
                    <p className="text-sm text-gray-600">Betyg som kombinerar flera faktorer för att visa om bilen är ett bra köp eller inte</p>
                  </div>
                  <div className="flex space-x-4 sm:space-x-8 flex-shrink-0">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Prisanalys */}
                <div className="p-4 sm:p-6 flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Prisanalys</h3>
                    <p className="text-sm text-gray-600">Jämförelse med marknadspris för liknande bilar</p>
                  </div>
                  <div className="flex space-x-4 sm:space-x-8 flex-shrink-0">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Skadehistorik */}
                <div className="p-4 sm:p-6 flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Skadehistorik</h3>
                    <p className="text-sm text-gray-600">Se rapporterade skador på bilen</p>
                  </div>
                  <div className="flex space-x-4 sm:space-x-8 flex-shrink-0">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Servicebok */}
                <div className="p-4 sm:p-6 flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Servicebok</h3>
                    <p className="text-sm text-gray-600">Se bilens servicebok och få en uppfattning om den har blivit ordentligt omhändertagen</p>
                  </div>
                  <div className="flex space-x-4 sm:space-x-8 flex-shrink-0">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Fordonsstatus */}
                <div className="p-4 sm:p-6 flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Fordonsstatus</h3>
                    <p className="text-sm text-gray-600">Se om bilen har varit taxi, hyrbil, stulen eller importerad</p>
                  </div>
                  <div className="flex space-x-4 sm:space-x-8 flex-shrink-0">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Kända problem */}
                <div className="p-4 sm:p-6 flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Kända problem</h3>
                    <p className="text-sm text-gray-600">Vanliga problem som uppkommer vid bilens aktuella mätarställning</p>
                  </div>
                  <div className="flex space-x-4 sm:space-x-8 flex-shrink-0">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Euro NCAP */}
                <div className="p-4 sm:p-6 flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Euro NCAP</h3>
                    <p className="text-sm text-gray-600">Se bilens säkerhetsbetyg inom flera olika områden</p>
                  </div>
                  <div className="flex space-x-4 sm:space-x-8 flex-shrink-0">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Ägarhistorik & Garanti */}
                <div className="p-4 sm:p-6 flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Ägarhistorik & Garanti</h3>
                    <p className="text-sm text-gray-600">Se antal ägare och ifall bilen fortfarande har sin nybilsgaranti kvar</p>
                  </div>
                  <div className="flex space-x-4 sm:space-x-8 flex-shrink-0">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Driftskostnad */}
                <div className="p-4 sm:p-6 flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Driftskostnad</h3>
                    <p className="text-sm text-gray-600">Se en detaljerad uppskattning om vad bilen kommer kosta att äga</p>
                  </div>
                  <div className="flex space-x-4 sm:space-x-8 flex-shrink-0">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Värdeminskning */}
                <div className="p-4 sm:p-6 flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Värdeminskning</h3>
                    <p className="text-sm text-gray-600">Se hur mycket bilen förväntas tappa i värde år för år</p>
                  </div>
                  <div className="flex space-x-4 sm:space-x-8 flex-shrink-0">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Information om säljaren */}
                <div className="p-4 sm:p-6 flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Information om säljaren</h3>
                    <p className="text-sm text-gray-600">Se om säljaren är en privatperson eller en bilhandlare. Betyg visas för bilhandlare</p>
                  </div>
                  <div className="flex space-x-4 sm:space-x-8 flex-shrink-0">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Utrustningspaket */}
                <div className="p-4 sm:p-6 flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Utrustningspaket</h3>
                    <p className="text-sm text-gray-600">Komplett lista över standard och extra utrustning</p>
                  </div>
                  <div className="flex space-x-4 sm:space-x-8 flex-shrink-0">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Teknisk data */}
                <div className="p-4 sm:p-6 flex items-center justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Teknisk data</h3>
                    <p className="text-sm text-gray-600">Motorspecifikationer, prestanda och tekniska detaljer</p>
                  </div>
                  <div className="flex space-x-4 sm:space-x-8 flex-shrink-0">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Direktjämförelse sida vid sida */}
                <div className="p-4 sm:p-6 flex items-center justify-between bg-orange-50">
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Direktjämförelse sida vid sida</h3>
                    <p className="text-sm text-gray-600">Alla data för båda bilarna jämförs parallellt</p>
                  </div>
                  <div className="flex space-x-4 sm:space-x-8 flex-shrink-0">
                    <div className="text-gray-300">—</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
