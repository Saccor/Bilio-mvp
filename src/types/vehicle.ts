// Types for Car.info API response
export interface CarInfoAttribute {
  id?: string | number;
  name?: string;
  value?: string | number | boolean;
  values?: (string | number)[];
  attributes?: CarInfoAttribute[];
}

export interface CarInfoApiResponse {
  success?: boolean;
  result?: {
    brand?: string;
    model?: string;
    series?: string;
    generation?: string;
    model_year?: number;
    year?: number;
    fuel_type?: string;
    engine_type?: string;
    engine?: string;
    horsepower?: number;
    car_name?: string;
    chassis?: string;
    trim_package?: string;
    licence_plate?: string;
    vin?: string;
    vehicle_type?: string;
    engine_name?: string;
    first_registration_date?: string;
    attributes?: CarInfoAttribute[];
    images?: { url: string }[];
  };
}

export type Vehicle = {
  // Basic Information
  brand: string;
  model: string;
  variant?: string;
  media?: { url: string }[];
  year?: number;
  firstRegistration?: string;
  color?: string;
  price?: number;
  dealerName?: string;
  marketValue?: number;
  
  // Vehicle Status & History
  history?: { 
    imported?: boolean; 
    taxi?: boolean; 
    rental?: boolean;
    stolen?: boolean;
    damageHistory?: string[];
  };
  
  // Engine & Performance
  mileage?: number;
  fuel?: string;
  fuelConsumption?: number;
  co2Emissions?: number;
  enginePower?: number;
  engineSize?: number;
  transmission?: string;
  
  // Equipment & Features
  equipmentPackages?: string[];
  
  // Technical Specifications
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    wheelbase?: number;
    trackWidthFront?: number;
    trackWidthRear?: number;
    groundClearance?: number;
    dragCoefficient?: number;
    maxLoad?: number;
    maxTrailer?: number;
    tankVolume?: number;
    totalWeight?: number;
  };
  
  // Safety & Inspection
  euroNcap?: {
    rating?: number;
    year?: number;
  };
  lastInspection?: string;
  
  // Financial Analysis
  priceAnalysis?: {
    marketPosition?: 'low' | 'average' | 'high';
    sellability?: 'easy' | 'moderate' | 'difficult';
    depreciation?: number;
  };
  
  // Operating Costs
  operatingCosts?: {
    annualTax?: number;
    insuranceGroup?: number;
    estimatedMaintenance?: number;
  };
  
  // Future Value & Issues
  futureValue?: {
    oneYear?: number;
    threeYears?: number;
    fiveYears?: number;
  };
  knownIssues?: string[];
}; 