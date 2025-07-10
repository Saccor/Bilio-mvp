interface StatusCardProps {
  label: string;
  status?: boolean;
}

export default function StatusCard({ label, status }: StatusCardProps) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">{label}</span>
        <div className={`w-3 h-3 rounded-full ${
          status === undefined ? 'bg-gray-300' : 
          status ? 'bg-red-500' : 'bg-green-500'
        }`} />
      </div>
    </div>
  );
} 