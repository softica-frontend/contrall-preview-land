import type React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function GlassCard({ children, className, style }: CardProps) {
  return (
    <div
      className={`overflow-hidden rounded-[32px] ${className ?? ""}`}
      style={style}
    >
      {children}
    </div>
  );
}

const GRADIENT_CARD_BG =
  "linear-gradient(135deg, #dce3ff 0%, #e8edff 50%, #f0f2ff 100%)";

export function GradientCard({ children, className, style }: CardProps) {
  return (
    <div
      className={`overflow-hidden rounded-[32px] ${className ?? ""}`}
      style={{ background: GRADIENT_CARD_BG, ...style }}
    >
      {children}
    </div>
  );
}
