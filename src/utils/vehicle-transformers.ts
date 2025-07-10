import type { CarInfoApiResponse, Vehicle, CarInfoAttribute } from '@/types/vehicle';

/**
 * Safely parse integer values
 */
export function safeParseInt(value: unknown): number | undefined {
  if (typeof value === 'number') return Math.round(value);
  if (typeof value === 'string') {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
}

/**
 * Safely parse float values
 */
export function safeParseFloat(value: unknown): number | undefined {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
}

/**
 * Find attribute by ID or name (case insensitive)
 */
export function findAttribute(attributes: CarInfoAttribute[] = [], searchTerms: string[]): unknown {
  const attribute = attributes.find(attr => {
    if (!attr.name) return false;
    return searchTerms.some(term => 
      attr.name!.toLowerCase().includes(term.toLowerCase()) ||
      (attr.id && attr.id.toString() === term)
    );
  });
  
  return attribute?.values?.[0] ?? attribute?.value;
}

/**
 * Extract technical dimensions from Car.info API
 */
export function extractDimensions(attributes: CarInfoAttribute[]) {
  return {
    length: safeParseInt(findAttribute(attributes, ['Length', 'längd'])),
    width: safeParseInt(findAttribute(attributes, ['Width', 'bredd', '2489'])),
    height: safeParseInt(findAttribute(attributes, ['Height', 'höjd'])),
    wheelbase: safeParseInt(findAttribute(attributes, ['Wheel Base', 'axelavstånd', '97'])),
    trackWidthFront: safeParseInt(findAttribute(attributes, ['Track Width Front', 'spårvidd fram'])),
    trackWidthRear: safeParseInt(findAttribute(attributes, ['Track Width Rear', 'spårvidd bak'])),
    groundClearance: safeParseInt(findAttribute(attributes, ['Ground Clearance', 'markfrigång'])),
    dragCoefficient: safeParseFloat(findAttribute(attributes, ['Drag Coefficient', 'luftmotstånd', '268'])),
    maxLoad: safeParseInt(findAttribute(attributes, ['Max Load', 'max last'])),
    maxTrailer: safeParseInt(findAttribute(attributes, ['Max Trailer', 'max släp'])),
    tankVolume: safeParseInt(findAttribute(attributes, ['Tank Volume', 'tankvolym'])),
    totalWeight: safeParseInt(findAttribute(attributes, ['Total Weight', 'totalvikt']))
  };
}

/**
 * Extract Euro NCAP safety rating
 */
export function extractEuroNcap(attributes: CarInfoAttribute[], modelYear?: number) {
  const overallScore = safeParseInt(findAttribute(attributes, ['Overall Score', '1930']));
  const adultOccupant = safeParseInt(findAttribute(attributes, ['Adult Occupant', '786']));
  const childOccupant = safeParseInt(findAttribute(attributes, ['Child Occupant', '787']));
  const safetyAssist = safeParseInt(findAttribute(attributes, ['Safety Assist', '785']));
  const pedestrian = safeParseInt(findAttribute(attributes, ['Vulnerable Road Users', '788']));
  
  // Convert percentage scores to star rating (rough approximation)
  let starRating = 0;
  if (overallScore && overallScore >= 85) starRating = 5;
  else if (overallScore && overallScore >= 70) starRating = 4;
  else if (overallScore && overallScore >= 55) starRating = 3;
  else if (overallScore && overallScore >= 40) starRating = 2;
  else if (overallScore && overallScore > 0) starRating = 1;

  return {
    rating: starRating || undefined,
    year: modelYear,
    scores: {
      overall: overallScore,
      adultOccupant,
      childOccupant,
      safetyAssist,
      pedestrian
    }
  };
}

/**
 * Extract equipment and features using specific API attribute IDs
 */
export function extractEquipment(attributes: CarInfoAttribute[]): string[] {
  const equipment: string[] = [];
  
  // Map equipment to their specific API attribute IDs and search terms
  const equipmentMap = [
    { name: 'Värme i säten', searchTerms: ['Heated Seats', '949'], id: '949' },
    { name: 'GPS Navigation', searchTerms: ['GPS: Navigation', 'GPS', '5360'], id: '5360' },
    { name: 'Bluetooth', searchTerms: ['Bluetooth: Phone', 'Bluetooth', '469'], id: '469' },
    { name: 'Farthållare', searchTerms: ['Cruise Control', '915'], id: '915' },
    { name: 'Parkeringssensorer', searchTerms: ['Parking Sensors', '368'], id: '368' },
    { name: 'Soltak', searchTerms: ['Sunroof', '403'], id: '403' },
    { name: 'Klimatkontroll', searchTerms: ['Air Condition', '911'], id: '911' },
    { name: 'Kamera', searchTerms: ['Cameras', '1123'], id: '1123' },
    { name: 'LED-ljus', searchTerms: ['LED'], id: null },
    { name: 'Xenon-ljus', searchTerms: ['Xenon'], id: null },
    { name: 'Apple CarPlay', searchTerms: ['Apple CarPlay', '524'], id: '524' },
    { name: 'Android Auto', searchTerms: ['Android Auto', '525'], id: '525' },
    { name: 'Adaptiv farthållare', searchTerms: ['Adaptive Cruise Control', '916'], id: '916' },
    { name: 'Parkeringsassistent', searchTerms: ['Parking Assist', '379'], id: '379' },
    { name: 'Backkamera', searchTerms: ['360° Camera', '2120'], id: '2120' }
  ];
  
  equipmentMap.forEach(item => {
    const found = findAttribute(attributes, item.searchTerms);
    if (found === 'yes' || found === true || found === 'optional') {
      equipment.push(item.name);
    }
  });
  
  return equipment;
}

/**
 * Extract color information from API
 */
export function extractColor(attributes: CarInfoAttribute[]): string | undefined {
  // Map of color attribute IDs to their corresponding color names
  const colorIdMap: Record<string, string> = {
    '122': 'Orange',
    '123': 'Röd',
    '124': 'Blå', 
    '125': 'Grön',
    '126': 'Gul',
    '127': 'Vit',
    '128': 'Svart',
    '129': 'Grå',
    '130': 'Silver',
    '131': 'Brun',
    'g13': 'Flerfärgad' // Color group
  };
  
  // First, check if any specific color ID returns 'yes' or true
  for (const [id, colorName] of Object.entries(colorIdMap)) {
    const colorAvailable = findAttribute(attributes, [id]);
    if (colorAvailable === 'yes' || colorAvailable === true || colorAvailable === 'optional') {
      return colorName;
    }
  }
  
  // Fallback: look for generic color attributes that might contain the actual color name
  const colorSearchTerms = ['Colour', 'Color', 'Färg'];
  const colorValue = findAttribute(attributes, colorSearchTerms);
  
  // If we found a color value that's not just a boolean, return it
  if (typeof colorValue === 'string' && colorValue !== 'yes' && colorValue !== 'no' && colorValue !== 'optional') {
    return colorValue;
  }
  
  return undefined;
}

/**
 * Extract CO2 emissions from API
 */
export function extractCO2Emissions(attributes: CarInfoAttribute[]): number | undefined {
  // Look for CO2 emissions with specific ID 4132
  const co2Value = findAttribute(attributes, ['CO₂', 'CO2', '4132']);
  return safeParseInt(co2Value);
}

/**
 * Extract fuel consumption from WLTP data
 */
export function extractFuelConsumption(attributes: CarInfoAttribute[]): number | undefined {
  // Look for WLTP fuel consumption data with specific IDs
  const wltpSearchTerms = [
    'g479', 'g480', 'g481', // WLTP profile IDs according to user
    'Fuel Consumption', 'WLTP', 'City', 'Combined', 'Highway'
  ];
  
  const fuelValue = findAttribute(attributes, wltpSearchTerms);
  return safeParseFloat(fuelValue);
}

/**
 * Extract first registration date
 */
export function extractFirstRegistration(apiData: CarInfoApiResponse['result']): string | undefined {
  // Use existing first_registration_date if available, otherwise construct from model_year
  if (apiData?.first_registration_date) {
    return apiData.first_registration_date;
  }
  
  // If we have a model year, create a reasonable first registration date
  if (apiData?.model_year && apiData.model_year > 0) {
    return `${apiData.model_year}-01-01`;
  }
  
  return undefined;
}

/**
 * Extract engine performance data
 */
export function extractEngineData(apiData: CarInfoApiResponse['result'], attributes: CarInfoAttribute[]) {
  const transmissionRaw = findAttribute(attributes, ['Transmission', 'växellåda']);
  const transmission = typeof transmissionRaw === 'string' ? transmissionRaw : 'Unknown';
  
  return {
    power: apiData?.horsepower || safeParseInt(findAttribute(attributes, ['Power', 'effekt', '151', '152'])),
    displacement: safeParseFloat(findAttribute(attributes, ['Displacement', 'slagvolym', '148', '2232'])),
    cylinders: safeParseInt(findAttribute(attributes, ['Cylinders', 'cylindrar', '158'])),
    fuelType: apiData?.engine_type || apiData?.fuel_type || 'Unknown',
    transmission
  };
}

/**
 * Main transformation function from Car.info API to Vehicle type
 */
export function transformCarInfoToVehicle(apiResponse: CarInfoApiResponse): Partial<Vehicle> {
  const data = apiResponse.result || {};
  const attributes = data.attributes || [];
  
  // Extract all available real data from API
  const dimensions = extractDimensions(attributes);
  const euroNcap = extractEuroNcap(attributes, data.model_year);
  const equipment = extractEquipment(attributes);
  const engine = extractEngineData(data, attributes);
  const color = extractColor(attributes);
  const co2Emissions = extractCO2Emissions(attributes);
  const fuelConsumption = extractFuelConsumption(attributes);
  const firstRegistration = extractFirstRegistration(data);
  
  return {
    // Basic Information - FROM API
    brand: data.brand || 'Unknown',
    model: data.model || 'Unknown',
    variant: `${data.series || ''} ${data.generation || ''}`.trim() || data.trim_package || undefined,
    year: data.model_year || data.year || undefined,
    firstRegistration, // NOW FROM API!
    color, // NOW FROM API!
    
    // Engine & Performance - FROM API
    enginePower: engine.power,
    fuel: engine.fuelType,
    engineSize: engine.displacement,
    transmission: engine.transmission,
    co2Emissions, // NOW FROM API!
    fuelConsumption, // NOW FROM API!
    
    // Technical Specifications - FROM API
    dimensions,
    
    // Safety - FROM API
    euroNcap,
    
    // Equipment - FROM API (Enhanced with more specific extraction)
    equipmentPackages: equipment,
    
    // These fields still need other data sources
    // and will be filled by mock data or other APIs
    price: undefined, // Needs pricing API
    marketValue: undefined, // Needs pricing API
    dealerName: undefined, // Needs dealer API
    mileage: undefined, // Needs vehicle history API
    history: undefined, // Needs vehicle history API
    media: undefined, // Needs image API
  };
}

/**
 * Generate mock data for fields not available from APIs
 * Only generates mock data for fields that are truly missing from real APIs
 */
export function generateMockData(vehicleData: Partial<Vehicle>): Pick<Vehicle, 'price' | 'marketValue' | 'dealerName' | 'mileage' | 'history' | 'priceAnalysis' | 'operatingCosts' | 'futureValue' | 'knownIssues'> {
  // Generate reasonable mock data based on vehicle characteristics
  const basePrice = 200000 + (vehicleData.enginePower || 100) * 1000 + 
                   ((vehicleData.year || 2020) - 2015) * 15000;
  
  // Use CO2 emissions for more realistic tax calculation if available
  const co2ForTax = vehicleData.co2Emissions || 150;
  const taxMultiplier = Math.max(1, co2ForTax / 100);
  
  return {
    price: Math.round(basePrice * (0.9 + Math.random() * 0.2)),
    marketValue: Math.round(basePrice * (0.95 + Math.random() * 0.1)),
    dealerName: `${vehicleData.brand || 'Demo'} ${vehicleData.color ? vehicleData.color + ' ' : ''}Malmö`,
    mileage: Math.round(50000 + Math.random() * 100000),
    history: {
      imported: Math.random() > 0.8,
      taxi: Math.random() > 0.9,
      rental: Math.random() > 0.85,
      stolen: false,
      damageHistory: Math.random() > 0.7 ? ['Mindre lackskada (reparerad)'] : []
    },
    priceAnalysis: {
      marketPosition: Math.random() > 0.5 ? 'average' as const : 'low' as const,
      sellability: 'easy' as const,
      depreciation: 10 + Math.random() * 15
    },
    operatingCosts: {
      // More realistic tax calculation based on CO2 emissions
      annualTax: Math.round(2000 + (co2ForTax * taxMultiplier * 25)),
      insuranceGroup: Math.min(25, Math.max(10, Math.round((vehicleData.enginePower || 100) / 10))),
      estimatedMaintenance: 5000 + Math.random() * 5000
    },
    futureValue: {
      oneYear: Math.round(basePrice * 0.85),
      threeYears: Math.round(basePrice * 0.65),
      fiveYears: Math.round(basePrice * 0.45)
    },
    knownIssues: [
      'Allmän service rekommenderas',
      'Kontrollera bromsbelägg vid nästa service'
    ]
  };
} 