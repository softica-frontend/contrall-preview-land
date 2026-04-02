"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const TIMEZONES = [
  { value: "UTC-12", label: "UTC −12" },
  { value: "UTC-11", label: "UTC −11" },
  { value: "UTC-10", label: "UTC −10" },
  { value: "UTC-9", label: "UTC −9" },
  { value: "UTC-8", label: "UTC −8" },
  { value: "UTC-7", label: "UTC −7" },
  { value: "UTC-6", label: "UTC −6" },
  { value: "UTC-5", label: "UTC −5" },
  { value: "UTC-4", label: "UTC −4" },
  { value: "UTC-3", label: "UTC −3" },
  { value: "UTC-2", label: "UTC −2" },
  { value: "UTC-1", label: "UTC −1" },
  { value: "UTC+0", label: "UTC + 0" },
  { value: "UTC+1", label: "UTC + 1" },
  { value: "UTC+2", label: "UTC + 2" },
  { value: "UTC+3", label: "UTC + 3" },
  { value: "UTC+4", label: "UTC + 4" },
  { value: "UTC+5", label: "UTC + 5" },
  { value: "UTC+6", label: "UTC + 6" },
  { value: "UTC+7", label: "UTC + 7" },
  { value: "UTC+8", label: "UTC + 8" },
  { value: "UTC+9", label: "UTC + 9" },
  { value: "UTC+10", label: "UTC + 10" },
  { value: "UTC+11", label: "UTC + 11" },
  { value: "UTC+12", label: "UTC + 12" },
];

interface TimezoneSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function TimezoneSelect({ value, onChange }: TimezoneSelectProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const selected = TIMEZONES.find((tz) => tz.value === value);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + 4,
      left: rect.left,
    });
  }, []);

  useEffect(() => {
    if (open) {
      setMounted(true);
      updatePosition();
      requestAnimationFrame(() => setVisible(true));
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }
    setVisible(false);
    const timer = setTimeout(() => setMounted(false), 200);
    return () => clearTimeout(timer);
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      )
        return;
      setOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select timezone"
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer items-center gap-1.5"
      >
        <span className="rounded-full bg-[#EBECFE] px-3 py-1 font-roboto text-[14px] font-medium leading-5 tracking-[0.5px] text-[#2575FF]">
          {selected?.label ?? value}
        </span>
        <span
          className={`inline-flex transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 4.5 6 7.5l3-3"
              stroke="#667085"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {mounted &&
        createPortal(
          <div
            ref={dropdownRef}
            role="listbox"
            aria-label="Select timezone"
            className={`fixed z-[9999] max-h-[240px] min-w-[140px] origin-top overflow-y-auto rounded-xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-200 ease-out ${
              visible ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            }`}
            style={{ top: position.top, left: position.left }}
          >
            {TIMEZONES.map((tz) => (
              <div
                key={tz.value}
                role="option"
                tabIndex={0}
                aria-selected={value === tz.value}
                onClick={() => {
                  onChange(tz.value);
                  setOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onChange(tz.value);
                    setOpen(false);
                  }
                }}
                className={`flex w-full cursor-pointer items-center px-4 py-2.5 text-[14px] transition-colors duration-150 hover:bg-[#f0f4ff] ${
                  value === tz.value
                    ? "font-medium text-[#2575ff]"
                    : "text-[#1d2939]"
                }`}
              >
                {tz.label}
              </div>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}
