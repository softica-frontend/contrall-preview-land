"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import { useMobileHeaderVisibility } from "@/hooks/use-mobile-header-visibility";

interface HeaderContextValue {
  activeSection: string;
  mobileMenuOpen: boolean;
  mobileVisible: boolean;
  toggleMenu: () => void;
}

const HeaderContext = createContext<HeaderContextValue | null>(null);

export function useHeaderContext() {
  const ctx = useContext(HeaderContext);
  if (!ctx) throw new Error("useHeaderContext must be used within HeaderProvider");
  return ctx;
}

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const mobileVisible = useMobileHeaderVisibility(mobileMenuOpen);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <HeaderContext value={{ activeSection, mobileMenuOpen, mobileVisible, toggleMenu }}>
      {children}
    </HeaderContext>
  );
}
