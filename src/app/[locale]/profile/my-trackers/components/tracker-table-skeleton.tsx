import Skeleton from "react-loading-skeleton";

const COL = {
  name: "min-w-[140px] flex-1",
  team: "w-[120px] shrink-0",
  nextBilling: "w-[170px] shrink-0",
  plan: "w-[160px] shrink-0",
  status: "w-[140px] shrink-0",
  actions: "w-[80px] shrink-0",
} as const;

const SKELETON_COLS: { key: keyof typeof COL; width: number }[] = [
  { key: "name", width: 120 },
  { key: "team", width: 60 },
  { key: "nextBilling", width: 100 },
  { key: "plan", width: 80 },
  { key: "status", width: 72 },
  { key: "actions", width: 24 },
];

function SkeletonRow() {
  return (
    <div className="flex h-[48px] min-w-[810px] border-b border-border-light">
      {SKELETON_COLS.map(({ key, width }) => (
        <div key={key} className={`flex items-center p-2 ${COL[key]}`}>
          <Skeleton width={width} height={16} borderRadius={4} />
        </div>
      ))}
    </div>
  );
}

export function TrackerTableSkeleton() {
  return (
    <div className="w-full overflow-x-auto pt-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  );
}
