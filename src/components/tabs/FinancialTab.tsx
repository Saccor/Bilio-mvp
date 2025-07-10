import type { Vehicle } from '@/types/vehicle';
import InfoSection from '@/components/ui/InfoSection';
import InfoRow from '@/components/ui/InfoRow';

interface FinancialTabProps {
  vehicle: Vehicle;
}

export default function FinancialTab({ vehicle }: FinancialTabProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <InfoSection title="Driftkostnader (årligen)">
        <InfoRow label="Fordonsskatt" value={vehicle.operatingCosts?.annualTax ? `${vehicle.operatingCosts.annualTax} kr` : undefined} />
        <InfoRow label="Försäkringsgrupp" value={vehicle.operatingCosts?.insuranceGroup?.toString()} />
        <InfoRow label="Beräknat underhåll" value={vehicle.operatingCosts?.estimatedMaintenance ? `${vehicle.operatingCosts.estimatedMaintenance} kr` : undefined} />
        <InfoRow label="Bränsleförbrukning" value={vehicle.fuelConsumption ? `${vehicle.fuelConsumption}L/100km` : undefined} />
      </InfoSection>

      <InfoSection title="Prisanalys">
        <InfoRow label="Marknadsposition" value={
          vehicle.priceAnalysis?.marketPosition === 'high' ? '🔴 Över marknadspris' :
          vehicle.priceAnalysis?.marketPosition === 'low' ? '🟢 Under marknadspris' :
          '🟡 Marknadspris'
        } />
        <InfoRow label="Säljbarhet" value={
          vehicle.priceAnalysis?.sellability === 'easy' ? '🟢 Lätt att sälja' :
          vehicle.priceAnalysis?.sellability === 'difficult' ? '🔴 Svårsåld' :
          '🟡 Måttlig säljbarhet'
        } />
        <InfoRow label="Årlig värdeminskning" value={vehicle.priceAnalysis?.depreciation ? `${vehicle.priceAnalysis.depreciation}%` : undefined} />
      </InfoSection>
    </div>
  );
} 