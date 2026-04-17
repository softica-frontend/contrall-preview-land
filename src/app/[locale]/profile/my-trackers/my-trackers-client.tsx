"use client";

import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import useSWR from "swr";
import { Modal } from "@/components/ui/modal";
import { getTrackers } from "./actions";
import { AddTrackerModal } from "./components/add-tracker-modal";
import { EmptyState } from "./components/empty-state";
import { TrackerCard } from "./components/tracker-card";
import { TrackerCardSkeleton } from "./components/tracker-card-skeleton";
import { TrackerTable } from "./components/tracker-table";
import { TrackerTableSkeleton } from "./components/tracker-table-skeleton";
import { TrackersToolbar } from "./components/trackers-toolbar";
import type { ViewMode } from "./components/types";
import { useConfirmAction } from "./hooks/use-confirm-action";
import { useViewMode } from "./hooks/use-view-mode";

interface MyTrackersClientProps {
  initialViewMode: ViewMode;
}

export function MyTrackersClient({ initialViewMode }: MyTrackersClientProps) {
  const t = useTranslations("MyTrackers");
  const {
    data: trackers = [],
    isLoading,
    mutate,
  } = useSWR("trackers", getTrackers);
  const [viewMode, setViewMode] = useViewMode(initialViewMode);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    confirmAction,
    setConfirmAction,
    handleConfirm,
    isPending,
    onDelete,
    onPause,
  } = useConfirmAction(trackers, (updater) => {
    mutate((prev) => updater(prev ?? []), { revalidate: false });
  });

  // Keep the last non-null value so modal content stays correct during the close animation
  const lastConfirmRef = useRef(confirmAction);
  if (confirmAction !== null) lastConfirmRef.current = confirmAction;
  const displayedAction = lastConfirmRef.current;

  const filteredTrackers = searchQuery
    ? trackers.filter((tr) =>
        tr.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : trackers;

  const renderContent = () => {
    if (isLoading) {
      return viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <TrackerCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <TrackerTableSkeleton />
      );
    }

    if (trackers.length === 0) {
      return <EmptyState onAdd={() => setModalOpen(true)} />;
    }

    if (filteredTrackers.length === 0) {
      return (
        <p className="py-20 text-center text-[16px] text-text-subtle">
          {t("noResults")}
        </p>
      );
    }

    return viewMode === "grid" ? (
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
    );
  };

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

        {renderContent()}
      </div>

      <AddTrackerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        mutate={mutate}
      />

      <Modal.Confirm
        open={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={handleConfirm}
        isPending={isPending}
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
