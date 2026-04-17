import Skeleton from "react-loading-skeleton";

export function TrackerCardSkeleton() {
  return (
    <div
      className="relative flex h-[268px] overflow-hidden rounded-[21px]"
      style={{ border: "1px solid #E4E7EC", background: "#FCFCFD" }}
    >
      {/* Left accent bar */}
      <div
        className="w-2 shrink-0 self-stretch"
        style={{ backgroundColor: "#EAECF0" }}
      />

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col px-4 pt-4">
        {/* Top section — grows */}
        <div className="flex flex-1 flex-col gap-1 overflow-hidden">
          {/* IP row */}
          <div className="flex items-center gap-2">
            <Skeleton width={24} height={18} borderRadius={2} />
            <Skeleton width={120} height={20} borderRadius={4} />
          </div>

          {/* Name + status */}
          <div className="flex items-center justify-between gap-2">
            <Skeleton width={110} height={35} borderRadius={4} />
            <Skeleton width={72} height={24} borderRadius={100} />
          </div>

          {/* Description — fills remaining space */}
          <div className="mt-1 flex-1 overflow-hidden">
            <Skeleton height={16} borderRadius={4} className="mb-1" />
            <Skeleton height={16} borderRadius={4} className="mb-1" />
            <Skeleton height={16} width="65%" borderRadius={4} />
          </div>
        </div>

        {/* Footer — pinned to bottom with border-t */}
        <div className="flex items-center gap-1.5 border-t border-border-light py-3">
          <Skeleton width={16} height={16} borderRadius={2} />
          <Skeleton width={70} height={16} borderRadius={4} />
        </div>
      </div>
    </div>
  );
}
