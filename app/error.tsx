'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#141414] text-center px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 shadow-2xl backdrop-blur-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-900/20 mb-6">
            <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-gray-400 mb-8">
            We encountered an unexpected error. Don&apos;t worry, you can try refreshing the page.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => reset()}
              className="flex-1 rounded-md bg-white px-4 py-3 text-sm font-bold text-black transition-colors hover:bg-gray-200"
            >
              Try Again
            </button>
            <a
              href="/"
              className="flex-1 rounded-md bg-gray-800 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-700 border border-gray-700"
            >
              Go Home
            </a>
          </div>
        </div>
        
        {error.digest && (
          <p className="text-xs text-gray-600 font-mono">
            Error Code: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
