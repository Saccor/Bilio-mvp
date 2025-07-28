'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import type { CarInfoApiResponse } from '@/types/vehicle';

interface PriceDevelopmentProps {
  vehicleData: CarInfoApiResponse;
  registrationNumber?: string;
  isComparison?: boolean;
}

export default function PriceDevelopment({ 
  vehicleData, 
  registrationNumber, 
  isComparison = false 
}: PriceDevelopmentProps) {
  
  const vehicleBrand = vehicleData.result?.brand || 'UNKNOWN';
  const vehicleModel = vehicleData.result?.model || 'MODEL';
  
  // MOCK DATA - Depreciation values over time
  const depreciationData = [
    { period: 'Idag', value: 240000, label: '240 000 kr' },
    { period: '1 år', value: 220000, label: '220 000 kr' },
    { period: '2 år', value: 200000, label: '200 000 kr' },
    { period: '5 år', value: 145000, label: '145 000 kr' },
    { period: '10 år', value: 70000, label: '70 000 kr' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Värdeminskning över tid
          </h2>
          <p className="text-sm text-gray-600">
            Estimerat värdetapp för {vehicleBrand} {vehicleModel}
          </p>
        </div>
      </div>

      {/* Depreciation Chart */}
      <div className="mb-6">
        <div className="h-80 bg-gray-50 rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={depreciationData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="depreciationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6b7280" stopOpacity={0.3}/>
                  <stop offset="50%" stopColor="#6b7280" stopOpacity={0.15}/>
                  <stop offset="100%" stopColor="#6b7280" stopOpacity={0.02}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="period" 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#d1d5db' }}
                tickLine={{ stroke: '#d1d5db' }}
              />
              <YAxis 
                domain={[60000, 270000]}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#d1d5db' }}
                tickLine={{ stroke: '#d1d5db' }}
                tickFormatter={(value) => `${Math.round(value / 1000)}k`}
              />
              <Tooltip 
                formatter={(value) => [`${value.toLocaleString()} kr`, 'Värde']}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#374151"
                strokeWidth={2}
                fill="url(#depreciationGradient)"
                dot={{ fill: '#374151', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#374151' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Value Timeline */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {depreciationData.map((point, index) => (
          <div key={index} className="text-center">
            <div className="bg-gray-100 rounded-lg p-3 mb-2">
              <div className="text-xs text-gray-600 mb-1">{point.period}</div>
              <div className="font-bold text-gray-900 text-sm">{point.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* MOCKUP indicators */}
      <div className="flex justify-center mb-4">
        <span className="text-xs text-gray-400 bg-gray-200 px-3 py-1 rounded">
          MOCKUP - Estimerade värden
        </span>
      </div>

      {/* Footer note */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-2">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">Om värdeminskning</p>
            <p className="text-xs text-blue-700">
              Värdeminskningen baseras på mockup-data och allmänna marknadstrender. 
              För exakta värderingar krävs integration med professionella värderingstjänster 
              och aktuell marknadsdata för specifika modeller.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 