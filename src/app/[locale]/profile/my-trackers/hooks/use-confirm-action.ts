import { useCallback, useState, useTransition } from "react";
import { deleteTracker, pauseTracker } from "../actions";
import type { Tracker } from "../components/types";

interface ConfirmAction {
  type: "delete" | "pause";
  trackerId: string;
  trackerStatus?: Tracker["status"];
  trackerName?: string;
}

type TrackersUpdater = (updater: (prev: Tracker[]) => Tracker[]) => void;

export function useConfirmAction(
  trackers: Tracker[],
  updateTrackers: TrackersUpdater,
) {
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();

  const handleConfirm = useCallback(() => {
    if (!confirmAction) return;

    const action = confirmAction;

    startTransition(async () => {
      if (action.type === "delete") {
        await deleteTracker(action.trackerId);
        updateTrackers((prev) =>
          prev.filter((tr) => tr.id !== action.trackerId),
        );
      } else {
        const tracker = trackers.find((tr) => tr.id === action.trackerId);
        await pauseTracker(action.trackerId, tracker?.status ?? "active");
        updateTrackers((prev) =>
          prev.map((tr) =>
            tr.id === action.trackerId
              ? { ...tr, status: tr.status === "paused" ? "active" : "paused" }
              : tr,
          ),
        );
      }
      setConfirmAction(null);
    });
  }, [confirmAction, updateTrackers, trackers]);

  const onDelete = useCallback(
    (id: string) => {
      const tracker = trackers.find((tr) => tr.id === id);
      setConfirmAction({
        type: "delete",
        trackerId: id,
        trackerName: tracker?.name,
      });
    },
    [trackers],
  );

  const onPause = useCallback(
    (id: string) => {
      const tracker = trackers.find((tr) => tr.id === id);
      setConfirmAction({
        type: "pause",
        trackerId: id,
        trackerStatus: tracker?.status,
      });
    },
    [trackers],
  );

  return {
    confirmAction,
    setConfirmAction,
    handleConfirm,
    isPending,
    onDelete,
    onPause,
  };
}
