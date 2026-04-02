"use client";

function GoogleIcon() {
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

function AppleIcon() {
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

export function SocialButtons() {
  return (
    <div className="flex items-center justify-center gap-3 h-lg:gap-4">
      <button
        type="button"
        className="flex items-center justify-center w-[42px] h-[42px] h-lg:w-[50px] h-lg:h-[50px] rounded-[12px] h-lg:rounded-[16px] bg-[#fcfcfd] cursor-pointer shadow-[0_1px_2px_rgba(16,24,40,0.06),0_1px_3px_rgba(16,24,40,0.1),0_0_0_1px_rgba(16,24,40,0.04)] hover:shadow-[0_2px_4px_rgba(16,24,40,0.08),0_2px_6px_rgba(16,24,40,0.12),0_0_0_1px_rgba(16,24,40,0.06)] transition-shadow"
        aria-label="Sign in with Google"
      >
        <GoogleIcon />
      </button>
      <button
        type="button"
        className="flex items-center justify-center w-[42px] h-[42px] h-lg:w-[50px] h-lg:h-[50px] rounded-[12px] h-lg:rounded-[16px] bg-[#fcfcfd] cursor-pointer shadow-[0_1px_2px_rgba(16,24,40,0.06),0_1px_3px_rgba(16,24,40,0.1),0_0_0_1px_rgba(16,24,40,0.04)] hover:shadow-[0_2px_4px_rgba(16,24,40,0.08),0_2px_6px_rgba(16,24,40,0.12),0_0_0_1px_rgba(16,24,40,0.06)] transition-shadow"
        aria-label="Sign in with Apple"
      >
        <AppleIcon />
      </button>
    </div>
  );
}

export function Divider({ label = "или" }: { label?: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-px bg-[#E4E7EC]" />
      <span className="text-[14px] text-[#667085]">{label}</span>
      <div className="flex-1 h-px bg-[#E4E7EC]" />
    </div>
  );
}
