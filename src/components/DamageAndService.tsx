import { useState } from 'react';
import type { CarInfoApiResponse } from '@/types/vehicle';
import { AlertTriangle, FileText, Clock } from 'lucide-react';

interface DamageAndServiceProps {
  vehicleData: CarInfoApiResponse;
  registrationNumber?: string;
  isComparison?: boolean;
}

export default function DamageAndService({ 
  vehicleData, 
  registrationNumber, 
  isComparison = false 
}: DamageAndServiceProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  // Mock data since Car.info API doesn't provide service/damage history
  const knownProblems = {
    mileage: '2100',
    problems: [] // No known problems
  };

  const serviceHistory = [
    { date: '2022-01-10', isMock: true },
    { date: '2023-05-12', isMock: true }
  ];

  const vehicleHistory = [
    { 
      date: '2024-11-22', 
      event: 'Besiktigad 2024-11-22 - Godkänd kontrollbesiktning vid 21 000 mil',
      isMock: true 
    },
    { 
      date: '2023-06-15', 
      event: 'Ägarbyte 2023-06-15 - Ny ägare registrerad',
      isMock: true 
    },
    { 
      date: '2023-03-10', 
      event: 'Skada bagagelucka 2023-03-10 - Mindre skada reparerad efter parkering',
      isMock: true 
    },
    { 
      date: '2022-11-30', 
      event: 'Ägarbyte 2022-11-30 - Ny ägare registrerad',
      isMock: true 
    },
    { 
      date: '2022-04-15', 
      event: 'Registrerad 2022-04-15 - Registrerad för trafik i Sverige',
      isMock: true 
    },
    { 
      date: '2022-04-15', 
      event: 'Trafikstatus 2022-04-15 - Påställd och får användas i trafik',
      isMock: true 
    },
    { 
      date: '2022-04-10', 
      event: 'Besiktigad 2022-04-10 - Typgodkännande av EEG-intyg',
      isMock: true 
    },
    { 
      date: '2022-04-05', 
      event: 'Förregistrerad 2022-04-05 - Förregistrerad och tilldelad registreringsnummer',
      isMock: true 
    },
    { 
      date: 'April 2022', 
      event: 'Tillverkad April 2022 - Bilen tillverkad',
      isMock: true 
    }
  ];

  const sections = [
    {
      id: 'known-problems',
      title: 'Kända problem',
      icon: <AlertTriangle className="w-5 h-5 text-gray-600" />
    },
    {
      id: 'service-book',
      title: 'Servicebok',
      icon: <FileText className="w-5 h-5 text-gray-600" />
    },
    {
      id: 'history',
      title: 'Historik',
      icon: <Clock className="w-5 h-5 text-gray-600" />
    }
  ];

  const renderExpandedContent = (sectionId: string) => {
    switch (sectionId) {
             case 'known-problems':
         return (
           <div className="px-6 py-4 space-y-3 border-t border-gray-200">
             <p className="text-sm text-gray-600 italic mb-3">
               Kända problem vid bilens aktuella mätarställning ({knownProblems.mileage})
             </p>
             <div className="bg-gray-100 rounded-lg p-4 text-center">
               <p className="text-sm text-gray-500 italic">Inga objekt tillgängliga</p>
             </div>
           </div>
         );
       
       case 'service-book':
         return (
           <div className="px-6 py-4 space-y-3 border-t border-gray-200">
             {serviceHistory.map((service, index) => (
               <div key={index} className="bg-gray-100 rounded-lg p-4 flex items-center">
                 <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                 <span className="text-sm font-medium text-gray-900">{service.date}</span>
                 {service.isMock && (
                   <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded ml-auto">
                     MOCKUP
                   </span>
                 )}
               </div>
             ))}
           </div>
         );
       
       case 'history':
         return (
           <div className="px-6 py-4 space-y-3 border-t border-gray-200">
             {vehicleHistory.map((item, index) => (
               <div key={index} className="bg-gray-100 rounded-lg p-4 flex items-start">
                 <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                 <div className="flex-1">
                   <span className="text-sm text-gray-900">{item.event}</span>
                   {item.isMock && (
                     <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded ml-2">
                       MOCKUP
                     </span>
                   )}
                 </div>
               </div>
             ))}
           </div>
         );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <h2 className="text-xl font-bold text-center text-gray-900 mb-6">
        Skador & Service
      </h2>
      
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="border border-gray-200 rounded-lg">
            {/* Section Header */}
                         <button
               onClick={() => toggleSection(section.id)}
               className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors rounded-lg"
             >
               <div className="flex items-center">
                 {section.icon && (
                   <div className="mr-3">
                     {section.icon}
                   </div>
                 )}
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
            {expandedSection === section.id && renderExpandedContent(section.id)}
          </div>
        ))}
      </div>
    </div>
  );
} 