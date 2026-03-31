import { GLASS_BG } from "./glass-bg";

/** Placeholder card — decorative edge cards */
export function PlaceholderCard() {
  return (
    <div
      className="isolate h-full w-full overflow-hidden rounded-[32px]"
      style={GLASS_BG}
    >
      <div className="flex h-full flex-col justify-end p-[24px]"></div>
    </div>
  );
}
