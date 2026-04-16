"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  DotsVerticalIcon,
  ExternalLinkIcon,
  MenuIcon,
  PauseIcon,
  PlayIcon,
  SettingsGearIcon,
  TrashIcon,
  UpgradeIcon,
  UsersIcon,
} from "@/components/icons/profile-icons";

// 6 items × 40px + 2 × 6px padding + 5 × 6px gaps = 282px
const DROPDOWN_NATURAL_HEIGHT = 282;
const VIEWPORT_MARGIN = 8;
const GAP_FROM_TRIGGER = 4;

interface TrackerActionsMenuProps {
  trackerId: string;
  trackerStatus?: "active" | "paused" | "stopped";
  onDelete: (id: string) => void;
  onPause: (id: string) => void;
  /** "card" — round glass button with horizontal lines
   *  "table" — plain button with vertical dots */
  variant?: "card" | "table";
}

interface DropdownCoords {
  top?: number;
  bottom?: number;
  right: number;
  maxHeight: number;
}

export function TrackerActionsMenu({
  trackerId,
  trackerStatus,
  onDelete,
  onPause,
  variant = "table",
}: TrackerActionsMenuProps) {
  const t = useTranslations("MyTrackers");
  const [open, setOpen] = useState(false);
  const [panelMounted, setPanelMounted] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState<DropdownCoords>({
    right: 0,
    maxHeight: DROPDOWN_NATURAL_HEIGHT,
  });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setPanelMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPanelVisible(true));
      });
    } else {
      document.body.style.overflow = "";
      setPanelVisible(false);
      const t = setTimeout(() => setPanelMounted(false), 150);
      return () => clearTimeout(t);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleOpen = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const right = window.innerWidth - rect.right;
      const spaceBelow =
        window.innerHeight - rect.bottom - GAP_FROM_TRIGGER - VIEWPORT_MARGIN;
      const spaceAbove = rect.top - GAP_FROM_TRIGGER - VIEWPORT_MARGIN;

      if (spaceBelow >= DROPDOWN_NATURAL_HEIGHT || spaceBelow >= spaceAbove) {
        setCoords({
          top: rect.bottom + GAP_FROM_TRIGGER,
          right,
          maxHeight: Math.min(spaceBelow, DROPDOWN_NATURAL_HEIGHT),
        });
      } else {
        setCoords({
          bottom: window.innerHeight - rect.top + GAP_FROM_TRIGGER,
          right,
          maxHeight: Math.min(spaceAbove, DROPDOWN_NATURAL_HEIGHT),
        });
      }
    }
    setOpen((v) => !v);
  };

  const dropdownStyle: React.CSSProperties = {
    position: "fixed",
    right: coords.right,
    maxHeight: coords.maxHeight,
    overflowY: "auto",
    zIndex: 9999,
    ...(coords.top !== undefined ? { top: coords.top } : {}),
    ...(coords.bottom !== undefined ? { bottom: coords.bottom } : {}),
  };

  return (
    <div className="relative">
      {variant === "card" ? (
        <button
          ref={buttonRef}
          type="button"
          onClick={handleOpen}
          aria-haspopup="menu"
          aria-expanded={open}
          className="relative flex size-[34px] cursor-pointer items-center justify-center overflow-hidden rounded-full text-text-heading"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(252,252,253,0) 0%, rgba(37,117,255,0.10) 100%), rgba(252,252,253,0.30)",
            backgroundBlendMode: "screen, screen",
            boxShadow:
              "-0.5px -1px 1px 0px rgba(37,117,255,0.80) inset, 0.5px 1px 1px 0px rgba(37,117,255,0.80) inset",
          }}
        >
          <MenuIcon size={18} />
        </button>
      ) : (
        <button
          ref={buttonRef}
          type="button"
          onClick={handleOpen}
          aria-haspopup="menu"
          aria-expanded={open}
          className="flex size-[28px] cursor-pointer items-center justify-center rounded-full text-text-subtle transition-colors duration-150 hover:bg-[#F2F4F7] hover:text-text-heading"
        >
          <DotsVerticalIcon size={18} />
        </button>
      )}

      {panelMounted &&
        mounted &&
        createPortal(
          <>
            {/* biome-ignore lint/a11y/noStaticElementInteractions: click-away dismiss */}
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: Escape handled via onKeyDown on menu */}
            <div
              className="fixed inset-0"
              style={{ zIndex: 9998 }}
              onClick={() => setOpen(false)}
            />
            <div
              role="menu"
              style={dropdownStyle}
              className={`flex flex-col gap-[6px] rounded-[8px] border border-border-light bg-surface p-[6px] shadow-card ${
                panelVisible
                  ? "animate-[dropdown-in_220ms_cubic-bezier(0.16,1,0.3,1)_both]"
                  : "animate-[dropdown-out_150ms_ease-in_both]"
              }`}
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false);
              }}
            >
              <DropdownItem
                icon={<UpgradeIcon size={14} />}
                onClick={() => setOpen(false)}
              >
                {t("actions.upgrade")}
              </DropdownItem>
              <DropdownItem
                icon={<SettingsGearIcon size={14} />}
                onClick={() => setOpen(false)}
              >
                {t("actions.settings")}
              </DropdownItem>
              <DropdownItem
                icon={
                  trackerStatus === "paused" ? (
                    <PlayIcon size={14} />
                  ) : (
                    <PauseIcon size={14} />
                  )
                }
                onClick={() => {
                  setOpen(false);
                  onPause(trackerId);
                }}
              >
                {trackerStatus === "paused"
                  ? t("actions.resume")
                  : t("actions.pause")}
              </DropdownItem>
              <DropdownItem
                icon={<UsersIcon size={14} />}
                onClick={() => setOpen(false)}
              >
                {t("actions.users")}
              </DropdownItem>
              <DropdownItem
                icon={<ExternalLinkIcon size={14} />}
                onClick={() => setOpen(false)}
              >
                {t("actions.open")}
              </DropdownItem>
              <DropdownItem
                icon={<TrashIcon size={14} />}
                onClick={() => {
                  setOpen(false);
                  onDelete(trackerId);
                }}
                danger
              >
                {t("actions.delete")}
              </DropdownItem>
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}

function DropdownItem({
  children,
  onClick,
  danger,
  icon,
}: {
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[40px] w-full cursor-pointer items-center gap-[10px] rounded-[6px] px-2 text-left text-[16px] leading-[1.4] transition-colors duration-100 hover:bg-[#F2F4F7] ${
        danger ? "text-[#D92D20]" : "text-text-body"
      }`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
    </button>
  );
}
