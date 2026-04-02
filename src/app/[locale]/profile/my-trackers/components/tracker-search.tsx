"use client";

import { useEffect, useRef } from "react";
import { CloseIcon, SearchIcon } from "@/components/icons/profile-icons";

interface TrackerSearchProps {
  open: boolean;
  query: string;
  placeholder: string;
  onOpenChange: (open: boolean) => void;
  onQueryChange: (query: string) => void;
}

export function TrackerSearch({
  open,
  query,
  placeholder,
  onOpenChange,
  onQueryChange,
}: TrackerSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleClose = () => {
    onOpenChange(false);
    onQueryChange("");
  };

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={() => onOpenChange(true)}
        className="flex size-14 cursor-pointer items-center justify-center rounded-full text-[#667085] transition-colors duration-200 hover:text-[#0C111D]"
        aria-label={placeholder}
        style={{
          opacity: open ? 0 : 1,
          pointerEvents: open ? "none" : "auto",
          position: open ? "absolute" : "relative",
        }}
      >
        <SearchIcon size={24} />
      </button>
      <div
        className="flex h-10 items-center gap-2 overflow-hidden rounded-full border bg-white px-4 transition-all duration-300 ease-out"
        style={{
          width: open ? 240 : 0,
          opacity: open ? 1 : 0,
          borderColor: open ? "#D0D5DD" : "transparent",
          padding: open ? undefined : "0",
        }}
      >
        <SearchIcon size={24} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-w-0 bg-transparent text-[14px] text-[#0C111D] outline-none placeholder:text-[#98A2B3]"
          tabIndex={open ? 0 : -1}
        />
        <button
          type="button"
          onClick={handleClose}
          className="shrink-0 cursor-pointer text-[#98A2B3] transition-colors duration-150 hover:text-[#0C111D]"
          tabIndex={open ? 0 : -1}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
