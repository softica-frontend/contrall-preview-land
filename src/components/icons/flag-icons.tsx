const FLAG_CLASS = "size-[20px] shrink-0 rounded-full";

export function RuFlag() {
  return (
    <svg viewBox="0 0 20 20" className={FLAG_CLASS} aria-hidden="true">
      <clipPath id="ru-clip">
        <circle cx="10" cy="10" r="10" />
      </clipPath>
      <g clipPath="url(#ru-clip)">
        <rect width="20" height="7" fill="#fff" />
        <rect y="7" width="20" height="6" fill="#0039A6" />
        <rect y="13" width="20" height="7" fill="#D52B1E" />
      </g>
    </svg>
  );
}

export function EnFlag() {
  return (
    <svg viewBox="0 0 20 20" className={FLAG_CLASS} aria-hidden="true">
      <clipPath id="en-clip">
        <circle cx="10" cy="10" r="10" />
      </clipPath>
      <g clipPath="url(#en-clip)">
        <rect width="20" height="20" fill="#012169" />
        <path d="M0 0L20 20M20 0L0 20" stroke="#fff" strokeWidth="3.5" />
        <path d="M0 0L20 20M20 0L0 20" stroke="#C8102E" strokeWidth="2" />
        <path d="M10 0V20M0 10H20" stroke="#fff" strokeWidth="5.5" />
        <path d="M10 0V20M0 10H20" stroke="#C8102E" strokeWidth="3.5" />
      </g>
    </svg>
  );
}

export function UkFlag() {
  return (
    <svg viewBox="0 0 20 20" className={FLAG_CLASS} aria-hidden="true">
      <clipPath id="uk-clip">
        <circle cx="10" cy="10" r="10" />
      </clipPath>
      <g clipPath="url(#uk-clip)">
        <rect width="20" height="10" fill="#005BBB" />
        <rect y="10" width="20" height="10" fill="#FFD500" />
      </g>
    </svg>
  );
}
