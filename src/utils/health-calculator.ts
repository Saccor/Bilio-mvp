// 🎯 MÅL: Implementera ett "Bilhälsoindex" (0–100) baserat på flera kategorier:
// ✅ Teknisk status (baserat på demo-API:n)
// ✅ Säkerhetsutrustning (från demo-API:n)
// 🔒 Mockad data för ägarhistorik, prisanalys, servicehistorik – markerad som /** MOCK DATA */
// 📦 Denna fil exporterar en funktion `calculateHealthScore(vehicleData)` som returnerar ett poängresultat + breakdown

import type { CarInfoApiResponse } from '@/types/vehicle';

export interface HealthScoreResult {
  healthIndex: number; // 0-100
  breakdown: {
    tech: number;
    safety: number;
    ownership: number;
    price: number;
    service: number;
  };
  maxScores: {
    tech: number;
    safety: number;
    ownership: number;
    price: number;
    service: number;
  };
}

export function calculateHealthScore(vehicleData: CarInfoApiResponse): HealthScoreResult {
  const result = vehicleData.result;
  const attributes = result?.attributes || [];

  // Safety check for required data
  if (!result) {
    return {
      healthIndex: 0,
      breakdown: { tech: 0, safety: 0, ownership: 0, price: 0, service: 0 },
      maxScores: { tech: 70, safety: 40, ownership: 50, price: 40, service: 30 }
    };
  }

  // ---------- 1. Teknisk status (max 70p) ----------
  const yearScore = (() => {
    const currentYear = new Date().getFullYear();
    const modelYear = result.model_year || currentYear - 10; // Default to 10 years old if missing
    const age = currentYear - modelYear;
    if (age <= 5) return 20;
    if (age <= 10) return 10;
    return 0;
  })();

  const bodyTypeScore = result.chassis === "Cabriolet" || result.chassis === "SUV" ? 10 : 5;

  const engineScore = result.engine_type?.includes("Hybrid") ? 20 : 10;

  const coolantTypes = attributes.filter(attr =>
    attr.name?.toLowerCase().includes("engine coolant")
  );
  const coolantScore = coolantTypes.length >= 5 ? 10 : 5;

  const hasPlatform = attributes.some(attr => attr.name?.includes("Platform"));
  const hasABS = attributes.some(attr => attr.name === "Anti-lock Braking System (ABS)");
  const hasRollBars = attributes.some(attr => attr.name?.includes("Anti-roll Bar"));
  const componentScore = [hasPlatform, hasABS, hasRollBars].filter(Boolean).length >= 2 ? 10 : 5;

  const techTotal = yearScore + bodyTypeScore + engineScore + coolantScore + componentScore;

  // ---------- 2. Säkerhet (max 40p) ----------
  const hasBLIS = attributes.some(attr => attr.name === "Blind Spot Detection (BLIS)");
  const airbagTypes = ["Frontal Airbag", "Side Head Airbag", "Curtain Airbag", "Knee Airbag"];
  const airbagCount = airbagTypes.filter(type =>
    attributes.find(attr => attr.name === type)
  ).length;

  const euroNcapScore = 15; /** MOCK DATA */
  const airbagScore = airbagCount === 4 ? 10 : airbagCount >= 2 ? 5 : 0;
  const safetyFeatureScore = [hasABS, hasBLIS].filter(Boolean).length >= 2 ? 10 : 5;

  const safetyTotal = euroNcapScore + airbagScore + safetyFeatureScore;

  // ---------- 3. Ägarhistorik (max 50p) ----------
  const ownershipScore = 15;         /** MOCK DATA: Antal ägare = 2 */
  const ownerTypeScore = 5;          /** MOCK DATA: Företagsägare */
  const ownershipDateScore = 10;     /** MOCK DATA: Ägarbyte inom 2 år */
  const warrantyScore = 15;          /** MOCK DATA: Giltig garanti */

  const ownerTotal = ownershipScore + ownerTypeScore + ownershipDateScore + warrantyScore;

  // ---------- 4. Prisanalys (max 40p) ----------
  const priceDeviationScore = 20;    /** MOCK DATA: ±5% från marknad */
  const depreciationScore = 10;      /** MOCK DATA: Stabil prognos */
  const priceHistoryScore = 10;      /** MOCK DATA: Inga drastiska prissänkningar */

  const priceTotal = priceDeviationScore + depreciationScore + priceHistoryScore;

  // ---------- 5. Skade/Servicehistorik (max 30p) ----------
  const serviceCountScore = 10;      /** MOCK DATA: 2 st servicetillfällen */
  const damageScore = 10;            /** MOCK DATA: Mindre frontskada, åtgärdad */
  const recallScore = 5;             /** MOCK DATA: Återkallelse hanterad */

  const serviceTotal = serviceCountScore + damageScore + recallScore;

  // ---------- Sammanställning ----------
  const maxScores = {
    tech: 70,
    safety: 40,
    ownership: 50,
    price: 40,
    service: 30
  };

  const total = techTotal + safetyTotal + ownerTotal + priceTotal + serviceTotal;
  const max = maxScores.tech + maxScores.safety + maxScores.ownership + maxScores.price + maxScores.service;

  const healthIndex = Math.round((total / max) * 100);

  return {
    healthIndex, // exempel: 83
    breakdown: {
      tech: techTotal,
      safety: safetyTotal,
      ownership: ownerTotal,
      price: priceTotal,
      service: serviceTotal,
    },
    maxScores
  };
}

// Helper function to get health status text and color based on score
export function getHealthStatus(healthIndex: number): { 
  status: string; 
  description: string; 
  colorClass: string; 
} {
  if (healthIndex >= 90) {
    return {
      status: "Utmärkt skick",
      description: "Fordonet är i exceptionellt bra skick",
      colorClass: "text-green-600"
    };
  } else if (healthIndex >= 75) {
    return {
      status: "Mycket bra skick",
      description: "Fordonet är välskött och i bra kondition",
      colorClass: "text-green-500"
    };
  } else if (healthIndex >= 60) {
    return {
      status: "Bra skick",
      description: "Fordonet är i acceptabelt skick med mindre brister",
      colorClass: "text-yellow-500"
    };
  } else if (healthIndex >= 40) {
    return {
      status: "Godkänt skick",
      description: "Fordonet har flera brister som bör åtgärdas",
      colorClass: "text-orange-500"
    };
  } else {
    return {
      status: "Dåligt skick",
      description: "Fordonet kräver omfattande åtgärder",
      colorClass: "text-red-500"
    };
  }
} 