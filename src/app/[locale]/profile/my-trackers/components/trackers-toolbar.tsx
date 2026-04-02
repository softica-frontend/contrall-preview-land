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
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <h1 className="text-[28px] font-bold leading-[1.1] text-black md:text-[42px]">
          {t("title")}
        </h1>
        <TrackerSearch
          open={searchOpen}
          query={searchQuery}
          placeholder={t("searchPlaceholder")}
          onOpenChange={onSearchOpenChange}
          onQueryChange={onSearchQueryChange}
        />
      </div>

      <div className="flex items-center gap-3">
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
          className="flex cursor-pointer items-center gap-1 rounded-full bg-primary px-5 py-3.5 text-[16px] font-medium leading-none tracking-[0.5px] text-surface transition-colors duration-200 hover:bg-primary-hover"
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
