import type { Vehicle } from '@/types/vehicle';
import InfoSection from '@/components/ui/InfoSection';
import InfoRow from '@/components/ui/InfoRow';

interface TechnicalTabProps {
  vehicle: Vehicle;
}

export default function TechnicalTab({ vehicle }: TechnicalTabProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <InfoSection title="Dimensioner">
        <InfoRow label="Längd" value={vehicle.dimensions?.length ? `${vehicle.dimensions.length} mm` : undefined} />
        <InfoRow label="Bredd" value={vehicle.dimensions?.width ? `${vehicle.dimensions.width} mm` : undefined} />
        <InfoRow label="Höjd" value={vehicle.dimensions?.height ? `${vehicle.dimensions.height} mm` : undefined} />
        <InfoRow label="Axelavstånd" value={vehicle.dimensions?.wheelbase ? `${vehicle.dimensions.wheelbase} mm` : undefined} />
        <InfoRow label="Spårvidd fram" value={vehicle.dimensions?.trackWidthFront ? `${vehicle.dimensions.trackWidthFront} mm` : undefined} />
        <InfoRow label="Spårvidd bak" value={vehicle.dimensions?.trackWidthRear ? `${vehicle.dimensions.trackWidthRear} mm` : undefined} />
        <InfoRow label="Markfrigång" value={vehicle.dimensions?.groundClearance ? `${vehicle.dimensions.groundClearance} mm` : undefined} />
      </InfoSection>

      <InfoSection title="Vikter & Kapacitet">
        <InfoRow label="Totalvikt" value={vehicle.dimensions?.totalWeight ? `${vehicle.dimensions.totalWeight} kg` : undefined} />
        <InfoRow label="Max last" value={vehicle.dimensions?.maxLoad ? `${vehicle.dimensions.maxLoad} kg` : undefined} />
        <InfoRow label="Max släpvikt" value={vehicle.dimensions?.maxTrailer ? `${vehicle.dimensions.maxTrailer} kg` : undefined} />
        <InfoRow label="Tankvolym" value={vehicle.dimensions?.tankVolume ? `${vehicle.dimensions.tankVolume} L` : undefined} />
        <InfoRow label="Luftmotstånd" value={vehicle.dimensions?.dragCoefficient ? `${vehicle.dimensions.dragCoefficient} Cd` : undefined} />
      </InfoSection>
    </div>
  );
} 