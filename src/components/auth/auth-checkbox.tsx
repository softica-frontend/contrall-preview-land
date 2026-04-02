"use client";

import { type InputHTMLAttributes, useState } from "react";

interface AuthCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  error?: boolean;
}

export function AuthCheckbox({
  label,
  checked: controlledChecked,
  onChange,
  error,
  className,
  ...props
}: AuthCheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  const isChecked = controlledChecked ?? internalChecked;

  const handleChange = () => {
    const next = !isChecked;
    setInternalChecked(next);
    onChange?.(next);
  };

  return (
    <label
      className={`flex items-center gap-2.5 cursor-pointer select-none ${className ?? ""}`}
    >
      <input
        type="checkbox"
        {...props}
        checked={isChecked}
        onChange={handleChange}
        className="sr-only"
      />
      <div
        className={`
          w-5 h-5 rounded-[4px] border-[1.5px] flex items-center justify-center transition-colors
          ${
            isChecked
              ? "bg-checkbox-active border-checkbox-active"
              : error
                ? "bg-white border-[#DA1E28] shadow-focus-error"
                : "bg-white border-border"
          }
        `}
      >
        {isChecked && (
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            aria-label="Checked checkbox"
            role="img"
          >
            <path
              d="M1 5.5 4 8.5l7-7"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="text-[14px] text-text-field">{label}</span>
    </label>
  );
}
