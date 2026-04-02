import Image from "next/image";
import { GLASS_BG } from "./glass-bg";

/** Migration card — tracker logos + text */
export function MigrationCard({
  text,
  time,
  desktop,
}: {
  text: string;
  time: string;
  desktop: boolean;
}) {
  const avatarSize = desktop ? 75 : 42;
  const r = desktop ? "rounded-[32px]" : "rounded-[16px]";
  const pad = desktop ? "p-[24px]" : "p-[12px]";
  const shadow = {
    boxShadow:
      "0px 0px 6px rgba(16,24,40,0.02), -2px 0px 4px rgba(29,41,57,0.08)",
  };

  return (
    <div
      className={`isolate overflow-hidden ${r} h-full w-full`}
      style={GLASS_BG}
    >
      <div className={`flex h-full flex-col justify-between ${pad}`}>
        {/* Avatar row */}
        <div className="flex items-center">
          {/* Dots logo */}
          <div
            className="flex shrink-0 items-center justify-center rounded-full"
            style={{
              width: avatarSize,
              height: avatarSize,
              backgroundColor: "#fcfcfd",
              ...shadow,
              marginRight: desktop ? -32 : -18,
              zIndex: 1,
              position: "relative",
            }}
          >
            <svg
              viewBox="0 0 32 32"
              width={desktop ? 32 : 18}
              height={desktop ? 32 : 18}
              role="img"
              aria-label="More"
            >
              <circle cx="8" cy="16" r="2.5" fill="#667085" />
              <circle cx="16" cy="16" r="2.5" fill="#667085" />
              <circle cx="24" cy="16" r="2.5" fill="#667085" />
            </svg>
          </div>

          {/* Redtrack — SVG already includes white circle + shadow */}
          <div
            style={{
              width: avatarSize,
              height: avatarSize,
              marginRight: desktop ? -32 : -18,
              zIndex: 2,
              position: "relative",
              flexShrink: 0,
            }}
          >
            <Image
              src="/images/hero/logos/redtrack.svg"
              alt=""
              fill
              sizes="75px"
            />
          </div>

          {/* Keitaro — green K on white circle */}
          <div
            className="flex shrink-0 items-center justify-center rounded-full"
            style={{
              width: avatarSize,
              height: avatarSize,
              backgroundColor: "#fcfcfd",
              ...shadow,
              marginRight: desktop ? -32 : -18,
              zIndex: 3,
              position: "relative",
            }}
          >
            <span
              className="font-bold"
              style={{
                color: "#5BAD5E",
                fontSize: desktop ? 36 : 20,
              }}
            >
              K
            </span>
          </div>

          {/* Binom — white circle with cropped image inside */}
          <div
            className="flex shrink-0 items-center justify-center overflow-hidden rounded-full"
            style={{
              width: avatarSize,
              height: avatarSize,
              backgroundColor: "#fcfcfd",
              ...shadow,
              zIndex: 4,
              position: "relative",
            }}
          >
            <Image
              src="/images/hero/logos/binom.png"
              alt=""
              width={desktop ? 40 : 22}
              height={desktop ? 40 : 22}
              style={{ width: "auto", height: "auto" }}
              className="object-contain"
            />
          </div>
        </div>
        <div className="px-[4px]">
          <p
            className={`${desktop ? "text-[18px]" : "text-[14px]"} font-medium text-black leading-[1.2]`}
          >
            {text}
          </p>
          <p
            className={`${desktop ? "text-[18px]" : "text-[14px]"} mt-[4px] font-normal text-text-subtle`}
          >
            {time}
          </p>
        </div>
      </div>
    </div>
  );
}
