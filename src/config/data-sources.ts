export const DATA_SOURCES = {
  // What we can get from Car.info API
  CAR_INFO_API: [
    'brand',
    'model', 
    'variant',
    'year',
    'firstRegistration',
    'color',
    'enginePower',
    'fuel',
    'engineSize',
    'co2Emissions',
    'fuelConsumption',
    'transmission',
    'dimensions',
    'technicalSpecs',
    'safetyFeatures',
    'equipmentPackages',
    'euroNcap'
  ],
  
  // What we need from other APIs (future implementation)
  PRICING_API: [
    'price',
    'marketValue',
    'priceAnalysis',
    'futureValue'
  ],
  
  HISTORY_API: [
    'mileage',
    'history', // taxi, rental, imported, stolen
    'damageHistory',
    'lastInspection'
  ],
  
  DEALER_API: [
    'dealerName',
    'dealerInfo'
  ],
  
  COSTS_API: [
    'operatingCosts',
    'annualTax',
    'insuranceGroup'
  ],
  
  // Currently using mock data
  MOCK_DATA: [
    'price',
    'marketValue', 
    'dealerName',
    'mileage',
    'history',
    'priceAnalysis',
    'operatingCosts',
    'futureValue',
    'knownIssues'
  ]
} as const;

export const API_CONFIG = {
  CAR_INFO: {
    baseUrl: 'https://api.car.info/v2/app/demo',
    enabled: true
  },
  PRICING: {
    baseUrl: 'https://api.pricing-service.com', // Future
    enabled: false
  },
  HISTORY: {
    baseUrl: 'https://api.vehicle-history.com', // Future  
    enabled: false
  },
  DEALER: {
    baseUrl: 'https://api.dealer-info.com', // Future
    enabled: false
  }
} as const; 