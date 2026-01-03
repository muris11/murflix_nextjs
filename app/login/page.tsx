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

  // Floating label state
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

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
    <div className="relative flex min-h-screen w-full flex-col bg-black md:bg-transparent text-white">
      {/* Background Image (Desktop Only) */}
      <div
        className="absolute inset-0 z-[-1] hidden bg-cover bg-center md:block"
        style={{
          backgroundImage:
            "url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Header Logo */}
      <header className="absolute left-0 top-0 z-20 w-full px-4 py-4 md:px-12 md:py-6">
        <Link href="/" className="block w-fit">
          <h1 className="text-3xl md:text-5xl font-bold tracking-widest text-primary drop-shadow-lg transition-transform hover:scale-105">
            MURFLIX
          </h1>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-24 sm:px-6 lg:px-8 z-10">
        <div className="w-full max-w-[500px] rounded-xl bg-black/80 px-8 py-12 shadow-2xl backdrop-blur-md border border-white/10">
          <h1 className="mb-8 text-3xl font-bold text-white">Masuk</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="flex items-center rounded bg-[#e87c03] p-4 text-sm text-white shadow-md mb-4 animate-in fade-in slide-in-from-top-2">
                <svg
                  className="mr-3 h-5 w-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                {errorMessage}
              </div>
            )}

            <div className="relative group">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="peer block w-full rounded bg-[#333]/80 px-5 pb-2 pt-6 text-white placeholder-transparent focus:bg-[#454545] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all border border-transparent focus:border-primary/50"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className={`absolute left-5 top-4 z-10 origin-[0] transform text-base text-[#8c8c8c] duration-150 ease-out pointer-events-none
                  ${
                    email || emailFocused
                      ? "-translate-y-3 scale-75"
                      : "translate-y-0 scale-100"
                  }`}
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
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="peer block w-full rounded bg-[#333]/80 px-5 pb-2 pt-6 text-white placeholder-transparent focus:bg-[#454545] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all border border-transparent focus:border-primary/50"
                placeholder=" "
                required
                minLength={6}
              />
              <label
                htmlFor="password"
                className={`absolute left-5 top-4 z-10 origin-[0] transform text-base text-[#8c8c8c] duration-150 ease-out pointer-events-none
                  ${
                    password || passwordFocused
                      ? "-translate-y-3 scale-75"
                      : "translate-y-0 scale-100"
                  }`}
              >
                Password
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 w-full rounded bg-primary py-3.5 text-base font-bold text-white transition-all hover:bg-red-700 hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 shadow-lg shadow-red-900/20"
            >
              {isSubmitting ? "Memproses..." : "Masuk"}
            </button>

            <div className="flex items-center justify-between text-[13px] text-[#b3b3b3] mt-2">
              <label className="flex items-center space-x-1 cursor-pointer hover:text-white transition-colors">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded-sm border-gray-600 bg-[#737373] text-white focus:ring-0 checked:bg-gray-500 checked:border-transparent"
                />
                <span>Ingat saya</span>
              </label>
              <Link href="/help" className="hover:underline hover:text-white transition-colors">
                Butuh bantuan?
              </Link>
            </div>
          </form>

          <div className="mt-10 border-t border-white/10 pt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold text-sm">Paket Premium Murah</h3>
              <span className="text-[10px] bg-white/10 text-gray-300 px-2 py-0.5 rounded-full border border-white/5">Anti-Ribet</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {/* Card 1 */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 p-3 rounded-xl border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg group">
                <p className="text-gray-400 text-xs mb-1">1 Bulan</p>
                <p className="text-white font-bold text-lg group-hover:text-primary transition-colors">Rp10.000</p>
              </div>

              {/* Card 2 */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 p-3 rounded-xl border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg group relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-600 text-[9px] font-bold px-2 py-0.5 rounded-bl-lg text-white">Hemat 1rb</div>
                <p className="text-gray-400 text-xs mb-1">3 Bulan</p>
                <p className="text-white font-bold text-lg group-hover:text-primary transition-colors">Rp29.000</p>
              </div>

              {/* Card 3 */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 p-3 rounded-xl border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg group relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-600 text-[9px] font-bold px-2 py-0.5 rounded-bl-lg text-white">Hemat 5rb</div>
                <p className="text-gray-400 text-xs mb-1">6 Bulan</p>
                <p className="text-white font-bold text-lg group-hover:text-primary transition-colors">Rp55.000</p>
              </div>

              {/* Card 4 - Best Value */}
              <div className="bg-gradient-to-br from-primary/20 to-black p-3 rounded-xl border border-primary/30 hover:border-primary transition-all hover:-translate-y-1 hover:shadow-lg group relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-[9px] font-bold px-2 py-0.5 rounded-bl-lg text-white">Best Deal</div>
                <p className="text-gray-300 text-xs mb-1">12 Bulan</p>
                <p className="text-white font-bold text-lg group-hover:text-primary transition-colors">Rp105.000</p>
                <p className="text-[10px] text-green-400 font-medium mt-1">Hemat Rp15.000</p>
              </div>
            </div>

            <a
              href="https://wa.me/6285773818846?text=Halo%20Admin%20Murflix%2C%20saya%20mau%20beli%20paket%20premium"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-green-500/20 hover:scale-[1.02] group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <svg className="w-6 h-6 mr-2 fill-current relative z-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="relative z-10">Beli Paket via WhatsApp</span>
            </a>
            
            <p className="text-center text-[11px] text-gray-500 mt-4">
              Pembayaran aman & proses cepat langsung dengan Admin.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-black/80 backdrop-blur px-4 py-8 text-[#737373] md:px-12 border-t border-white/5">
        <div className="mx-auto max-w-[1000px]">
          <p className="mb-6 hover:underline cursor-pointer">
            Questions? Call 1-800-MURFLIX
          </p>
          <div className="grid grid-cols-2 gap-4 text-[13px] sm:grid-cols-4">
            <Link href="/faq" className="hover:underline">
              FAQ
            </Link>
            <Link href="/help" className="hover:underline">
              Help Center
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Use
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/cookies" className="hover:underline">
              Cookie Preferences
            </Link>
            <Link href="/corporate" className="hover:underline">
              Corporate Information
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
