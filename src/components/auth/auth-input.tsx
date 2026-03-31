"use client";

import { type InputHTMLAttributes, useState } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
}

function EyeIcon({ open }: { open: boolean }) {
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

export function AuthInput({
  label,
  type,
  error,
  className,
  ...props
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={props.id} className="text-[14px] font-medium text-[#21272A] pl-1">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          type={isPassword && showPassword ? "text" : type}
          className={`
            w-full h-[44px] px-6 rounded-full border bg-white
            text-[14px] text-[#1B2D45] placeholder:text-[#98A2B3]
            outline-none transition-all
            ${
              error
                ? "border-[#DA1E28] focus:border-[#DA1E28] focus:shadow-[0_0_0_1px_#DA1E28,0_0_0_4px_rgba(218,30,40,0.2)]"
                : "border-[#D0D5DD] focus:border-[#98A2B3] focus:shadow-[0_0_0_1px_#3B82F6,0_0_0_4px_rgba(59,130,246,0.2)]"
            }
            ${isPassword ? "pr-12" : ""}
            ${className ?? ""}
          `}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center hover:text-[#2575ff] transition-colors duration-200"
            tabIndex={-1}
          >
            <EyeIcon open={showPassword} />
          </button>
        )}
      </div>
    </div>
  );
}
