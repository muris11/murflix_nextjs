"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export default function VideoPlayerModal({
  isOpen,
  onClose,
  videoUrl,
}: VideoPlayerModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Force reset loading state when opening
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Fallback: Force remove loading spinner after 2 seconds
      // This prevents infinite loading if iframe onLoad is blocked or slow
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, videoUrl]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      onClick={handleClose}
    >
      {/* Close Button - Enhanced for Touch */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-[10000] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all transform hover:scale-110 active:scale-95"
        aria-label="Close player"
      >
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div
        className="relative w-full max-w-7xl aspect-video bg-black rounded-xl shadow-2xl overflow-hidden mx-4 ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-[105] pointer-events-none bg-black">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Video Player */}
        <iframe
          src={videoUrl}
          className={`w-full h-full relative z-[106] transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>,
    document.body
  );
}
