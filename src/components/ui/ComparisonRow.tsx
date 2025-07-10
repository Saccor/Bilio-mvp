interface ComparisonRowProps {
  label: string;
  values: string[];
}

export default function ComparisonRow({ label, values }: ComparisonRowProps) {
  return (
    <tr className="border-b">
      <td className="py-2 px-3 text-sm text-gray-600 bg-gray-50">{label}</td>
      {values.map((value, index) => (
        <td key={index} className="py-2 px-3 text-sm text-gray-900">
          {value || 'Ej tillgängligt'}
        </td>
      ))}
    </tr>
  );
} 