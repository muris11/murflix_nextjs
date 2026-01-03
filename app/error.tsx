'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    // In production, you would send this to Sentry, LogRocket, etc.
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-background text-center px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="bg-card p-8 rounded-2xl border border-border shadow-2xl backdrop-blur-sm">
          {/* Error Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-900/20 mb-6">
            <svg 
              className="h-8 w-8 text-primary" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">
            Terjadi Kesalahan
          </h2>
          <p className="text-muted-foreground mb-8">
            Kami mengalami error yang tidak terduga. Jangan khawatir, coba refresh halaman ini.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => reset()}
              className="btn-primary flex-1"
            >
              Coba Lagi
            </button>
            <Link
              href="/"
              className="btn-secondary flex-1 text-center"
            >
              Ke Beranda
            </Link>
          </div>
        </div>
        
        {/* Error digest for debugging */}
        {error.digest && (
          <p className="text-xs text-muted font-mono">
            Kode Error: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
