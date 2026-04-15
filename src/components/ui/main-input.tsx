"use client";

import type { InputHTMLAttributes } from "react";

interface MainInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function MainInput({ className, ...props }: MainInputProps) {
  return (
    <div className={`relative w-full ${className ?? ""}`}>
      <input
        {...props}
        className="peer w-full bg-transparent pb-1.5 font-roboto text-[16px] leading-[1.4] text-text-body placeholder:text-text-subtle outline-none"
      />
      <span className="absolute bottom-0 left-0 h-[2px] w-full scale-x-0 rounded-full bg-primary transition-transform duration-200 peer-focus:scale-x-100" />
    </div>
  );
}
