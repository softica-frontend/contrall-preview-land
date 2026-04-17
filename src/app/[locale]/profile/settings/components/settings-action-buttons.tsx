import { Spinner } from "@/components/ui/spinner";

interface SettingsActionButtonsProps {
  cancelLabel: string;
  saveLabel: string;
  onCancel: () => void;
  onSave: () => void;
  disabled?: boolean;
  isPending?: boolean;
}

export function SettingsActionButtons({
  cancelLabel,
  saveLabel,
  onCancel,
  onSave,
  disabled = false,
  isPending = false,
}: SettingsActionButtonsProps) {
  return (
    <div className="flex items-center justify-end gap-1 overflow-hidden px-1 py-3">
      <button
        type="button"
        onClick={onCancel}
        disabled={isPending}
        className="flex h-8 cursor-pointer items-center justify-center rounded-[40px] px-2.5 py-1 font-roboto text-[14px] font-medium tracking-[0.5px] text-text-subtle transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {cancelLabel}
      </button>
      <button
        type="button"
        onClick={onSave}
        disabled={disabled || isPending}
        className="flex h-8 min-w-[64px] items-center justify-center gap-2 rounded-[1000px] bg-primary px-2.5 py-1 font-roboto text-[14px] font-medium tracking-[0.5px] text-surface transition-colors enabled:cursor-pointer enabled:hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? <Spinner size={14} /> : saveLabel}
      </button>
    </div>
  );
}
