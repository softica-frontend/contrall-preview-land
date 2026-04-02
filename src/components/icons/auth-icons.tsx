export function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 4.5C5.83 4.5 2.27 7.11 1 10.75c1.27 3.64 4.83 6.25 9 6.25s7.73-2.61 9-6.25C17.73 7.11 14.17 4.5 10 4.5Zm0 10.42a4.17 4.17 0 1 1 0-8.34 4.17 4.17 0 0 1 0 8.34Zm0-6.67a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
          fill="#98A2B3"
        />
      </svg>
    );
  }
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 4.5C5.83 4.5 2.27 7.11 1 10.75c1.27 3.64 4.83 6.25 9 6.25s7.73-2.61 9-6.25C17.73 7.11 14.17 4.5 10 4.5Zm0 10.42a4.17 4.17 0 1 1 0-8.34 4.17 4.17 0 0 1 0 8.34Zm0-6.67a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
        fill="#98A2B3"
      />
      <line
        x1="3"
        y1="3"
        x2="17"
        y2="17"
        stroke="#98A2B3"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09a6.87 6.87 0 0 1 0-4.38V6.88H2.18a11.5 11.5 0 0 0 0 10.04l3.66-2.84Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function AppleIcon() {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.51-3.23 0-1.44.64-2.2.46-3.06-.4C3.79 16.17 4.36 9.03 8.91 8.78c1.27.07 2.15.74 2.9.78.98-.2 1.92-.76 2.97-.69 1.26.1 2.21.59 2.83 1.5-2.59 1.55-1.97 4.96.42 5.91-.5 1.3-.73 1.88-1.37 3.03-.76 1.38-1.84 2.76-3.18 2.78-.58-.02-1.05-.33-1.6-.35-.58-.02-1.1.32-1.63.35-1.33-.04-2.35-1.29-3.11-2.67a12.3 12.3 0 0 1-1.87-6.37c0-3.74 2.43-5.74 4.82-5.8 1.18.02 2.34.82 3.07.82.73 0 2.1-1.01 3.54-.87.6.03 2.29.24 3.37 1.83-2.45 1.51-2.04 5.37.77 6.4-.52 1.37-.77 1.98-1.47 3.21Z"
        fill="#0C111D"
      />
    </svg>
  );
}

export function ErrorIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Error"
      role="img"
    >
      <circle cx="10" cy="10" r="9" stroke="#DA1E28" strokeWidth="2" />
      <path
        d="M10 6v5"
        stroke="#DA1E28"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="10" cy="14" r="1" fill="#DA1E28" />
    </svg>
  );
}

export function SuccessIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Success"
      role="img"
    >
      <circle cx="10" cy="10" r="9" stroke="#44BA3E" strokeWidth="2" />
      <path
        d="M6.5 10.5 9 13l4.5-5"
        stroke="#44BA3E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-label="Close notification"
      role="img"
    >
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
