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
    <div className="flex flex-col gap-1.5 border-b border-border-light py-3 lg:h-12 lg:flex-row lg:items-center lg:gap-0 lg:py-0">
      <div className="flex shrink-0 items-center lg:w-[319px] lg:px-2">
        <span className="font-roboto text-[16px] leading-[1.4] text-text-body">
          {label}
        </span>
      </div>
      <div className="flex flex-1 items-center gap-2.5 lg:px-2">
        <div className="min-w-0 flex-1">{children}</div>
        {rightContent}
      </div>
    </div>
  );
}
