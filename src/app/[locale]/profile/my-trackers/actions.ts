"use server";

import type { ApiResult } from "@/lib/api-client";
import { MOCK_TRACKERS } from "./components/mock-data";
import type { Tracker } from "./components/types";

export async function getTrackers(): Promise<Tracker[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // TODO: replace mock with real call
  // return apiFetch<Tracker[]>("/trackers");

  return MOCK_TRACKERS;
}

export async function createTracker(_data: {
  name: string;
  domain: string;
  plan: Tracker["plan"];
}): Promise<ApiResult<void>> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // TODO: replace mock with real call
  // return apiAction("POST", "/trackers", _data);

  return { ok: true, data: undefined };
}

export async function deleteTracker(_id: string): Promise<ApiResult<void>> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // TODO: replace mock with real call
  // return apiAction("DELETE", `/trackers/${_id}`);

  return { ok: true, data: undefined };
}

export async function pauseTracker(
  _id: string,
  currentStatus: Tracker["status"],
): Promise<ApiResult<{ status: Tracker["status"] }>> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newStatus = currentStatus === "paused" ? "active" : "paused";

  // TODO: replace mock with real call
  // return apiAction("PUT", `/trackers/${_id}/status`, { status: newStatus });

  return { ok: true, data: { status: newStatus } };
}
