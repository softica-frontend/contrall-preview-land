interface SettingsActionButtonsProps {
  cancelLabel: string;
  saveLabel: string;
  onCancel: () => void;
  onSave: () => void;
  disabled?: boolean;
}

export function SettingsActionButtons({
  cancelLabel,
  saveLabel,
  onCancel,
  onSave,
  disabled = false,
}: SettingsActionButtonsProps) {
  return (
    <div className="flex items-center justify-end gap-1 overflow-hidden px-1 py-3">
      <button
        type="button"
        onClick={onCancel}
        className="flex h-8 cursor-pointer items-center justify-center rounded-[40px] px-2.5 py-1 font-roboto text-[14px] font-medium tracking-[0.5px] text-[#667085] transition-opacity hover:opacity-70"
      >
        {cancelLabel}
      </button>
      <button
        type="button"
        onClick={onSave}
        disabled={disabled}
        className="flex h-8 items-center justify-center rounded-[1000px] bg-[#2575FF] px-2.5 py-1 font-roboto text-[14px] font-medium tracking-[0.5px] text-[#FCFCFD] transition-colors enabled:cursor-pointer enabled:hover:bg-[#1a63e0] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saveLabel}
      </button>
    </div>
  );
}
