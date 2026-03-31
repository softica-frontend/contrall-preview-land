import type { ReactNode } from "react";

interface GradientLabelProps {
  children: ReactNode;
  className?: string;
}

export function GradientLabel({ children, className }: GradientLabelProps) {
  return (
    <p
      className={`bg-gradient-to-b from-[#7491ff] via-[#2575ff] to-[#2769e3] bg-clip-text font-bold uppercase leading-[1.1] tracking-[1px] text-transparent${className ? ` ${className}` : ""}`}
    >
      {children}
    </p>
  );
}
