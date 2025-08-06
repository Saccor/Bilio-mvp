import { useState } from 'react';
import type { CarInfoApiResponse } from '@/types/vehicle';
import { calculateHealthScore } from '@/utils/health-calculator';

interface HealthMeterProps {
  vehicleData: CarInfoApiResponse;
  registrationNumber?: string;
  isComparison?: boolean;
}

export default function HealthMeter({ 
  vehicleData
}: HealthMeterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Calculate health score using CEO's exact specification
  const healthResult = calculateHealthScore(vehicleData);
  
  const vehicleBrand = vehicleData.result?.brand || 'UNKNOWN';
  const vehicleModel = vehicleData.result?.model || 'MODEL';

  // Use the grade from the calculation result with fallback
  const overallGrade = healthResult.breakdown?.grade || { grade: 'C', description: 'OK', color: 'bg-orange-500' };

  const getScoreBackgroundColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 50) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
      {/* Header with grade badge and expand arrow */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          {/* Grade Badge */}
          <div className={`w-8 h-8 rounded-full ${overallGrade.color} flex items-center justify-center`}>
            <span className="text-white font-bold text-sm">{overallGrade.grade}</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Bilhälsometer
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">API</span>
          </h2>
        </div>
        {/* Expand/Collapse Arrow */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <svg 
            className={`w-5 h-5 text-gray-400 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Vehicle assessment text */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Vår bedömning av {vehicleBrand} {vehicleModel}
        </p>
      </div>

      {/* Center grade display */}
      <div className="text-center mb-6">
        <div className={`text-6xl font-bold mb-2 ${
          overallGrade.grade === 'A' ? 'text-green-500' :
          overallGrade.grade === 'B' ? 'text-green-400' :
          overallGrade.grade === 'C' ? 'text-orange-500' :
          overallGrade.grade === 'D' ? 'text-orange-400' :
          'text-red-500'
        }`}>
          {overallGrade.grade}
        </div>
        <div className="text-2xl font-semibold text-gray-900 mb-1">
          {healthResult.healthIndex} poäng
        </div>
        <div className="text-sm text-blue-600">
          {healthResult.breakdown?.categories?.length || 11} kategorier analyserade
        </div>
      </div>

      {/* Progress bar with distinct color segments */}
      <div className="relative mb-6">
        {/* Background with distinct color segments */}
        <div className="w-full h-4 rounded-full relative overflow-hidden bg-gray-200">
          {/* 0-50: Orange */}
          <div className="absolute left-0 top-0 h-full bg-orange-400 rounded-l-full" style={{ width: '50%' }}></div>
          
          {/* 50-65: Orange */}
          <div className="absolute top-0 h-full bg-orange-400" style={{ left: '50%', width: '15%' }}></div>
          
          {/* 65-80: Yellow/Light Orange */}
          <div className="absolute top-0 h-full bg-yellow-300" style={{ left: '65%', width: '15%' }}></div>
          
          {/* 80-90: Light Green */}
          <div className="absolute top-0 h-full bg-green-300" style={{ left: '80%', width: '10%' }}></div>
          
          {/* 90-100: Green */}
          <div className="absolute top-0 h-full bg-green-400 rounded-r-full" style={{ left: '90%', width: '10%' }}></div>
          
          {/* Score indicator */}
          <div 
            className="absolute top-0 h-full w-1 bg-gray-800 shadow-lg z-10"
            style={{ left: `${healthResult.healthIndex}%` }}
          ></div>
        </div>
        
        {/* Scale markers */}
        <div className="relative mt-2">
          <div className="absolute text-xs text-gray-500" style={{ left: '0%', transform: 'translateX(0%)' }}>0</div>
          <div className="absolute text-xs text-gray-500" style={{ left: '50%', transform: 'translateX(-50%)' }}>50</div>
          <div className="absolute text-xs text-gray-500" style={{ left: '65%', transform: 'translateX(-50%)' }}>65</div>
          <div className="absolute text-xs text-gray-500" style={{ left: '80%', transform: 'translateX(-50%)' }}>80</div>
          <div className="absolute text-xs text-gray-500" style={{ left: '90%', transform: 'translateX(-50%)' }}>90</div>
          <div className="absolute text-xs text-gray-500" style={{ left: '100%', transform: 'translateX(-100%)' }}>100</div>
        </div>
      </div>

      {/* Expandable detailed section */}
      {isExpanded && (
        <div className="space-y-6 border-t pt-6">


          {/* CEO's 11 Categories */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs text-gray-600">#</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">CEO Specifikation - 11 Kategorier ({healthResult.healthIndex}/100 poäng)</h3>
            </div>
            
            <div className="text-xs text-gray-500 mb-4">
              Varje kategori bedöms 0-100 poäng och multipliceras med sin viktning för slutbetyget.
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {(healthResult.breakdown?.categories || []).map((category, index) => (
                <div key={index} className={`p-3 rounded-lg border ${getScoreBackgroundColor(category.score)}`}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                      <span className="text-xs text-gray-500">({category.weight})</span>
                      {category.isMock && (
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                          MOCK
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{category.score}/100</div>
                      <div className="text-xs text-gray-500">= {category.contributedPoints}p</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getScoreBarColor(category.score)}`}
                      style={{ width: `${category.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grading scale section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                <span className="text-xs text-gray-600">i</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Hur vi bedömer</h3>
            </div>
            
            <div className="bg-white rounded-lg">
              <h4 className="font-medium text-gray-900 mb-4">Betygsskala</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">A</span>
                    </div>
                    <span className="font-medium text-gray-900">Fynd - Svårt att hitta bättre</span>
                  </div>
                  <span className="text-sm text-gray-500">90-100</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">B</span>
                    </div>
                    <span className="font-medium text-gray-900">Bra köp - Rekommenderas</span>
                  </div>
                  <span className="text-sm text-gray-500">80-89</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">C</span>
                    </div>
                    <span className="font-medium text-gray-900">OK - Kolla vidare</span>
                  </div>
                  <span className="text-sm text-gray-500">65-79</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">D</span>
                    </div>
                    <span className="font-medium text-gray-900">Tveksamt - Risk</span>
                  </div>
                  <span className="text-sm text-gray-500">50-64</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">E</span>
                    </div>
                    <span className="font-medium text-gray-900">Undvik - Hög risk</span>
                  </div>
                  <span className="text-sm text-gray-500">0-49</span>
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Status */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">CEO Specifikation - Implementeringsstatus</p>
                <p className="text-xs text-blue-700">
                  Denna beräkning följer exakt den specifikation som angetts av VD. Alla 11 kategorier med korrekt viktning är implementerade. 
                  &quot;Körda mil&quot; använder API-data, resterande kategorier är mock-data tills fler integrationer genomförs.
                  Exakt formler enligt specifikation: 20% billigare = 100p, normal körsträcka 1500 mil/år, etc.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 