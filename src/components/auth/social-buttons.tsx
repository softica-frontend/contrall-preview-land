"use client";

import { AppleIcon, GoogleIcon } from "@/components/icons/auth-icons";

export function SocialButtons() {
  return (
    <div className="flex items-center justify-center gap-3 h-lg:gap-4">
      <button
        type="button"
        className="flex items-center justify-center w-[42px] h-[42px] h-lg:w-[50px] h-lg:h-[50px] rounded-[12px] h-lg:rounded-[16px] bg-surface cursor-pointer shadow-button hover:shadow-button-hover transition-shadow"
        aria-label="Sign in with Google"
      >
        <GoogleIcon />
      </button>
      <button
        type="button"
        className="flex items-center justify-center w-[42px] h-[42px] h-lg:w-[50px] h-lg:h-[50px] rounded-[12px] h-lg:rounded-[16px] bg-surface cursor-pointer shadow-button hover:shadow-button-hover transition-shadow"
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
      <div className="flex-1 h-px bg-border-light" />
      <span className="text-[14px] text-text-subtle">{label}</span>
      <div className="flex-1 h-px bg-border-light" />
    </div>
  );
}
