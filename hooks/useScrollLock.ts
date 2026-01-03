"use client";

import { useEffect } from "react";

/**
 * Lock body scroll when modal/drawer is open
 * Prevents background scrolling on mobile
 */
export function useScrollLock(lock: boolean): void {
  useEffect(() => {
    if (!lock) return;

    // Save current scroll position and body style
    const scrollY = window.scrollY;
    const originalStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    // Lock scroll
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      // Restore original style
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.position = originalStyle.position;
      document.body.style.top = originalStyle.top;
      document.body.style.width = originalStyle.width;
      
      // Restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, [lock]);
}
