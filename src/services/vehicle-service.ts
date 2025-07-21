import type { Vehicle, CarInfoApiResponse } from '@/types/vehicle';
import { transformCarInfoToVehicle, generateMockData } from '@/utils/vehicle-transformers';
import { API_CONFIG } from '@/config/data-sources';

export interface VehicleLookupParams {
  type: 'license-plate' | 'vin';
  country: string;
  id: string;
}

// Future API response types
interface PricingData {
  currentPrice: number;
  marketValue: number;
  analysis: {
    marketPosition: 'low' | 'average' | 'high';
    sellability: 'easy' | 'moderate' | 'difficult';
    depreciation: number;
  };
}

interface HistoryData {
  currentMileage: number;
  vehicleHistory: {
    imported: boolean;
    taxi: boolean;
    rental: boolean;
    stolen: boolean;
    damageHistory: string[];
  };
  lastInspection: string;
}

interface DealerData {
  name: string;
  contact?: string;
  location?: string;
}

export interface VehicleServiceResult {
  success: boolean;
  data?: Vehicle;
  rawApiData?: CarInfoApiResponse; // Raw API response for advanced calculations
  error?: string;
  dataSources: {
    carInfo: boolean;
    pricing: boolean;
    history: boolean;
    dealer: boolean;
  };
}

/**
 * VehicleService handles all vehicle data retrieval and combination.
 * 
 * Note: External API calls are made through Next.js API routes to avoid CORS issues.
 * Direct browser calls to external APIs (like Car.info) will fail due to CORS policy.
 */
class VehicleService {
  /**
   * Main method to get comprehensive vehicle data
   */
  async getVehicleData(params: VehicleLookupParams): Promise<VehicleServiceResult> {
    const dataSources = {
      carInfo: false,
      pricing: false,
      history: false,
      dealer: false
    };

    try {
      // 1. Get data from Car.info API
      const carInfoData = await this.getCarInfoData(params);
      if (!carInfoData) {
        return {
          success: false,
          error: 'Vehicle not found in Car.info database',
          dataSources
        };
      }
      dataSources.carInfo = true;

      // 2. Transform Car.info data to our Vehicle type
      const vehicleData = transformCarInfoToVehicle(carInfoData);

      // 3. Get pricing data (currently mock)
      const pricingData = await this.getPricingData(params);
      dataSources.pricing = !!pricingData;

      // 4. Get vehicle history (currently mock)
      const historyData = await this.getHistoryData(params);
      dataSources.history = !!historyData;

      // 5. Get dealer information (currently mock)
      const dealerData = await this.getDealerData(params);
      dataSources.dealer = !!dealerData;

      // 6. Combine all data sources
      const completeVehicle = this.combineVehicleData(
        vehicleData,
        pricingData,
        historyData,
        dealerData
      );

      return {
        success: true,
        data: completeVehicle,
        rawApiData: carInfoData, // Include raw API response
        dataSources
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        dataSources
      };
    }
  }

  /**
   * Get data from Car.info API via Next.js API route (to avoid CORS issues)
   */
  private async getCarInfoData(params: VehicleLookupParams): Promise<CarInfoApiResponse | null> {
    if (!API_CONFIG.CAR_INFO.enabled) return null;

    try {
      // Use the Next.js API route as a proxy to avoid CORS issues
      const url = `/api/vehicle?type=${params.type}&country=${params.country}&id=${params.id}`;
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Vehicle API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Vehicle API error:', error);
      throw error;
    }
  }

  /**
   * Get pricing data (future implementation)
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async getPricingData(_params: VehicleLookupParams): Promise<PricingData | null> {
    if (!API_CONFIG.PRICING?.enabled) {
      // Return null to indicate this data source is not available
      return null;
    }

    // Future implementation:
    // const response = await fetch(`${API_CONFIG.PRICING.baseUrl}/price/${params.id}`);
    // return await response.json();
    
    return null;
  }

  /**
   * Get vehicle history data (future implementation)
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async getHistoryData(_params: VehicleLookupParams): Promise<HistoryData | null> {
    if (!API_CONFIG.HISTORY?.enabled) {
      return null;
    }

    // Future implementation:
    // const response = await fetch(`${API_CONFIG.HISTORY.baseUrl}/history/${params.id}`);
    // return await response.json();
    
    return null;
  }

  /**
   * Get dealer data (future implementation)
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async getDealerData(_params: VehicleLookupParams): Promise<DealerData | null> {
    if (!API_CONFIG.DEALER?.enabled) {
      return null;
    }

    // Future implementation:
    // const response = await fetch(`${API_CONFIG.DEALER.baseUrl}/dealer/${params.id}`);
    // return await response.json();
    
    return null;
  }

  /**
   * Combine data from different sources into a complete Vehicle object
   */
  private combineVehicleData(
    carInfoData: Partial<Vehicle>,
    pricingData: PricingData | null,
    historyData: HistoryData | null,
    dealerData: DealerData | null
  ): Vehicle {
    // Generate mock data for missing fields
    const mockData = generateMockData(carInfoData);

    // Combine all data sources, with real data taking precedence over mock data
    return {
      ...mockData, // Start with mock data as fallback
      ...carInfoData, // Override with real Car.info data
      
      // Future: Override with real pricing data when available
      ...(pricingData && {
        price: pricingData.currentPrice,
        marketValue: pricingData.marketValue,
        priceAnalysis: pricingData.analysis
      }),
      
      // Future: Override with real history data when available
      ...(historyData && {
        mileage: historyData.currentMileage,
        history: historyData.vehicleHistory,
        lastInspection: historyData.lastInspection
      }),
      
      // Future: Override with real dealer data when available
      ...(dealerData && {
        dealerName: dealerData.name,
        dealerInfo: dealerData
      })
    } as Vehicle;
  }

  /**
   * Get available data sources status
   */
  getDataSourcesStatus() {
    return {
      carInfo: API_CONFIG.CAR_INFO.enabled,
      pricing: API_CONFIG.PRICING?.enabled || false,
      history: API_CONFIG.HISTORY?.enabled || false,
      dealer: API_CONFIG.DEALER?.enabled || false
    };
  }
}

// Export a singleton instance
export const vehicleService = new VehicleService(); 