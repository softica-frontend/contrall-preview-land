import type { ReactNode } from "react";

interface SettingsCardProps {
  children: ReactNode;
  className?: string;
}

export function SettingsCard({ children, className }: SettingsCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border-light bg-surface px-6 pt-6 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
