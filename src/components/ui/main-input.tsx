"use client";

import type { InputHTMLAttributes } from "react";

interface MainInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function MainInput({ className, ...props }: MainInputProps) {
  return (
    <div className={`relative min-w-[375px] max-w-[500px] ${className ?? ""}`}>
      <input
        {...props}
        className="peer w-full bg-transparent pb-1.5 font-roboto text-[16px] leading-[1.4] text-[#344054] placeholder:text-[#667085] outline-none"
      />
      <span className="absolute bottom-0 left-0 h-[2px] w-full scale-x-0 rounded-full bg-[#2575ff] transition-transform duration-200 peer-focus:scale-x-100" />
    </div>
  );
}
