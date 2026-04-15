"use client";

import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { AddTrackerModal } from "./components/add-tracker-modal";
import { EmptyState } from "./components/empty-state";
import { MOCK_TRACKERS } from "./components/mock-data";
import { TrackerCard } from "./components/tracker-card";
import { TrackerTable } from "./components/tracker-table";
import { TrackersToolbar } from "./components/trackers-toolbar";
import type { Tracker, ViewMode } from "./components/types";

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

  const onDelete = (id: string) =>
    setConfirmAction({ type: "delete", trackerId: id });

  const onPause = (id: string) =>
    setConfirmAction({ type: "pause", trackerId: id });

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
