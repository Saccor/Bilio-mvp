import type { CarInfoApiResponse, CarInfoAttribute } from '@/types/vehicle';

// CEO's Exact Health Calculation Logic - 11 Categories with Precise Weights
export interface HealthScoreResult {
  healthIndex: number; // 0-100 (weighted total)
  breakdown: {
    scores: {
      priceVsMarket: number;      // 0-100 points
      vehicleStatus: number;      // 0-100 points  
      mileage: number;           // 0-100 points
      numberOfOwners: number;     // 0-100 points
      warranty: number;          // 0-100 points
      depreciation: number;      // 0-100 points
      safety: number;            // 0-100 points
      equipment: number;         // 0-100 points
      serviceHistory: number;    // 0-100 points
      damageHistory: number;     // 0-100 points
      knownProblems: number;     // 0-100 points
    };
    weights: {
      priceVsMarket: number;     // 12%
      vehicleStatus: number;     // 11%
      mileage: number;          // 11%
      numberOfOwners: number;    // 9%
      warranty: number;         // 6%
      depreciation: number;     // 11%
      safety: number;           // 11%
      equipment: number;        // 11%
      serviceHistory: number;   // 7%
      damageHistory: number;    // 7%
      knownProblems: number;    // 4%
    };
    grade: {
      grade: string;
      description: string;
      color: string;
    };
    categories: Array<{
      name: string;
      score: number;
      weight: string;
      weightValue: number;
      contributedPoints: number;
      isMock: boolean;
    }>;
  };
}

export function calculateHealthScore(vehicleData: CarInfoApiResponse): HealthScoreResult {
  const result = vehicleData.result;
  
  if (!result) {
    return getDefaultHealthScore();
  }

  // Calculate all 11 category scores (0-100 points each)
  const scores = {
    priceVsMarket: calculatePriceVsMarket(result),        // 12%
    vehicleStatus: calculateVehicleStatus(result),         // 11%
    mileage: calculateMileageScore(result),                // 11%
    numberOfOwners: calculateOwnerScore(result),           // 9%
    warranty: calculateWarrantyScore(result),              // 6%
    depreciation: calculateDepreciationScore(result),      // 11%
    safety: calculateSafetyScore(result?.attributes || []), // 11%
    equipment: calculateEquipmentScore(result),            // 11%
    serviceHistory: calculateServiceScore(result),         // 7%
    damageHistory: calculateDamageScore(result),           // 7%
    knownProblems: calculateKnownProblemsScore(result)     // 4%
  };

  // Apply exact weights as specified by CEO
  const weights = {
    priceVsMarket: 0.12,
    vehicleStatus: 0.11,
    mileage: 0.11,
    numberOfOwners: 0.09,
    warranty: 0.06,
    depreciation: 0.11,
    safety: 0.11,
    equipment: 0.11,
    serviceHistory: 0.07,
    damageHistory: 0.07,
    knownProblems: 0.04
  };

  // Calculate weighted total (0-100 points)
  const healthIndex = Math.round(
    scores.priceVsMarket * weights.priceVsMarket +
    scores.vehicleStatus * weights.vehicleStatus +
    scores.mileage * weights.mileage +
    scores.numberOfOwners * weights.numberOfOwners +
    scores.warranty * weights.warranty +
    scores.depreciation * weights.depreciation +
    scores.safety * weights.safety +
    scores.equipment * weights.equipment +
    scores.serviceHistory * weights.serviceHistory +
    scores.damageHistory * weights.damageHistory +
    scores.knownProblems * weights.knownProblems
  );

  const categories = [
    { 
      name: 'Pris mot marknaden', 
      score: scores.priceVsMarket, 
      weight: '12%', 
      weightValue: weights.priceVsMarket,
      contributedPoints: Math.round(scores.priceVsMarket * weights.priceVsMarket * 10) / 10,
      isMock: true
    },
    { 
      name: 'Fordonsstatus', 
      score: scores.vehicleStatus, 
      weight: '11%', 
      weightValue: weights.vehicleStatus,
      contributedPoints: Math.round(scores.vehicleStatus * weights.vehicleStatus * 10) / 10,
      isMock: true
    },
    { 
      name: 'Körda mil', 
      score: scores.mileage, 
      weight: '11%', 
      weightValue: weights.mileage,
      contributedPoints: Math.round(scores.mileage * weights.mileage * 10) / 10,
      isMock: false
    },
    { 
      name: 'Antal ägare', 
      score: scores.numberOfOwners, 
      weight: '9%', 
      weightValue: weights.numberOfOwners,
      contributedPoints: Math.round(scores.numberOfOwners * weights.numberOfOwners * 10) / 10,
      isMock: true
    },
    { 
      name: 'Nybilsgaranti', 
      score: scores.warranty, 
      weight: '6%', 
      weightValue: weights.warranty,
      contributedPoints: Math.round(scores.warranty * weights.warranty * 10) / 10,
      isMock: true
    },
    { 
      name: 'Värdetapp (5 år)', 
      score: scores.depreciation, 
      weight: '11%', 
      weightValue: weights.depreciation,
      contributedPoints: Math.round(scores.depreciation * weights.depreciation * 10) / 10,
      isMock: true
    },
    { 
      name: 'Säkerhet (Euro-NCAP)', 
      score: scores.safety, 
      weight: '11%', 
      weightValue: weights.safety,
      contributedPoints: Math.round(scores.safety * weights.safety * 10) / 10,
      isMock: true
    },
    { 
      name: 'Utrustning', 
      score: scores.equipment, 
      weight: '11%', 
      weightValue: weights.equipment,
      contributedPoints: Math.round(scores.equipment * weights.equipment * 10) / 10,
      isMock: true
    },
    { 
      name: 'Servicebok', 
      score: scores.serviceHistory, 
      weight: '7%', 
      weightValue: weights.serviceHistory,
      contributedPoints: Math.round(scores.serviceHistory * weights.serviceHistory * 10) / 10,
      isMock: true
    },
    { 
      name: 'Skadehistorik', 
      score: scores.damageHistory, 
      weight: '7%', 
      weightValue: weights.damageHistory,
      contributedPoints: Math.round(scores.damageHistory * weights.damageHistory * 10) / 10,
      isMock: true
    },
    { 
      name: 'Kända problem', 
      score: scores.knownProblems, 
      weight: '4%', 
      weightValue: weights.knownProblems,
      contributedPoints: Math.round(scores.knownProblems * weights.knownProblems * 10) / 10,
      isMock: true
    }
  ];

  return {
    healthIndex: Math.min(100, Math.max(0, healthIndex)),
    breakdown: {
      scores,
      weights,
      grade: getGradeFromScore(healthIndex),
      categories
    }
  };
}

