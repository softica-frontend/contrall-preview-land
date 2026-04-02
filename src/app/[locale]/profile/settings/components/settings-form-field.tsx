import type { ReactNode } from "react";

interface SettingsFormFieldProps {
  label: string;
  children: ReactNode;
  rightContent?: ReactNode;
}

export function SettingsFormField({
  label,
  children,
  rightContent,
}: SettingsFormFieldProps) {
  return (
    <div className="flex h-12 border-b border-border-light">
      <div className="flex w-[319px] shrink-0 items-center px-2">
        <span className="font-roboto text-[16px] leading-[1.4] text-text-body">
          {label}
        </span>
      </div>
      <div className="flex flex-1 items-center justify-between gap-2.5 px-2">
        {children}
        {rightContent}
      </div>
    </div>
  );
}
