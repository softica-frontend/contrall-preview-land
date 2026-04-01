"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { AddTrackerModal } from "./components/add-tracker-modal";
import { EmptyState } from "./components/empty-state";
import type { Tracker } from "./components/mock-data";
import { MOCK_TRACKERS } from "./components/mock-data";
import { TrackerCard } from "./components/tracker-card";
import { TrackerTable } from "./components/tracker-table";

type ViewMode = "grid" | "list";

export default function MyTrackersPage() {
  const t = useTranslations("MyTrackers");
  const [trackers, setTrackers] = useState<Tracker[]>(MOCK_TRACKERS);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [modalOpen, setModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmAction, setConfirmAction] = useState<{
    type: "delete" | "pause";
    trackerId: string;
  } | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleDeleteRequest = (id: string) => {
    setConfirmAction({ type: "delete", trackerId: id });
  };

  const handlePauseRequest = (id: string) => {
    setConfirmAction({ type: "pause", trackerId: id });
  };

  const handleConfirm = useCallback(() => {
    if (!confirmAction) return;
    if (confirmAction.type === "delete") {
      setTrackers((prev) =>
        prev.filter((tr) => tr.id !== confirmAction.trackerId),
      );
    } else {
      setTrackers((prev) =>
        prev.map((tr) =>
          tr.id === confirmAction.trackerId
            ? { ...tr, status: tr.status === "paused" ? "active" : "paused" }
            : tr,
        ),
      );
    }
    setConfirmAction(null);
  }, [confirmAction]);

  const filteredTrackers = searchQuery
    ? trackers.filter((tracker) =>
        tracker.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : trackers;

  const isEmpty = trackers.length === 0;

  return (
    <>
      <div className="flex flex-1 flex-col px-4 pb-5 md:px-10 xl:px-20">
        {/* Toolbar */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <h1 className="text-[28px] font-bold leading-[1.1] text-black md:text-[42px]">
              {t("title")}
            </h1>

            {/* Search */}
            <div className="relative flex items-center">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex size-14 cursor-pointer items-center justify-center rounded-full text-[#667085] transition-colors duration-200 hover:text-[#0C111D]"
                aria-label={t("searchPlaceholder")}
                style={{
                  opacity: searchOpen ? 0 : 1,
                  pointerEvents: searchOpen ? "none" : "auto",
                  position: searchOpen ? "absolute" : "relative",
                }}
              >
                <SearchIcon />
              </button>
              <div
                className="flex h-10 items-center gap-2 overflow-hidden rounded-full border bg-white px-4 transition-all duration-300 ease-out"
                style={{
                  width: searchOpen ? 240 : 0,
                  opacity: searchOpen ? 1 : 0,
                  borderColor: searchOpen ? "#D0D5DD" : "transparent",
                  padding: searchOpen ? undefined : "0",
                }}
              >
                <SearchIcon />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="w-full min-w-0 bg-transparent text-[14px] text-[#0C111D] outline-none placeholder:text-[#98A2B3]"
                  tabIndex={searchOpen ? 0 : -1}
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="shrink-0 cursor-pointer text-[#98A2B3] transition-colors duration-150 hover:text-[#0C111D]"
                  tabIndex={searchOpen ? 0 : -1}
                >
                  <svg
                    width="14"
                    height="14"
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
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View toggle */}
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`flex size-14 cursor-pointer items-center justify-center rounded-full transition-colors duration-150 ${
                viewMode === "list"
                  ? "text-[#2575FF]"
                  : "text-[#667085] hover:text-[#0C111D]"
              }`}
              aria-label={t("viewList")}
            >
              <ListIcon />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex size-14 cursor-pointer items-center justify-center rounded-full transition-colors duration-150 ${
                viewMode === "grid"
                  ? "text-[#2575FF]"
                  : "text-[#667085] hover:text-[#0C111D]"
              }`}
              aria-label={t("viewGrid")}
            >
              <GridIcon />
            </button>

            {/* Add button */}
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="flex cursor-pointer items-center gap-1 rounded-full bg-[#2575FF] px-5 py-3.5 text-[16px] font-medium leading-none tracking-[0.5px] text-[#FCFCFD] transition-colors duration-200 hover:bg-[#1a63e0]"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              {t("add")}
            </button>
          </div>
        </div>

        {/* Content */}
        {isEmpty ? (
          <EmptyState onAdd={() => setModalOpen(true)} />
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTrackers.map((tracker) => (
              <TrackerCard
                key={tracker.id}
                tracker={tracker}
                onDelete={handleDeleteRequest}
                onPause={handlePauseRequest}
              />
            ))}
          </div>
        ) : (
          <TrackerTable
            trackers={filteredTrackers}
            onDelete={handleDeleteRequest}
            onPause={handlePauseRequest}
          />
        )}
      </div>

      <AddTrackerModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {confirmAction && (
        <Modal.Confirm
          open
          onClose={() => setConfirmAction(null)}
          onConfirm={handleConfirm}
          title={
            confirmAction.type === "delete"
              ? t("confirm.deleteTitle")
              : t("confirm.pauseTitle")
          }
          message={
            confirmAction.type === "delete"
              ? t("confirm.deleteMessage")
              : t("confirm.pauseMessage")
          }
          confirmLabel={
            confirmAction.type === "delete"
              ? t("confirm.deleteConfirm")
              : t("confirm.pauseConfirm")
          }
          cancelLabel={t("confirm.cancel")}
        />
      )}
    </>
  );
}

function SearchIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="5" width="6" height="6" rx="1" />
      <path d="M14 7h6M14 11h4" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <path d="M14 16h6M14 20h4" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 12h16M12 4v16" />
    </svg>
  );
}
