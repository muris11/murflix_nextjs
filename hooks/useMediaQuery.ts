"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * SSR-safe media query hook
 * Returns false during SSR and updates on client
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  const handleChange = useCallback((e: MediaQueryListEvent | MediaQueryList) => {
    setMatches(e.matches);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);

    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }
    
    // Legacy browsers (Safari < 14)
    media.addListener(handleChange);
    return () => media.removeListener(handleChange);
  }, [query, handleChange]);

  return matches;
}

// Predefined breakpoint hooks matching Tailwind defaults
export function useIsMobile(): boolean {
  return !useMediaQuery("(min-width: 640px)");
}

export function useIsTablet(): boolean {
  return useMediaQuery("(min-width: 640px)") && !useMediaQuery("(min-width: 1024px)");
}

export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}

export function useIsTouchDevice(): boolean {
  return useMediaQuery("(hover: none) and (pointer: coarse)");
}

// Tailwind breakpoints
export const breakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
} as const;
