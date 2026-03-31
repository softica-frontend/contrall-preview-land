export function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-label="Play"
      role="img"
    >
      <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="2" />
      <path d="M19 15.5L33 24L19 32.5V15.5Z" fill="currentColor" />
    </svg>
  );
}
