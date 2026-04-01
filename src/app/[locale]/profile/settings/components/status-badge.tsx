const STATUS_STYLES: Record<string, { bg: string; dot: string; text: string }> =
  {
    completed: {
      bg: "bg-[rgba(68,186,62,0.1)]",
      dot: "bg-[#44BA3E]",
      text: "text-[#44BA3E]",
    },
    in_progress: {
      bg: "bg-[rgba(218,152,30,0.1)]",
      dot: "bg-[#DA981E]",
      text: "text-[#DA981E]",
    },
    cancelled: {
      bg: "bg-[rgba(218,30,40,0.1)]",
      dot: "bg-[#DA1E28]",
      text: "text-[#DA1E28]",
    },
    on_hold: {
      bg: "bg-[rgba(68,186,62,0.1)]",
      dot: "bg-[#44BA3E]",
      text: "text-[#44BA3E]",
    },
    scheduled: {
      bg: "bg-[rgba(218,152,30,0.1)]",
      dot: "bg-[#DA981E]",
      text: "text-[#DA981E]",
    },
    acknowledged: {
      bg: "bg-[rgba(218,152,30,0.1)]",
      dot: "bg-[#DA981E]",
      text: "text-[#DA981E]",
    },
    resolved: {
      bg: "bg-[rgba(68,186,62,0.1)]",
      dot: "bg-[#44BA3E]",
      text: "text-[#44BA3E]",
    },
    not_found: {
      bg: "bg-[rgba(218,30,40,0.1)]",
      dot: "bg-[#DA1E28]",
      text: "text-[#DA1E28]",
    },
    awaiting_feedback: {
      bg: "bg-[rgba(218,152,30,0.1)]",
      dot: "bg-[#DA981E]",
      text: "text-[#DA981E]",
    },
  };

interface StatusBadgeProps {
  status: string;
  statusKey: string;
}

export function StatusBadge({ status, statusKey }: StatusBadgeProps) {
  const style = STATUS_STYLES[statusKey];
  if (!style) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-[14px] font-medium leading-5 tracking-[0.5px] ${style.bg} ${style.text}`}
    >
      <span className={`size-1.5 rounded-[29px] ${style.dot}`} />
      {status}
    </span>
  );
}
