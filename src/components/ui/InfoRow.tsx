interface InfoRowProps {
  label: string;
  value?: string;
}

export default function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="text-gray-900">{value || 'Ej tillgängligt'}</span>
    </div>
  );
} 