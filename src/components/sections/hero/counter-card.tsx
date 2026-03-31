import { GLASS_SHADOW } from "@/components/ui/shadows";

/** Counter card — dark gradient background, NO glass overlay bg (it washes out dark colors) */
export function CounterCard({
  text,
  mobile,
}: {
  text: string;
  mobile?: boolean;
}) {
  const r = mobile ? "rounded-[16px]" : "rounded-[32px]";
  return (
    <div className={`relative overflow-hidden ${r} h-full w-full`}>
      {/* Dark gradient background with blue/teal glow at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(circle at 75% 110%, #2575FF 0%, rgba(37,117,255,0.35) 30%, transparent 60%)",
            "radial-gradient(circle at 25% 115%, rgba(0,190,170,0.45) 0%, rgba(0,160,150,0.15) 25%, transparent 50%)",
            "radial-gradient(circle at 50% 100%, rgba(20,60,120,0.5) 0%, transparent 60%)",
            "#0C111D",
          ].join(", "),
        }}
      />
      {/* Inset shadow border only (no glass bg — screen blend ruins dark) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ boxShadow: GLASS_SHADOW }}
        aria-hidden="true"
      />
      <div
        className={`relative z-10 flex h-full flex-col items-center justify-center text-center ${mobile ? "px-[16px]" : "pt-[54px] pb-[24px] px-[24px]"}`}
      >
        <span
          className={`${mobile ? "text-[28px]" : "text-[56px]"} font-bold text-white`}
        >
          2,437
        </span>
        <p
          className={`${mobile ? "text-[12px]" : "text-[14px]"} mt-[12px] max-w-[228px] text-center leading-[1.4] text-white`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
