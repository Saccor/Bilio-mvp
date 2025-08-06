import { useState } from 'react';
import type { CarInfoApiResponse } from '@/types/vehicle';

interface SafetyAnalysisProps {
  vehicleData: CarInfoApiResponse;
  registrationNumber?: string;
  isComparison?: boolean;
}

export default function SafetyAnalysis({ 
  vehicleData, 
  registrationNumber, 
  isComparison = false 
}: SafetyAnalysisProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // MOCK DATA - Euro NCAP ratings since not available from Car.info API
  const euroNcapData = {
    rating: 5,
    maxRating: 5,
    testYear: 2022,
    categories: [
      { name: 'Vuxenskydd', score: 95, color: 'bg-green-500' },
      { name: 'Barnkrydd', score: 89, color: 'bg-green-500' },
      { name: 'Fotgängarskydd', score: 80, color: 'bg-green-500' },
      { name: 'Säkerhetsassistans', score: 93, color: 'bg-green-500' }
    ]
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center cursor-pointer">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Säkerhetsdata
            </h2>
            <p className="text-sm text-gray-600">
              Euro NCAP & säkerhetsutrustning
            </p>
          </div>
        </div>
        {/* Expand/Collapse Arrow */}
        <button 
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

      {/* Expandable Content */}
      {isExpanded && (
        <div className="space-y-6 border-t pt-6">
          {/* Euro NCAP Rating */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Euro NCAP-betyg</h3>
                  <p className="text-sm text-gray-600">Testat {euroNcapData.testYear}</p>
                </div>
              </div>
              
              {/* Star Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {Array.from({ length: euroNcapData.maxRating }, (_, i) => (
                    <svg 
                      key={i} 
                      className={`w-6 h-6 ${i < euroNcapData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ))}
                </div>
                <span className="text-lg font-bold text-gray-900">{euroNcapData.rating}/{euroNcapData.maxRating}</span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">Toppbetyg från Euro NCAP</p>
            
            {/* Safety Categories with Progress Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {euroNcapData.categories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <span className="text-sm font-bold text-gray-900">{category.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${category.color} transition-all duration-500 ease-out`}
                      style={{ width: `${category.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MOCKUP indicator */}
          <div className="flex justify-center">
            <span className="text-xs text-gray-400 bg-gray-200 px-3 py-1 rounded">
              MOCKUP - Euro NCAP data
            </span>
          </div>

          {/* Footer note */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">Om säkerhetsdata</p>
                <p className="text-xs text-blue-700">
                  Euro NCAP-betyg och säkerhetspoäng baseras på mockup-data då denna information inte är tillgänglig via Car.info API. 
                  För verkliga säkerhetsbetyg krävs integration med Euro NCAP:s databas och fordonssäkerhetsmyndigheter.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 