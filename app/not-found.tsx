import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#141414] text-center text-white">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-3xl font-semibold">Lost in Space?</h2>
      <p className="mt-4 max-w-md text-gray-400">
        We can&apos;t find that page. You&apos;ll find lots to explore on the home page.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-white px-6 py-3 font-bold text-black transition-colors hover:bg-gray-200"
      >
        Back to Home
      </Link>
    </div>
  );
}
