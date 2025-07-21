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
      const params = new URLSearchParams({ regnr: regnr1.trim().toUpperCase() });
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Jämför och analysera bilar<br />
            <span className="text-orange-500">via registreringsnumret</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vi granskar all tillgänglig information för att du ska kunna köpa begagnad bil med trygghet
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="text-orange-500 mb-2">💰</div>
            <span className="text-sm text-gray-700">Marknadsvärde</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="text-gray-600 mb-2">📊</div>
            <span className="text-sm text-gray-700">Ägandekostnad</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="text-gray-600 mb-2">🔍</div>
            <span className="text-sm text-gray-700">Fordonsanalys</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="text-red-500 mb-2">⚠️</div>
            <span className="text-sm text-gray-700">Skadehistorik</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="text-blue-500 mb-2">📉</div>
            <span className="text-sm text-gray-700">Värdeminskning</span>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="text-gray-600 mb-2">🛡️</div>
            <span className="text-sm text-gray-700">Säkerhetsdata</span>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">Analys</div>
            <div className="text-2xl font-bold text-orange-500">149 kr</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">Jämförelse</div>
            <div className="text-2xl font-bold text-gray-900">199 kr</div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
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
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
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
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8 text-center">
              <button 
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <div className="p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Bilhälsomätarn</h3>
                    <p className="text-sm text-gray-600">Betyg som kombinerar flera faktorer för att visa om bilen är ett bra köp eller inte</p>
                  </div>
                  <div className="flex space-x-8 ml-8">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Prisanalys */}
                <div className="p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Prisanalys</h3>
                    <p className="text-sm text-gray-600">Jämförelse med marknadspris för liknande bilar</p>
                  </div>
                  <div className="flex space-x-8 ml-8">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Skadehistorik */}
                <div className="p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Skadehistorik</h3>
                    <p className="text-sm text-gray-600">Se rapporterade skador på bilen</p>
                  </div>
                  <div className="flex space-x-8 ml-8">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Servicebok */}
                <div className="p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Servicebok</h3>
                    <p className="text-sm text-gray-600">Se bilens servicebok och få en uppfattning om den har blivit ordentligt omhändertagen</p>
                  </div>
                  <div className="flex space-x-8 ml-8">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Fordonsstatus */}
                <div className="p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Fordonsstatus</h3>
                    <p className="text-sm text-gray-600">Se om bilen har varit taxi, hyrbil, stulen eller importerad</p>
                  </div>
                  <div className="flex space-x-8 ml-8">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Kända problem */}
                <div className="p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Kända problem</h3>
                    <p className="text-sm text-gray-600">Vanliga problem som uppkommer vid bilens aktuella mätarställning</p>
                  </div>
                  <div className="flex space-x-8 ml-8">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Euro NCAP */}
                <div className="p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Euro NCAP</h3>
                    <p className="text-sm text-gray-600">Se bilens säkerhetsbetyg inom flera olika områden</p>
                  </div>
                  <div className="flex space-x-8 ml-8">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Ägarhistorik & Garanti */}
                <div className="p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Ägarhistorik & Garanti</h3>
                    <p className="text-sm text-gray-600">Se antal ägare och ifall bilen fortfarande har sin nybilsgaranti kvar</p>
                  </div>
                  <div className="flex space-x-8 ml-8">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Driftskostnad */}
                <div className="p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Driftskostnad</h3>
                    <p className="text-sm text-gray-600">Se en detaljerad uppskattning om vad bilen kommer kosta att äga</p>
                  </div>
                  <div className="flex space-x-8 ml-8">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Värdeminskning */}
                <div className="p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Värdeminskning</h3>
                    <p className="text-sm text-gray-600">Se hur mycket bilen förväntas tappa i värde år för år</p>
                  </div>
                  <div className="flex space-x-8 ml-8">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Information om säljaren */}
                <div className="p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Information om säljaren</h3>
                    <p className="text-sm text-gray-600">Se om säljaren är en privatperson eller en bilhandlare. Betyg visas för bilhandlare</p>
                  </div>
                  <div className="flex space-x-8 ml-8">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Utrustningspaket */}
                <div className="p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Utrustningspaket</h3>
                    <p className="text-sm text-gray-600">Komplett lista över standard och extra utrustning</p>
                  </div>
                  <div className="flex space-x-8 ml-8">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Teknisk data */}
                <div className="p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Teknisk data</h3>
                    <p className="text-sm text-gray-600">Motorspecifikationer, prestanda och tekniska detaljer</p>
                  </div>
                  <div className="flex space-x-8 ml-8">
                    <div className="text-green-600">✓</div>
                    <div className="text-green-600">✓</div>
                  </div>
                </div>

                {/* Direktjämförelse sida vid sida */}
                <div className="p-6 flex items-center justify-between bg-orange-50">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Direktjämförelse sida vid sida</h3>
                    <p className="text-sm text-gray-600">Alla data för båda bilarna jämförs parallellt</p>
                  </div>
                  <div className="flex space-x-8 ml-8">
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
