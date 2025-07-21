interface HealthMeterProps {
  registrationNumber?: string;
  healthScore?: number;
  healthStatus?: string;
  isComparison?: boolean;
}

export default function HealthMeter({ 
  registrationNumber, 
  healthScore = 85, 
  healthStatus = "Bra hälsotillstånd",
  isComparison = false 
}: HealthMeterProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center mb-4">
        <svg className="w-6 h-6 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
        <h2 className="text-lg font-semibold text-gray-900">
          Bilhälsometer{registrationNumber && ` - ${registrationNumber}`}
        </h2>
      </div>
      <p className="text-sm text-gray-600 mb-4">Detaljerad hälsoanalys</p>
      
      <div className="bg-gray-100 rounded-lg p-4 text-center">
        <div className={`text-3xl font-bold mb-2 ${getScoreColor(healthScore)}`}>
          {healthScore}/100
        </div>
        <p className="text-sm text-gray-600">{healthStatus}</p>
      </div>
    </div>
  );
} 