// 1. Pris mot marknaden (12%) - ≈20% billigare ⇒ 100p, ≈20% dyrare ⇒ 0p
function calculatePriceVsMarket(_result: CarInfoApiResponse['result']): number {
  const askingPrice = 240000; // SEK
  const marketAverage = 259200; // SEK
  
  const priceDifference = (marketAverage - askingPrice) / marketAverage;
  
  if (priceDifference >= 0.20) return 100; // 20% or more cheaper
  if (priceDifference <= -0.20) return 0;  // 20% or more expensive
  
  // Linear between -20% and +20%
  return Math.round(50 + (priceDifference * 250));
}

// 2. Fordonsstatus (11%) - Start 100p, -25p taxi, -25p hyrbil, -20p import, -30p stulen
function calculateVehicleStatus(_result: CarInfoApiResponse['result']): number {
  let score = 100;
  
  // Mock data - would come from real vehicle registry checks
  const isTaxi = false;        // -25p
  const isRental = false;      // -25p
  const isImported = false;    // -20p
  const isStolen = false;      // -30p
  
  if (isTaxi) score -= 25;
  if (isRental) score -= 25;
  if (isImported) score -= 20;
  if (isStolen) score -= 30;
  
  return Math.max(0, score);
}

// 3. Körda mil (11%) - Normal 1500 mil/år, halva ⇒ 100p, dubbla ⇒ 0p
function calculateMileageScore(result: CarInfoApiResponse['result']): number {
  const currentYear = new Date().getFullYear();
  const vehicleYear = result?.model_year || currentYear - 3;
  const vehicleAge = currentYear - vehicleYear;
  
  // Mock mileage - in real implementation, get from API
  const totalMileage = 21000; // mil (210,000 km)
  const normalMileagePerYear = 1500; // mil
  const expectedMileage = vehicleAge * normalMileagePerYear;
  
  if (expectedMileage === 0) return 100;
  
  const mileageRatio = totalMileage / expectedMileage;
  
  if (mileageRatio <= 0.5) return 100; // Half or less = 100p
  if (mileageRatio >= 2.0) return 0;   // Double or more = 0p
  
  // Linear between 0.5x and 2.0x
  return Math.round(100 - ((mileageRatio - 0.5) / 1.5) * 100);
}

// 4. Antal ägare (9%) - ≥6000 mil/ägare ⇒ 100p, ≤1000 mil/ägare ⇒ 0p
function calculateOwnerScore(_result: CarInfoApiResponse['result']): number {
  const totalMileage = 21000; // mil
  const numberOfOwners = 2;   // Mock data
  
  const milesPerOwner = totalMileage / numberOfOwners;
  
  if (milesPerOwner >= 6000) return 100;
  if (milesPerOwner <= 1000) return 0;
  
  // Linear between 1000 and 6000
  return Math.round(((milesPerOwner - 1000) / 5000) * 100);
}

// 5. Nybilsgaranti (6%) - Ja = 100p, Nej = 0p
function calculateWarrantyScore(_result: CarInfoApiResponse['result']): number {
  // Mock data - would check real warranty status
  const hasNewCarWarranty = false; // Most used cars don't have warranty
  return hasNewCarWarranty ? 100 : 0;
}

