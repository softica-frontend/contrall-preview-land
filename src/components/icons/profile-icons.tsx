interface IconProps {
  size?: number;
  className?: string;
}

function icon(
  size: number,
  className: string | undefined,
  children: React.ReactNode,
) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function PlusIcon({ size = 24, className }: IconProps) {
  return icon(size, className, <path d="M12 5v14M5 12h14" />);
}

export function CloseIcon({ size = 14, className }: IconProps) {
  return icon(size, className, <path d="M18 6 6 18M6 6l12 12" />);
}

export function SearchIcon({ size = 24, className }: IconProps) {
  return icon(
    size,
    className,
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </>,
  );
}

export function ListViewIcon({ size = 24, className }: IconProps) {
  return icon(
    size,
    className,
    <>
      <rect x="4" y="5" width="6" height="6" rx="1" />
      <path d="M14 7h6M14 11h4" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <path d="M14 16h6M14 20h4" />
    </>,
  );
}

export function GridViewIcon({ size = 24, className }: IconProps) {
  return icon(
    size,
    className,
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 12h16M12 4v16" />
    </>,
  );
}

export function MenuIcon({ size = 12, className }: IconProps) {
  return icon(size, className, <path d="M4 6h16M4 12h16M4 18h16" />);
}

export function BanknoteIcon({ size = 14, className }: IconProps) {
  return icon(
    size,
    className,
    <>
      <circle cx="12" cy="12" r="3" />
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 12h.01M18 12h.01" />
    </>,
  );
}

export function ChevronsUpIcon({ size = 12, className }: IconProps) {
  return icon(size, className, <path d="m7 11 5-5 5 5M7 17l5-5 5 5" />);
}

export function SettingsGearIcon({ size = 12, className }: IconProps) {
  return icon(
    size,
    className,
    <>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </>,
  );
}

export function PauseIcon({ size = 12, className }: IconProps) {
  return icon(
    size,
    className,
    <>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </>,
  );
}

export function UsersIcon({ size = 12, className }: IconProps) {
  return icon(
    size,
    className,
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>,
  );
}

export function TrashIcon({ size = 12, className }: IconProps) {
  return icon(
    size,
    className,
    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6" />,
  );
}

export function ExternalLinkIcon({ size = 12, className }: IconProps) {
  return icon(
    size,
    className,
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />,
  );
}

export function ChevronDownIcon({ size = 20, className }: IconProps) {
  return icon(size, className, <path d="m6 9 6 6 6-6" />);
}

export function LogoutIcon({ size = 20, className }: IconProps) {
  return icon(
    size,
    className,
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </>,
  );
}

/* ── Settings sidebar icons (14×14 viewBox) ── */

interface SidebarIconProps {
  className?: string;
}

export function UserIcon({ className }: SidebarIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="7"
        cy="4.667"
        r="2.333"
        stroke="currentColor"
        strokeWidth="1.17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.333 12.833v-.583a4.667 4.667 0 0 1 9.334 0v.583"
        stroke="currentColor"
        strokeWidth="1.17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShieldIcon({ className }: SidebarIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 1.167 2.333 3.5v3.5c0 3.033 1.993 5.867 4.667 6.417 2.674-.55 4.667-3.384 4.667-6.417V3.5L7 1.167Z"
        stroke="currentColor"
        strokeWidth="1.17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 1.167v12.25M2.333 7h9.334"
        stroke="currentColor"
        strokeWidth="1.17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CreditCardIcon({ className }: SidebarIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1.167"
        y="2.917"
        width="11.667"
        height="8.167"
        rx="1.167"
        stroke="currentColor"
        strokeWidth="1.17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.167 5.833h11.667"
        stroke="currentColor"
        strokeWidth="1.17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.083 8.75h.583"
        stroke="currentColor"
        strokeWidth="1.17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.417 8.75h1.166"
        stroke="currentColor"
        strokeWidth="1.17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
