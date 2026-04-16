"use client";

import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { AddTrackerModal } from "./components/add-tracker-modal";
import { EmptyState } from "./components/empty-state";
import { MOCK_TRACKERS } from "./components/mock-data";
import { TrackerCard } from "./components/tracker-card";
import { TrackerTable } from "./components/tracker-table";
import { TrackersToolbar } from "./components/trackers-toolbar";
import type { Tracker, ViewMode } from "./components/types";
import { useConfirmAction } from "./hooks/use-confirm-action";

export default function MyTrackersPage() {
  const t = useTranslations("MyTrackers");
  const [trackers, setTrackers] = useState<Tracker[]>(MOCK_TRACKERS);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [modalOpen, setModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { confirmAction, setConfirmAction, handleConfirm, onDelete, onPause } =
    useConfirmAction(trackers, setTrackers);

  // Keep the last non-null value so modal content stays correct during the close animation
  const lastConfirmRef = useRef(confirmAction);
  if (confirmAction !== null) lastConfirmRef.current = confirmAction;
  const displayedAction = lastConfirmRef.current;

  const filteredTrackers = searchQuery
    ? trackers.filter((tr) =>
        tr.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : trackers;

  return (
    <>
      <div className="flex flex-1 flex-col px-4 pb-5 lg:px-10 xl:px-20">
        <TrackersToolbar
          viewMode={viewMode}
          searchOpen={searchOpen}
          searchQuery={searchQuery}
          onViewModeChange={setViewMode}
          onSearchOpenChange={setSearchOpen}
          onSearchQueryChange={setSearchQuery}
          onAdd={() => setModalOpen(true)}
        />

        {trackers.length === 0 ? (
          <EmptyState onAdd={() => setModalOpen(true)} />
        ) : filteredTrackers.length === 0 ? (
          <p className="py-20 text-center text-[16px] text-text-subtle">
            {t("noResults")}
          </p>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTrackers.map((tracker) => (
              <TrackerCard
                key={tracker.id}
                tracker={tracker}
                onDelete={onDelete}
                onPause={onPause}
              />
            ))}
          </div>
        ) : (
          <TrackerTable
            trackers={filteredTrackers}
            onDelete={onDelete}
            onPause={onPause}
          />
        )}
      </div>

      <AddTrackerModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <Modal.Confirm
        open={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={handleConfirm}
        title={
          displayedAction?.type === "delete"
            ? t("confirm.deleteTitle")
            : displayedAction?.trackerStatus === "paused"
              ? t("confirm.resumeTitle")
              : t("confirm.pauseTitle")
        }
        message={
          displayedAction?.type === "delete"
            ? t("confirm.deleteMessage")
            : displayedAction?.trackerStatus === "paused"
              ? t("confirm.resumeMessage")
              : t("confirm.pauseMessage")
        }
        confirmLabel={
          displayedAction?.type === "delete"
            ? t("confirm.deleteConfirm")
            : displayedAction?.trackerStatus === "paused"
              ? t("confirm.resumeConfirm")
              : t("confirm.pauseConfirm")
        }
        cancelLabel={t("confirm.cancel")}
        requiredInput={
          displayedAction?.type === "delete"
            ? displayedAction.trackerName
            : undefined
        }
        inputHint={
          displayedAction?.type === "delete" && displayedAction.trackerName ? (
            <>
              {t("confirm.deleteInputHint")}:{" "}
              <strong className="font-semibold text-text-body">
                {displayedAction.trackerName}
              </strong>
            </>
          ) : undefined
        }
        inputPlaceholder={
          displayedAction?.type === "delete"
            ? t("confirm.deleteInputPlaceholder")
            : undefined
        }
      />
    </>
  );
}
