"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn, isAuthenticated, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramError =
    searchParams.get("error") === "account_disabled"
      ? "Akun Anda telah dinonaktifkan. Silakan hubungi administrator."
      : null;
  const errorMessage = formError || paramError;

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [isAuthenticated, isAdmin, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    try {
      const result = await signIn(email, password);

      if (result.error) {
        setFormError(
          result.error === "Invalid login credentials"
            ? "Email atau password salah"
            : result.error
        );
        setIsSubmitting(false);
        return;
      }
    } catch {
      setFormError("Terjadi kesalahan. Silakan coba lagi.");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-black md:bg-transparent">
      {/* Background Image (Desktop Only) */}
      <div 
        className="absolute inset-0 z-[-1] hidden bg-cover bg-center md:block opacity-50"
        style={{
          backgroundImage: "url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 md:bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      {/* Header Logo */}
      <header className="absolute left-0 top-0 z-10 w-full px-4 py-4 md:px-12 md:py-6">
        <Link href="/" className="block w-fit">
          <h1 className="text-4xl font-bold tracking-widest text-primary drop-shadow-lg">
            MURFLIX
          </h1>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-lg bg-black/75 px-6 py-12 shadow-2xl backdrop-blur-sm sm:px-12 md:mt-16 md:min-h-[550px]">
          <h1 className="mb-8 text-3xl font-bold text-white">Masuk</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <div className="flex items-center rounded bg-[#e87c03] p-3 text-sm text-white shadow-md">
                <svg className="mr-2 h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {errorMessage}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer block w-full rounded-md bg-[#333] px-4 pb-2 pt-6 text-white placeholder-transparent focus:bg-[#454545] focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Email"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-gray-400 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75"
                >
                  Email
                </label>
              </div>

              <div className="relative group">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer block w-full rounded-md bg-[#333] px-4 pb-2 pt-6 text-white placeholder-transparent focus:bg-[#454545] focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Password"
                  required
                  minLength={6}
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-gray-400 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75"
                >
                  Password
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-primary py-3.5 text-base font-bold text-white transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Memproses..." : "Masuk"}
            </button>

            <div className="flex items-center justify-between text-sm text-gray-400">
              <label className="flex items-center space-x-2 cursor-pointer hover:text-gray-300">
                <input type="checkbox" className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-primary focus:ring-primary" />
                <span>Ingat saya</span>
              </label>
              <Link href="/help" className="hover:underline hover:text-gray-300">
                Butuh bantuan?
              </Link>
            </div>
          </form>

          <div className="mt-16 text-gray-400">
            <p className="mb-4">
              Baru di Murflix?{" "}
              <Link href="/" className="font-medium text-white hover:underline">
                Daftar sekarang
              </Link>
              .
            </p>
            <p className="text-xs leading-tight">
              Halaman ini dilindungi oleh Google reCAPTCHA untuk memastikan Anda bukan bot.{" "}
              <span className="cursor-pointer text-blue-500 hover:underline">Pelajari selengkapnya</span>.
            </p>
          </div>
        </div>
      </main>

      {/* Simple Footer for Login Page */}
      <footer className="relative z-10 w-full bg-black/75 px-4 py-8 text-white/50 md:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-6 hover:underline cursor-pointer">Pertanyaan? Hubungi kami.</p>
          <div className="grid grid-cols-2 gap-4 text-xs sm:grid-cols-4">
            <Link href="/faq" className="hover:underline">FAQ</Link>
            <Link href="/help" className="hover:underline">Pusat Bantuan</Link>
            <Link href="/terms" className="hover:underline">Ketentuan Penggunaan</Link>
            <Link href="/privacy" className="hover:underline">Privasi</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
