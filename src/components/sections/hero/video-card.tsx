import { GLASS_BG } from "./glass-bg";

/** Video overview card — inner frosted card with play button */
export function VideoCard({
  title,
  time,
  desktop,
}: {
  title: string;
  time: string;
  desktop: boolean;
}) {
  const r = desktop ? "rounded-[32px]" : "rounded-[16px]";
  const ir = desktop ? "rounded-[24px]" : "rounded-[12px]";

  return (
    <div
      className={`isolate overflow-hidden ${r} h-full w-full`}
      style={GLASS_BG}
    >
      <div className={`relative h-full ${desktop ? "p-[24px]" : "p-[12px]"}`}>
        {/* Inner card */}
        <div
          className={`${ir} relative flex h-full flex-col items-center justify-center overflow-hidden ${desktop ? "gap-[24px] px-[24px] pb-[32px] pt-[24px]" : "gap-[12px] px-[12px] pb-[16px] pt-[12px]"}`}
          style={{
            backgroundImage: "url(/images/hero/bg-gr-blue-video.png)",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Play button */}
          <div className="relative z-10 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#2575ff]">
            <svg
              width="16"
              height="18"
              viewBox="0 0 15 18"
              fill="none"
              role="img"
              aria-label="Play"
            >
              <path
                d="M1 1V17L14 9L1 1Z"
                stroke="#FCFCFD"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="relative z-10 w-full px-[4px] text-center">
            <p
              className={`${desktop ? "text-[20px]" : "text-[14px]"} font-medium leading-none tracking-[0.5px] text-black`}
            >
              {title}
            </p>
            <p
              className={`${desktop ? "text-[18px]" : "text-[14px]"} mt-[4px] leading-[1.4] font-normal`}
              style={{ color: "rgba(0,0,0,0.4)" }}
            >
              {time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
