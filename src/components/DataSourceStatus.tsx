import React from 'react';

interface DataSourceStatusProps {
  dataSources: {
    carInfo: boolean;
    pricing: boolean;
    history: boolean;
    dealer: boolean;
  };
}

const DataSourceStatus: React.FC<DataSourceStatusProps> = ({ dataSources }) => {
  const sources = [
    { key: 'carInfo', label: 'Teknisk data', enabled: dataSources.carInfo },
    { key: 'pricing', label: 'Prisanalys', enabled: dataSources.pricing },
    { key: 'history', label: 'Fordonshistorik', enabled: dataSources.history },
    { key: 'dealer', label: 'Återförsäljarinfo', enabled: dataSources.dealer },
  ];

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <h3 className="text-sm font-medium text-blue-900 mb-2">Datakällor</h3>
      <div className="flex flex-wrap gap-2">
        {sources.map((source) => (
          <div
            key={source.key}
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              source.enabled
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full mr-1 ${
                source.enabled ? 'bg-green-400' : 'bg-gray-400'
              }`}
            />
            {source.label}
            {!source.enabled && ' (mock)'}
          </div>
        ))}
      </div>
      <p className="text-xs text-blue-700 mt-2">
        ✓ = Live data, Mock = Demonstrationsdata
      </p>
    </div>
  );
};

export default DataSourceStatus; 