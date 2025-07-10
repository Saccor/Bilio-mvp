interface InfoSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function InfoSection({ title, children }: InfoSectionProps) {
  return (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900">{title}</h4>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
} 