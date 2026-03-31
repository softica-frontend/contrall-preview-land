export function ChartArrowsIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Chart"
      role="img"
    >
      {/* Baseline */}
      <path d="M3 21H21" />
      {/* Left bar with arrow up */}
      <path d="M6 18V14" />
      <path d="M4 16L6 14L8 16" />
      {/* Middle bar with arrow down */}
      <path d="M12 18V10" />
      <path d="M10 12L12 10L14 12" />
      {/* Right bar with arrow up */}
      <path d="M18 18V6" />
      <path d="M16 8L18 6L20 8" />
      {/* Vertical axis */}
      <path d="M3 3V21" />
    </svg>
  );
}

export function ZoomMoneyIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Savings"
      role="img"
    >
      {/* Magnifying glass */}
      <circle cx="10" cy="10" r="7" />
      <path d="M21 21L15.8 15.8" />
      {/* Dollar S-curve */}
      <path d="M10 7v6" />
      <path d="M8 8.5c0-.8.9-1.5 2-1.5s2 .7 2 1.5c0 1.5-4 1-4 2.5 0 .8.9 1.5 2 1.5s2-.7 2-1.5" />
    </svg>
  );
}

export function ChevronsRightIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Quick start"
      role="img"
    >
      <path d="M7 7L12 12L7 17" />
      <path d="M13 7L18 12L13 17" />
    </svg>
  );
}
