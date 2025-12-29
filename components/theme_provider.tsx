"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme: "dark"; // Always dark mode
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const applyTheme = () => {
  const html = document.documentElement;
  html.classList.add("dark");
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Apply dark theme to DOM on mount
  useEffect(() => {
    applyTheme();
  }, []);

  // Mark as mounted once on initial mount
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "dark" }}>
      {mounted ? children : null}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
