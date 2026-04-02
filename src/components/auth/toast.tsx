"use client";

import { useEffect, useState } from "react";
import {
  CloseIcon,
  ErrorIcon,
  SuccessIcon,
} from "@/components/icons/auth-icons";

export type ToastType = "error" | "success";

export interface ToastData {
  type: ToastType;
  title: string;
  description?: string;
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
        fixed left-1/2 -translate-x-1/2 top-3 h-md:top-4 z-50
        w-[calc(100%-32px)] max-w-[305px] bg-white rounded-lg overflow-hidden
        shadow-card
        transition-all duration-300 ease-out pointer-events-auto
        ${visible ? "opacity-100 translate-y-0 shadow-elevated" : "opacity-0 -translate-y-4 shadow-none"}
      `}
      role="alert"
      aria-live="assertive"
      style={{ borderBottom: `2px solid ${borderColor}` }}
    >
      <div className="flex items-start gap-2.5 h-md:gap-3 px-3 h-md:px-4 py-2.5 h-md:py-3">
        <div className="mt-0.5 shrink-0">
          {toast.type === "error" ? <ErrorIcon /> : <SuccessIcon />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] h-md:text-[14px] font-medium text-text-primary">
            {toast.title}
          </p>
          {toast.description && (
            <p className="text-[12px] h-md:text-[13px] text-text-muted mt-0.5">
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
          className="shrink-0 text-text-placeholder hover:text-text-muted transition-colors"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
