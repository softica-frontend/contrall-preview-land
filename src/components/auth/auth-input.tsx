"use client";

import { type InputHTMLAttributes, useState } from "react";
import { EyeIcon } from "@/components/icons/auth-icons";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
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
      <label
        htmlFor={props.id}
        className="text-[14px] font-medium text-text-secondary pl-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          type={isPassword && showPassword ? "text" : type}
          className={`
            w-full h-[38px] h-md:h-[40px] h-lg:h-[44px] px-4 h-lg:px-6 rounded-full border bg-white
            text-[13px] h-lg:text-[14px] text-text-field placeholder:text-text-placeholder
            outline-none transition-all
            ${
              error
                ? "border-[#DA1E28] focus:border-[#DA1E28] focus:shadow-focus-error"
                : "border-border focus:border-text-placeholder focus:shadow-focus-primary"
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
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center hover:text-primary transition-colors duration-200"
            tabIndex={-1}
          >
            <EyeIcon open={showPassword} />
          </button>
        )}
      </div>
    </div>
  );
}
