interface ComparisonRowProps {
  label: string;
  values: string[];
}

export default function ComparisonRow({ label, values }: ComparisonRowProps) {
  return (
    <tr className="border-b border-gray-200">
      <td className="py-3 lg:py-4 px-4 lg:px-6 text-sm lg:text-base text-gray-700 bg-gray-50 font-semibold whitespace-nowrap">
        {label}
      </td>
      {values.map((value, index) => (
        <td key={index} className="py-3 lg:py-4 px-4 lg:px-6 text-sm lg:text-base text-black font-medium whitespace-nowrap">
          {value || <span className="text-gray-500 italic">Ej tillgängligt</span>}
        </td>
      ))}
    </tr>
  );
} 