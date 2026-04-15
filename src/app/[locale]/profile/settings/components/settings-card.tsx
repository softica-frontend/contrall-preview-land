import type { ReactNode } from "react";

interface SettingsCardProps {
  children: ReactNode;
  className?: string;
}

export function SettingsCard({ children, className }: SettingsCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border-light bg-surface px-4 pt-4 lg:px-6 lg:pt-6 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
