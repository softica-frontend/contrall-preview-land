import { useCallback, useState } from "react";
import type { Tracker } from "../components/types";

interface ConfirmAction {
  type: "delete" | "pause";
  trackerId: string;
  trackerStatus?: Tracker["status"];
  trackerName?: string;
}

export function useConfirmAction(
  trackers: Tracker[],
  setTrackers: React.Dispatch<React.SetStateAction<Tracker[]>>,
) {
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(
    null,
  );

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
  }, [confirmAction, setTrackers]);

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

  return { confirmAction, setConfirmAction, handleConfirm, onDelete, onPause };
}
