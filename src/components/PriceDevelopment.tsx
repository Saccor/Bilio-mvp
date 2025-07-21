'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PriceDevelopment() {
  // MOCKED price history data
  const priceHistory = [
    { month: 'Jan 2023', price: 189000 },
    { month: 'Apr 2023', price: 185000 },
    { month: 'Jul 2023', price: 179000 },
    { month: 'Okt 2023', price: 176000 },
    { month: 'Jan 2024', price: 172000 },
    { month: 'Apr 2024', price: 168000 },
    { month: 'Jul 2024', price: 164000 },
  ]; /** MOCK DATA */

  const currentPrice = 159000; /** MOCK DATA */
  const estimatedMarketValue = 165000; /** MOCK DATA */
  const forecastValue = 150000; /** MOCK DATA */

  return (
    <section className="p-6 bg-white rounded-xl shadow-md border">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Fullständig Prisutveckling</h2>

      {/* Price Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Prisutveckling senaste 18 månaderna</h3>
        <div className="h-64 bg-gray-50 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#d1d5db' }}
              />
              <YAxis 
                domain={['auto', 'auto']} 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#d1d5db' }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value) => [`${value.toLocaleString()} kr`, 'Pris']}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#6b7280" 
                strokeWidth={2}
                dot={{ fill: '#6b7280', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#374151' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-gray-400 mt-2">/** MOCK DATA */</p>
      </div>

      {/* Price Analysis */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Prisanalys</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Nuvarande annonspris</p>
              <p className="text-sm font-semibold text-gray-900">
                {currentPrice.toLocaleString()} kr
                <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Beräknat marknadsvärde</p>
              <p className="text-sm font-semibold text-gray-900">
                {estimatedMarketValue.toLocaleString()} kr
                <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <div>
              <p className="text-xs text-gray-500">Värdeprognos inom 6 månader</p>
              <p className="text-sm font-semibold text-gray-900">
                {forecastValue.toLocaleString()} kr
                <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Summary */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Marknadsanalys</h3>
        <div className="flex items-start">
          <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-xs text-gray-500">Bedömning</p>
            <p className="text-sm font-semibold text-gray-900">
              Priset ligger under marknadsvärdet – potentiellt bra affär
              <span className="text-xs text-gray-400 ml-2">/** MOCK DATA */</span>
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Baserat på jämförelse med liknande fordon och historisk prisutveckling
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 