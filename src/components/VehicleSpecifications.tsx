import { useState } from 'react';
import type { CarInfoApiResponse } from '@/types/vehicle';
import { Key, Settings, Zap, Info, Cog } from 'lucide-react';

interface VehicleSpecificationsProps {
  vehicleData: CarInfoApiResponse;
  registrationNumber?: string;
  isComparison?: boolean;
}

export default function VehicleSpecifications({ 
  vehicleData, 
  registrationNumber, 
  isComparison = false 
}: VehicleSpecificationsProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  // Extract real data from API
  const brand = vehicleData.result?.brand || '';
  const model = vehicleData.result?.model || '';
  const variant = vehicleData.result?.series || vehicleData.result?.trim_package || '';
  const year = vehicleData.result?.model_year || vehicleData.result?.year || 0;
  const fuelType = vehicleData.result?.fuel_type || '';
  const horsepower = vehicleData.result?.horsepower || 0;
  const firstRegistration = vehicleData.result?.first_registration_date || '';

  // Mock data for fields not available from Car.info API
  const mockData = {
    mileage: '2100 mil',
    co2Emissions: '119 g/km',
    fuelConsumption: '0.6 l/mil',
    color: 'Silver',
    inspection: '2025-04-15',
    vehicleId: 'XYZ123'
  };

  const specifications = [
    {
      id: 'key-facts',
      title: 'Nyckelfakta',
      icon: <Key className="w-5 h-5 text-gray-600" />,
      items: [
        { label: 'Bränsletyp', value: fuelType || 'Bensin', isMock: !fuelType },
        { label: 'Årsmodell', value: year.toString(), isMock: !year },
        { label: 'Mätarställning', value: mockData.mileage, isMock: true },
        { label: 'Effekt', value: horsepower ? `${horsepower} hk` : '180 hk', isMock: !horsepower },
        { label: 'CO₂-utsläpp', value: mockData.co2Emissions, isMock: true },
        { label: 'Förbrukning', value: mockData.fuelConsumption, isMock: true }
      ]
    },
    {
      id: 'equipment',
      title: 'Utrustning',
      icon: <Settings className="w-5 h-5 text-gray-600" />,
      items: [
        { label: 'Klimatanläggning', value: 'Automatisk klimatanläggning', isMock: true },
        { label: 'Navigeringssystem', value: 'GPS med färgdisplay', isMock: true },
        { label: 'Säkerhet', value: 'ABS, ESP, Airbags', isMock: true },
        { label: 'Komfort', value: 'Elmanövrerade fönster', isMock: true },
        { label: 'Belysning', value: 'LED-strålkastare', isMock: true },
        { label: 'Audio', value: 'Stereoanläggning med Bluetooth', isMock: true },
        { label: 'Interiör', value: 'Läderklädsel', isMock: true },
        { label: 'Hjul', value: 'Lättmetallfälgar 17"', isMock: true }
      ]
    },
    {
      id: 'engine-performance',
      title: 'Motor & prestanda',
      icon: <Zap className="w-5 h-5 text-gray-600" />,
      items: [
        { label: 'Maxeffekt', value: horsepower ? `${horsepower} hk` : '180 hk', isMock: !horsepower },
        { label: 'Vridmoment', value: '350 Nm', isMock: true },
        { label: 'Motorvolym', value: '1969 cm³', isMock: true },
        { label: 'Cylindrar', value: '4', isMock: true },
        { label: 'Förbrukning blandad', value: '0.6', isMock: true },
        { label: 'Förbrukning stad', value: '0.7', isMock: true },
        { label: 'Förbrukning landsväg', value: '0.5', isMock: true }
      ]
    },
    {
      id: 'basic-info',
      title: 'Grundläggande information',
      icon: <Info className="w-5 h-5 text-gray-600" />,
      items: [
        { label: 'Märke', value: brand || 'Volvo', isMock: !brand },
        { label: 'Modell', value: model || 'V60', isMock: !model },
        { label: 'Variant', value: variant || 'Momentum', isMock: !variant },
        { label: 'Första registrering', value: firstRegistration || '2022-04-15', isMock: !firstRegistration },
        { label: 'Färg', value: mockData.color, isMock: true },
        { label: 'Besiktning', value: mockData.inspection, isMock: true },
        { label: 'Fordon-ID', value: mockData.vehicleId, isMock: true }
      ]
    },
    {
      id: 'technical-specs',
      title: 'Tekniska specifikationer',
      icon: <Cog className="w-5 h-5 text-gray-600" />,
      items: [
        { label: 'Längd', value: '4761 mm', isMock: true },
        { label: 'Bredd', value: '1850 mm', isMock: true },
        { label: 'Höjd', value: '1432 mm', isMock: true },
        { label: 'Axelavstånd', value: '2872 mm', isMock: true },
        { label: 'Spårvidd fram', value: '1600 mm', isMock: true },
        { label: 'Spårvidd bak', value: '1605 mm', isMock: true },
        { label: 'Markfrigång', value: '140 mm', isMock: true },
        { label: 'Luftmotstånd', value: '0.27', isMock: true },
        { label: 'Max lastkapacitet', value: '500 kg', isMock: true },
        { label: 'Max släpvikt', value: '1800 kg', isMock: true },
        { label: 'Tankvolym', value: '60 l', isMock: true },
        { label: 'Totalvikt', value: '2250 kg', isMock: true }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-center text-gray-900 mb-6">
        Specifikationer
      </h2>
      
      <div className="space-y-4">
        {specifications.map((section) => (
          <div key={section.id} className="border border-gray-200 rounded-lg">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {section.icon}
                <span className="font-medium text-gray-900">{section.title}</span>
              </div>
              <svg 
                className={`w-5 h-5 text-gray-400 transform transition-transform ${
                  expandedSection === section.id ? 'rotate-180' : ''
                }`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Expanded Content */}
            {expandedSection === section.id && (
              <div className="px-4 pt-4 pb-4 space-y-3 border-t border-gray-200">
                {section.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                      {item.isMock && (
                        <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded">
                          MOCKUP
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 