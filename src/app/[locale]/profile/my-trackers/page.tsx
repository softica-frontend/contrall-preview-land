import { cookies } from "next/headers";
import type { ViewMode } from "./components/types";
import { MyTrackersClient } from "./my-trackers-client";

export default async function MyTrackersPage() {
  const cookieStore = await cookies();
  const stored = cookieStore.get("trackers-view-mode")?.value;
  const initialViewMode: ViewMode = stored === "list" ? "list" : "grid";

  return <MyTrackersClient initialViewMode={initialViewMode} />;
}
