import type { Vehicle } from '@/types/vehicle';
import InfoSection from '@/components/ui/InfoSection';
import InfoRow from '@/components/ui/InfoRow';
import StatusCard from '@/components/ui/StatusCard';

interface HistoryTabProps {
  vehicle: Vehicle;
}

export default function HistoryTab({ vehicle }: HistoryTabProps) {
  return (
    <div className="space-y-8">
      <InfoSection title="Fordonshistorik">
        <div className="grid grid-cols-2 gap-4">
          <StatusCard label="Importerad" status={vehicle.history?.imported} />
          <StatusCard label="Taxi" status={vehicle.history?.taxi} />
          <StatusCard label="Hyrbil" status={vehicle.history?.rental} />
          <StatusCard label="Stulen" status={vehicle.history?.stolen} />
        </div>
      </InfoSection>

      <InfoSection title="Säkerhet">
        <InfoRow label="Euro NCAP betyg" value={vehicle.euroNcap?.rating ? `${vehicle.euroNcap.rating}/5 stjärnor` : undefined} />
        <InfoRow label="NCAP testår" value={vehicle.euroNcap?.year?.toString()} />
        <InfoRow label="Senaste besiktning" value={vehicle.lastInspection} />
      </InfoSection>

      {vehicle.history?.damageHistory && vehicle.history.damageHistory.length > 0 && (
        <InfoSection title="Skadehistorik">
          <div className="space-y-2">
            {vehicle.history.damageHistory.map((damage, i) => (
              <div key={i} className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800">
                {damage}
              </div>
            ))}
          </div>
        </InfoSection>
      )}
    </div>
  );
} 