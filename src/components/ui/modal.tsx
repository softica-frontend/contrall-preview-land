"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onClose, children, className }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      const timeout = setTimeout(() => {
        setMounted(false);
        document.body.style.overflow = "";
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose],
  );

  if (!mounted) return null;

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: overlay dismiss is supplementary to Escape key
    // biome-ignore lint/a11y/useKeyWithClickEvents: Escape key handling is in useEffect above
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center transition-colors duration-200"
      style={{
        backgroundColor: visible ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0)",
      }}
      onClick={handleOverlayClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={
          className ??
          "flex max-h-[95vh] w-[1051px] max-w-[95vw] flex-col overflow-hidden rounded-xl border border-border-light bg-surface"
        }
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "scale(1) translateY(0)"
            : "scale(0.95) translateY(8px)",
          transition: "opacity 200ms ease-out, transform 200ms ease-out",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border-light px-4 py-3">
      {children}
    </div>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-3">
      {children}
    </div>
  );
}

function Footer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-end gap-3 border-t border-border-light px-4 py-3">
      {children}
    </div>
  );
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex size-7 cursor-pointer items-center justify-center rounded-full text-text-subtle transition-colors duration-150 hover:bg-[#F2F4F7] hover:text-text-heading"
      aria-label="Close"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  );
}

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
}

function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel,
  cancelLabel,
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex w-[440px] max-w-[95vw] flex-col items-end gap-[12px] overflow-hidden rounded-[8px] border border-border bg-surface shadow-card"
    >
      {/* Header */}
      <div className="flex w-full items-center justify-between border-b border-border p-[12px]">
        <span className="text-[24px] font-bold leading-[1.1] text-text-heading">
          {title}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="flex size-[12px] shrink-0 cursor-pointer items-center justify-center text-text-subtle"
          aria-label="Close"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="flex w-full flex-1 items-center justify-center px-[12px]">
        <p className="flex-1 text-[14px] leading-[16px] tracking-[0.5px] text-text-muted">
          {message}
        </p>
      </div>

      {/* Footer */}
      <div className="flex w-full items-center justify-end gap-[6px] border-t border-border p-[12px]">
        <button
          type="button"
          onClick={onClose}
          className="flex h-[32px] cursor-pointer items-center justify-center rounded-[40px] px-[10px] py-[4px] text-[14px] font-medium leading-none tracking-[0.5px] text-text-body"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex h-[32px] cursor-pointer items-center justify-center rounded-[1000px] bg-primary px-[10px] py-[4px] text-[14px] font-medium leading-none tracking-[0.5px] text-surface transition-colors duration-200 hover:bg-primary-hover"
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
Modal.CloseButton = CloseButton;
Modal.Confirm = ConfirmModal;
