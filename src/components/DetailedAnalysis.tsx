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
    { id: 'overview', label: 'Översikt', shortLabel: 'Över', icon: '📊' },
    { id: 'technical', label: 'Teknisk data', shortLabel: 'Tek', icon: '⚙️' },
    { id: 'financial', label: 'Ekonomi', shortLabel: 'Eko', icon: '💰' },
    { id: 'history', label: 'Historik', shortLabel: 'Hist', icon: '📋' },
    { id: 'future', label: 'Framtid', shortLabel: 'Fram', icon: '🔮' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      {/* Header */}
      <div className="border-b px-4 sm:px-6 py-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
          Detaljerad analys: {vehicle.brand} {vehicle.model}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Fordon {index + 1} • Komplett fordonsrapport
        </p>
      </div>

      {/* Responsive Tabs */}
      <div className="border-b bg-gray-50">
        {/* Mobile: Horizontal Scroll */}
        <div className="sm:hidden">
          <nav className="flex overflow-x-auto scrollbar-hide px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 py-3 px-4 mr-2 last:mr-0 border-b-2 font-medium text-sm transition-colors rounded-t-lg ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="block text-lg mb-1">{tab.icon}</span>
                <span className="block text-xs whitespace-nowrap">{tab.shortLabel}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Desktop: Standard Layout */}
        <div className="hidden sm:block">
          <nav className="flex px-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 lg:px-4 mr-6 lg:mr-8 border-b-2 font-medium text-sm lg:text-base transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                <span className="hidden md:inline">{tab.label}</span>
                <span className="md:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-6">
        {activeTab === 'overview' && <OverviewTab vehicle={vehicle} />}
        {activeTab === 'technical' && <TechnicalTab vehicle={vehicle} />}
        {activeTab === 'financial' && <FinancialTab vehicle={vehicle} />}
        {activeTab === 'history' && <HistoryTab vehicle={vehicle} />}
        {activeTab === 'future' && <FutureTab vehicle={vehicle} />}
      </div>
    </div>
  );
} 