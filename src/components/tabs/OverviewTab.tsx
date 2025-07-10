import type { Vehicle } from '@/types/vehicle';
import InfoSection from '@/components/ui/InfoSection';
import InfoRow from '@/components/ui/InfoRow';

interface OverviewTabProps {
  vehicle: Vehicle;
}

export default function OverviewTab({ vehicle }: OverviewTabProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <InfoSection title="Grundinformation">
          <InfoRow label="Märke & Modell" value={`${vehicle.brand} ${vehicle.model}`} />
          <InfoRow label="Variant" value={vehicle.variant} />
          <InfoRow label="Första registrering" value={vehicle.firstRegistration} />
          <InfoRow label="Färg" value={vehicle.color} />
          <InfoRow label="Senaste besiktning" value={vehicle.lastInspection} />
          <InfoRow label="Bilhandlare" value={vehicle.dealerName} />
        </InfoSection>

        <InfoSection title="Motor & Prestanda">
          <InfoRow label="Bränsletyp" value={vehicle.fuel} />
          <InfoRow label="Motoreffekt" value={vehicle.enginePower ? `${vehicle.enginePower} hk` : undefined} />
          <InfoRow label="Motorvolym" value={vehicle.engineSize ? `${vehicle.engineSize}L` : undefined} />
          <InfoRow label="CO2-utsläpp" value={vehicle.co2Emissions ? `${vehicle.co2Emissions} g/km` : undefined} />
          <InfoRow label="Bränsleförbrukning" value={vehicle.fuelConsumption ? `${vehicle.fuelConsumption}L/100km` : undefined} />
        </InfoSection>
      </div>

      <div className="space-y-6">
        <InfoSection title="Priser & Värdering">
          <InfoRow label="Utropspris" value={vehicle.price ? `${vehicle.price.toLocaleString()} kr` : undefined} />
          <InfoRow label="Marknadsvärde" value={vehicle.marketValue ? `${vehicle.marketValue.toLocaleString()} kr` : undefined} />
          <InfoRow label="Marknadsposition" value={vehicle.priceAnalysis?.marketPosition === 'high' ? 'Hög' : vehicle.priceAnalysis?.marketPosition === 'low' ? 'Låg' : 'Genomsnittlig'} />
          <InfoRow label="Säljbarhet" value={vehicle.priceAnalysis?.sellability === 'easy' ? 'Lätt att sälja' : vehicle.priceAnalysis?.sellability === 'difficult' ? 'Svårsåld' : 'Måttlig'} />
        </InfoSection>

        <InfoSection title="Utrustning">
          {vehicle.equipmentPackages && vehicle.equipmentPackages.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {vehicle.equipmentPackages.map((pkg, i) => (
                <span key={i} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {pkg}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Ingen utrustningsinformation tillgänglig</p>
          )}
        </InfoSection>
      </div>
    </div>
  );
} 