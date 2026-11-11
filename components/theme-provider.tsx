"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type ThemeContextValue = {
  dark: boolean;
  ready: boolean;
  onChange: (dark: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const initialDark = root.dataset.theme === "dark";
    root.classList.toggle("dark", initialDark);
    setDark(initialDark);
    setReady(true);
  }, []);

  const onChange = useCallback((nextDark: boolean) => {
    setDark(nextDark);
    const root = document.documentElement;
    root.dataset.theme = nextDark ? "dark" : "light";
    root.classList.toggle("dark", nextDark);
    try {
      window.localStorage.setItem("regalien-theme", nextDark ? "dark" : "light");
    } catch {
      // Keep the in-memory theme working when storage is unavailable.
    }
  }, []);

  return <ThemeContext.Provider value={{ dark, ready, onChange }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
