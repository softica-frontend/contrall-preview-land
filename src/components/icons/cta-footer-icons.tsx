export function NoCardIcon() {
  return (
    <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border border-[#7491ff] md:h-[75px] md:w-[75px] md:border-2">
      <svg
        className="h-[16px] w-[16px] md:h-[32px] md:w-[32px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2575ff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 3l18 18" />
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h7m5 0h7" />
        <path d="M6 15h1" />
      </svg>
    </div>
  );
}

export function TwoMinIcon() {
  return (
    <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border border-[#7491ff] md:h-[75px] md:w-[75px] md:border-2">
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-bold leading-none text-[#2575ff] md:text-[20px]">
          2
        </span>
        <span className="text-[6px] leading-none text-[#2575ff] md:text-[10px]">
          мин
        </span>
      </div>
    </div>
  );
}

export function EmailIcon() {
  return (
    <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border border-[#7491ff] md:h-[75px] md:w-[75px] md:border-2">
      <svg
        className="h-[16px] w-[16px] md:h-[32px] md:w-[32px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2575ff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7L13.03 12.7a1.94 1.94 0 01-2.06 0L2 7" />
      </svg>
    </div>
  );
}
