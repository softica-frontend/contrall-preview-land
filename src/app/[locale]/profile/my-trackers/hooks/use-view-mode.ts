"use client";

import { useState } from "react";
import type { ViewMode } from "../components/types";

const COOKIE_NAME = "trackers-view-mode";
const ONE_YEAR = 60 * 60 * 24 * 365;

function setViewModeCookie(mode: ViewMode) {
  // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API has insufficient browser support
  document.cookie = `${COOKIE_NAME}=${mode}; path=/; max-age=${ONE_YEAR}; SameSite=Lax`;
}

export function useViewMode(initialMode: ViewMode) {
  const [viewMode, setViewMode] = useState<ViewMode>(initialMode);

  const handleChange = (mode: ViewMode) => {
    setViewMode(mode);
    setViewModeCookie(mode);
  };

  return [viewMode, handleChange] as const;
}
