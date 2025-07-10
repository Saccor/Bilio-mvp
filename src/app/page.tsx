// src/app/page.tsx
"use client";

import { useState } from "react";
import type { Vehicle } from '@/types/vehicle';
import { vehicleService, type VehicleServiceResult } from '@/services/vehicle-service';
import VehicleOverviewCard from '@/components/VehicleOverviewCard';
import DetailedAnalysis from '@/components/DetailedAnalysis';
import ComparisonTable from '@/components/ComparisonTable';
import DataSourceStatus from '@/components/DataSourceStatus';

export default function Home() {
  const [ids, setIds] = useState<string[]>(["VVV999", ""]);
  const [results, setResults] = useState<(Vehicle | null)[]>([null, null]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);
  const [dataSourcesStatus, setDataSourcesStatus] = useState<VehicleServiceResult['dataSources'] | null>(null);

  const handleLookup = async () => {
    setLoading(true);
    setError(null);
    setDataSourcesStatus(null);
    try {
      const serviceResults = await Promise.all(
        ids.map(async (val, index) => {
          if (!val) return null;
          
          // Use the vehicle service instead of direct API calls
          const result = await vehicleService.getVehicleData({
            type: 'license-plate',
            country: 'S',
            id: val
          });
          
          if (!result.success) {
            throw new Error(`Fordon ${index + 1}: ${result.error}`);
          }
          
          return result;
        })
      );
      
      // Extract vehicle data and capture data sources status from first successful result
      const vehicles = serviceResults.map(result => result?.data || null);
      const firstSuccessfulResult = serviceResults.find(result => result?.success);
      
      setResults(vehicles);
      if (firstSuccessfulResult) {
        setDataSourcesStatus(firstSuccessfulResult.dataSources);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Något gick fel');
    } finally {
      setLoading(false);
    }
  };

  const addComparison = () => {
    setIds([...ids, ""]);
    setResults([...results, null]);
  };

  const removeComparison = (index: number) => {
    if (ids.length <= 1) return;
    const newIds = ids.filter((_, i) => i !== index);
    const newResults = results.filter((_, i) => i !== index);
    setIds(newIds);
    setResults(newResults);
    if (selectedVehicle === index) setSelectedVehicle(null);
    else if (selectedVehicle && selectedVehicle > index) setSelectedVehicle(selectedVehicle - 1);
  };

  const clearAll = () => {
    setIds(["", ""]);
    setResults([null, null]);
    setSelectedVehicle(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Fordonsanalys
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jämför fordon, få detaljerade rapporter och ta välgrundade bilköpsbeslut
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Sök fordon (registreringsnummer)
          </h2>
          
          <div className="space-y-4">
            {ids.map((id, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fordon {index + 1}
                  </label>
                                     <input
                     type="text"
                     value={id}
                     onChange={(e) => {
                       const newIds = [...ids];
                       newIds[index] = e.target.value.toUpperCase();
                       setIds(newIds);
                     }}
                     placeholder="ABC123"
                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                   />
                </div>
                {ids.length > 1 && (
                  <button
                    onClick={() => removeComparison(index)}
                    className="mt-6 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Ta bort
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={handleLookup}
              disabled={loading || ids.every(id => !id)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Söker...' : 'Sök fordon'}
            </button>
            
            <button
              onClick={addComparison}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              + Lägg till jämförelse
            </button>
            
            <button
              onClick={clearAll}
              className="px-6 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Rensa alla
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Fel uppstod</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Data Sources Status */}
        {dataSourcesStatus && results.some(r => r !== null) && (
          <DataSourceStatus dataSources={dataSourcesStatus} />
        )}

        {/* Results Grid */}
        {results.some(r => r !== null) && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {results.map((car, index) => 
              car ? (
                <div
                  key={index}
                  onClick={() => setSelectedVehicle(selectedVehicle === index ? null : index)}
                  className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                >
                  <VehicleOverviewCard
                    car={car}
                    index={index}
                    isSelected={selectedVehicle === index}
                  />
                </div>
              ) : null
            )}
          </div>
        )}

        {/* Detailed Analysis */}
        {selectedVehicle !== null && results[selectedVehicle] && (
          <div className="mb-8">
            <DetailedAnalysis
              vehicle={results[selectedVehicle]!}
              index={selectedVehicle}
            />
          </div>
        )}

        {/* Comparison Table */}
        <ComparisonTable vehicles={results} />
      </div>
    </div>
  );
}
