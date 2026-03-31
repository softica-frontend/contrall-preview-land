"use client";

import { useEffect, useState } from "react";

export type ToastType = "error" | "success";

export interface ToastData {
  type: ToastType;
  title: string;
  description?: string;
}

function ErrorIcon() {
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

function SuccessIcon() {
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

interface ToastProps {
  toast: ToastData | null;
  onClose: () => void;
}

export function Toast({ toast, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (toast) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }, 4000);
      return () => clearTimeout(timer);
    }
    setVisible(false);
  }, [toast, onClose]);

  if (!toast) return null;

  const borderColor = toast.type === "error" ? "#DA1E28" : "#44BA3E";

  return (
    <div
      className={`
        absolute left-1/2 -translate-x-1/2 -top-32 z-50
        w-full max-w-[305px] bg-white rounded-lg overflow-hidden
        shadow-[0_0_6px_rgba(12,17,29,0.02),0_2px_4px_rgba(16,24,40,0.08)]
        transition-all duration-300 pointer-events-auto
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
      `}
      role="alert"
      aria-live="assertive"
      style={{ borderBottom: `2px solid ${borderColor}` }}
    >
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="mt-0.5 shrink-0">
          {toast.type === "error" ? <ErrorIcon /> : <SuccessIcon />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-medium text-[#1D2939]">
            {toast.title}
          </p>
          {toast.description && (
            <p className="text-[13px] text-[#475467] mt-0.5">
              {toast.description}
            </p>
          )}
        </div>
        <button
          type="button"
          aria-label="Close notification"
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 300);
          }}
          className="shrink-0 text-[#98A2B3] hover:text-[#475467] transition-colors"
        >
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
        </button>
      </div>
    </div>
  );
}
