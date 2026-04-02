import { GLASS_BG } from "./glass-bg";

/** Pricing card — inner card with gradient image bg + badge + price */
export function PricingCard({
  badge,
  period,
  compare,
  desktop,
}: {
  badge: string;
  period: string;
  compare: string;
  desktop: boolean;
}) {
  const r = desktop ? "rounded-[32px]" : "rounded-[16px]";

  return (
    <div
      className={`isolate overflow-hidden ${r} h-full w-full`}
      style={GLASS_BG}
    >
      <div
        className={`flex h-full flex-col ${desktop ? "pt-[24px] pb-[32px] px-[24px] gap-[16px]" : "p-[12px] gap-[8px]"}`}
      >
        {/* Inner card with gradient image background */}
        <div
          className={`relative flex flex-1 flex-col justify-between overflow-hidden rounded-[12px] ${desktop ? "pb-[32px] pt-[24px] px-[24px]" : "p-[8px]"}`}
        >
          {/* Gradient bg — teal left → purple right (opaque) */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[12px]"
            style={{
              background:
                "linear-gradient(100deg, #B4E2E2 0%, #C0D6EC 25%, #CDD0F2 50%, #D8C8EC 75%, #E0C0E4 100%)",
            }}
          />
          {/* Badge */}
          <div className="relative">
            <span
              className={`inline-block rounded-[12px] px-[12px] py-[2px] ${desktop ? "text-[18px]" : "text-[12px]"} font-normal text-indicator`}
              style={{ background: "rgba(252,252,253,0.7)" }}
            >
              {badge}
            </span>
          </div>
          {/* Price */}
          <div className="relative flex items-end gap-[2px]">
            <span
              className={`${desktop ? "text-[42px]" : "text-[24px]"} font-bold leading-[1.1] text-text-primary`}
            >
              $99
            </span>
            <span
              className={`${desktop ? "text-[24px]" : "text-[18px]"} font-bold leading-[1.1] text-text-body`}
            >
              {period}
            </span>
          </div>
        </div>
        {/* Compare text */}
        <p
          className={`${desktop ? "text-[18px] px-[24px]" : "text-[14px] px-[4px]"} font-medium leading-[normal] text-indicator`}
        >
          {compare}
        </p>
      </div>
    </div>
  );
}
