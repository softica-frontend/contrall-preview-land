interface SettingsCardProps {
  children: React.ReactNode;
  className?: string;
}

export function SettingsCard({ children, className }: SettingsCardProps) {
  return (
    <div
      className={`rounded-xl border border-[#E4E7EC] bg-[#FCFCFD] overflow-hidden pt-6 px-6 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
