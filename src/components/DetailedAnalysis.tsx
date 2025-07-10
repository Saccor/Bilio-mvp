"use client";

import { useState } from "react";
import type { Vehicle } from '@/types/vehicle';
import OverviewTab from '@/components/tabs/OverviewTab';
import TechnicalTab from '@/components/tabs/TechnicalTab';
import FinancialTab from '@/components/tabs/FinancialTab';
import HistoryTab from '@/components/tabs/HistoryTab';
import FutureTab from '@/components/tabs/FutureTab';

interface DetailedAnalysisProps {
  vehicle: Vehicle;
  index: number;
}

export default function DetailedAnalysis({ vehicle, index }: DetailedAnalysisProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Översikt', icon: '📊' },
    { id: 'technical', label: 'Teknisk data', icon: '⚙️' },
    { id: 'financial', label: 'Ekonomi', icon: '💰' },
    { id: 'history', label: 'Historik', icon: '📋' },
    { id: 'future', label: 'Framtid', icon: '🔮' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      <div className="border-b px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Detaljerad analys: {vehicle.brand} {vehicle.model}
        </h2>
        <p className="text-gray-600">Fordon {index + 1} • Komplett fordonsrapport</p>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8 px-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'overview' && <OverviewTab vehicle={vehicle} />}
        {activeTab === 'technical' && <TechnicalTab vehicle={vehicle} />}
        {activeTab === 'financial' && <FinancialTab vehicle={vehicle} />}
        {activeTab === 'history' && <HistoryTab vehicle={vehicle} />}
        {activeTab === 'future' && <FutureTab vehicle={vehicle} />}
      </div>
    </div>
  );
} 