// 6. Värdetapp 5 år (11%) - 0% tapp ⇒ 100p, 60% tapp ⇒ 0p
function calculateDepreciationScore(_result: CarInfoApiResponse['result']): number {
  // Mock calculation - would use real market data
  const originalPrice = 480000; // SEK when new
  const currentValue = 240000;  // SEK current value
  
  const depreciationRate = (originalPrice - currentValue) / originalPrice;
  
  if (depreciationRate <= 0) return 100; // No depreciation = 100p
  if (depreciationRate >= 0.60) return 0; // 60% or more = 0p
  
  // Linear between 0% and 60%
  return Math.round(100 - (depreciationRate / 0.60) * 100);
}

// 7. Säkerhet Euro-NCAP (11%) - (Antal stjärnor ÷ 5) × 100
function calculateSafetyScore(_attributes: CarInfoAttribute[]): number {
  // Mock Euro NCAP data - would come from safety database
  const euroNcapStars = 5; // out of 5 stars
  return Math.round((euroNcapStars / 5) * 100);
}

// 8. Utrustning (11%) - Varje extra ger 5p, tak vid 20 poster = 100p
function calculateEquipmentScore(_result: CarInfoApiResponse['result']): number {
  // Mock equipment list - would come from detailed vehicle data
  const equipmentItems = [
    'Klimatanläggning', 'Navigering', 'Läderklädsel', 'Xenon-strålkastare',
    'Parkeringssensorer', 'Backkamera', 'Adaptiv farthållare', 'Panoramatak',
    'Uppvärmda säten', 'Elektriska säten', 'Harman Kardon', 'Metallic-lack',
    'Keyless', 'Bluetooth', 'USB-uttag' // 15 items total
  ];
  
  const points = Math.min(equipmentItems.length * 5, 100);
  return points;
}

// 9. Servicebok (7%) - Komplett historik = 100p, saknas = 0p
function calculateServiceScore(_result: CarInfoApiResponse['result']): number {
  // Mock service data - would check real service history
  const hasCompleteServiceHistory = true;
  return hasCompleteServiceHistory ? 100 : 0;
}

// 10. Skadehistorik (7%) - Start 100p, -20p per större skada ner till 0
function calculateDamageScore(_result: CarInfoApiResponse['result']): number {
  let score = 100;
  
  // Mock damage data - would come from insurance/damage reports
  const majorDamages = 1; // Number of major damages
  
  score -= majorDamages * 20;
  return Math.max(0, score);
}

// 11. Kända problem (4%) - -25p för varje typisk "barnsjukdom"
function calculateKnownProblemsScore(_result: CarInfoApiResponse['result']): number {
  let score = 100;
  
  // Mock known problems - would come from reliability database
  const knownIssues = 0; // Number of typical issues for this model/mileage
  
  score -= knownIssues * 25;
  return Math.max(0, score);
}

// Grade interpretation as per CEO specification
function getGradeFromScore(score: number): { grade: string; description: string; color: string } {
  if (score >= 90) return { grade: 'A', description: 'Fynd', color: 'bg-green-500' };
  if (score >= 80) return { grade: 'B', description: 'Bra köp', color: 'bg-green-400' };
  if (score >= 65) return { grade: 'C', description: 'OK', color: 'bg-orange-500' };
  if (score >= 50) return { grade: 'D', description: 'Tveksamt', color: 'bg-orange-400' };
  return { grade: 'E', description: 'Undvik', color: 'bg-red-500' };
}

function getDefaultHealthScore(): HealthScoreResult {
  const defaultScores = {
    priceVsMarket: 50, vehicleStatus: 50, mileage: 50, numberOfOwners: 50,
    warranty: 50, depreciation: 50, safety: 50, equipment: 50,
    serviceHistory: 50, damageHistory: 50, knownProblems: 50
  };
  
  const weights = {
    priceVsMarket: 0.12, vehicleStatus: 0.11, mileage: 0.11, numberOfOwners: 0.09,
    warranty: 0.06, depreciation: 0.11, safety: 0.11, equipment: 0.11,
    serviceHistory: 0.07, damageHistory: 0.07, knownProblems: 0.04
  };

  return {
    healthIndex: 50,
    breakdown: {
      scores: defaultScores,
      weights,
      grade: { grade: 'C', description: 'OK', color: 'bg-orange-500' },
      categories: []
    }
  };
}

// Legacy function for compatibility
export function getHealthStatus(healthIndex: number): { 
  status: string; 
  description: string; 
  colorClass: string; 
} {
  const grade = getGradeFromScore(healthIndex);
  
  const statusMap: Record<string, { status: string; description: string; colorClass: string }> = {
    'A': { status: "Fynd - Svårt att hitta bättre", description: "Fordonet är i exceptionellt bra skick", colorClass: "text-green-600" },
    'B': { status: "Bra köp - Rekommenderas", description: "Fordonet är välskött och i bra kondition", colorClass: "text-green-500" },
    'C': { status: "OK - Kolla vidare", description: "Fordonet är i acceptabelt skick med mindre brister", colorClass: "text-orange-500" },
    'D': { status: "Tveksamt - Risk", description: "Fordonet har flera brister som bör åtgärdas", colorClass: "text-orange-600" },
    'E': { status: "Undvik - Hög risk", description: "Fordonet kräver omfattande åtgärder", colorClass: "text-red-500" }
  };

  return statusMap[grade.grade] || statusMap['C'];
}