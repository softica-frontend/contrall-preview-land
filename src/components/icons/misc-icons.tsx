export function TelegramIcon() {
  return (
    <svg
      viewBox="0 0 20 16"
      fill="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <path
        d="M18.9 0.2L0.8 7.1C-0.2 7.5-0.2 8.2 0.7 8.5L5 9.8L16.1 3.1C16.6 2.8 17.1 3 16.7 3.3L7.5 11.5L7.2 15.7C7.6 15.7 7.8 15.5 8.1 15.2L10.5 12.9L14.9 16.1C15.7 16.5 16.3 16.3 16.5 15.3L19.9 1.6C20.2 0.4 19.4-0.2 18.9 0.2Z"
        fill="#2575FF"
      />
    </svg>
  );
}

export function CursorIcon({
  color,
  rotation = 0,
  flipX = false,
  className,
}: {
  color: string;
  rotation?: number;
  flipX?: boolean;
  className?: string;
}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{
        transform: `${flipX ? "scaleX(-1) " : ""}rotate(${rotation}deg)`,
      }}
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
