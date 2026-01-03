'use client';

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#141414] text-white antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-bold mb-4 text-primary">System Error</h1>
          <p className="text-xl text-gray-400 mb-8">A critical error occurred.</p>
          <button
            onClick={() => reset()}
            className="rounded-md bg-white px-6 py-3 font-bold text-black hover:bg-gray-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
