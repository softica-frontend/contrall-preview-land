interface GlassOverlayProps {
  gradientSvg: string;
  insetShadow?: string;
}

export function GlassOverlay({ gradientSvg, insetShadow }: GlassOverlayProps) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 rounded-[inherit]"
          style={{
            background: "rgba(252,252,253,0.3)",
            mixBlendMode: "screen",
          }}
        />
        <div
          className="absolute inset-0 rounded-[inherit] mix-blend-screen"
          style={{ backgroundImage: gradientSvg, backgroundSize: "100% 100%" }}
        />
      </div>
      {insetShadow && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ boxShadow: insetShadow }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
