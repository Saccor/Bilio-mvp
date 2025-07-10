interface StatusBadgeProps {
  label: string;
  type: 'success' | 'warning' | 'danger';
}

export default function StatusBadge({ label, type }: StatusBadgeProps) {
  const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
  const typeClasses = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800"
  };

  return (
    <span className={`${baseClasses} ${typeClasses[type]}`}>
      {label}
    </span>
  );
} 