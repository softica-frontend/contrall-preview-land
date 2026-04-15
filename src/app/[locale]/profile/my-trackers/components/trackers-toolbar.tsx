"use client";

import { useTranslations } from "next-intl";
import {
  GridViewIcon,
  ListViewIcon,
  PlusIcon,
} from "@/components/icons/profile-icons";
import { TrackerSearch } from "./tracker-search";
import type { ViewMode } from "./types";

interface TrackersToolbarProps {
  viewMode: ViewMode;
  searchOpen: boolean;
  searchQuery: string;
  onViewModeChange: (mode: ViewMode) => void;
  onSearchOpenChange: (open: boolean) => void;
  onSearchQueryChange: (query: string) => void;
  onAdd: () => void;
}

export function TrackersToolbar({
  viewMode,
  searchOpen,
  searchQuery,
  onViewModeChange,
  onSearchOpenChange,
  onSearchQueryChange,
  onAdd,
}: TrackersToolbarProps) {
  const t = useTranslations("MyTrackers");

  return (
    <div className="flex flex-col-reverse py-2 lg:flex-row lg:items-center lg:justify-between">
      {/* Left on desktop / Bottom row on mobile: title + (search on desktop) + (add on mobile) */}
      <div className="flex items-center justify-between lg:justify-start lg:gap-3">
        <h1 className="text-[28px] font-bold leading-[1.1] text-black lg:text-[42px]">
          {t("title")}
        </h1>
        <div className="hidden lg:block">
          <TrackerSearch
            open={searchOpen}
            query={searchQuery}
            placeholder={t("searchPlaceholder")}
            onOpenChange={onSearchOpenChange}
            onQueryChange={onSearchQueryChange}
          />
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="flex cursor-pointer items-center gap-1 rounded-full bg-primary px-4 py-2.5 text-[14px] font-medium leading-none tracking-[0.5px] text-surface transition-colors duration-200 hover:bg-primary-hover lg:hidden"
        >
          <PlusIcon />
          {t("add")}
        </button>
      </div>

      {/* Right on desktop / Top row on mobile: (search on mobile) + list + grid + (add on desktop) */}
      <div className="flex items-center justify-end lg:gap-3">
        <div className="lg:hidden">
          <TrackerSearch
            open={searchOpen}
            query={searchQuery}
            placeholder={t("searchPlaceholder")}
            onOpenChange={onSearchOpenChange}
            onQueryChange={onSearchQueryChange}
          />
        </div>
        <ViewToggleButton
          active={viewMode === "list"}
          label={t("viewList")}
          onClick={() => onViewModeChange("list")}
        >
          <ListViewIcon />
        </ViewToggleButton>
        <ViewToggleButton
          active={viewMode === "grid"}
          label={t("viewGrid")}
          onClick={() => onViewModeChange("grid")}
        >
          <GridViewIcon />
        </ViewToggleButton>
        <button
          type="button"
          onClick={onAdd}
          className="hidden cursor-pointer items-center gap-1 rounded-full bg-primary px-5 py-3.5 text-[16px] font-medium leading-none tracking-[0.5px] text-surface transition-colors duration-200 hover:bg-primary-hover lg:flex"
        >
          <PlusIcon />
          {t("add")}
        </button>
      </div>
    </div>
  );
}

function ViewToggleButton({
  active,
  label,
  onClick,
  children,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex size-14 cursor-pointer items-center justify-center rounded-full transition-colors duration-150 ${
        active ? "text-primary" : "text-text-subtle hover:text-text-heading"
      }`}
      aria-label={label}
    >
      {children}
    </button>
  );
}
