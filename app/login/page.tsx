"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

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
    <div className="relative min-h-screen w-full flex flex-col bg-black text-white font-sans">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden hidden md:block">
        <Image
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="Background"
          fill
          className="object-cover opacity-50"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full px-4 py-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="block">
          <h1 className="text-3xl md:text-4xl font-bold text-primary tracking-wide drop-shadow-md">
            MURFLIX
          </h1>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-[500px] bg-black/80 backdrop-blur-md rounded-xl p-8 md:p-12 border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-3xl font-bold mb-8 text-white">Masuk</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <div className="bg-[#e87c03] p-4 rounded text-sm text-white flex items-start space-x-2 animate-in fade-in slide-in-from-top-2">
                 <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                 <span>{errorMessage}</span>
              </div>
            )}

            <div className="relative group">
              <input
                type="email"
                id="email"
                className={`peer block w-full rounded bg-[#333]/80 px-5 pb-2.5 pt-6 text-white focus:bg-[#454545] focus:outline-none focus:ring-0 border-b-2 border-transparent focus:border-[#e50914] transition-all duration-300 placeholder-transparent`}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                required
              />
              <label
                htmlFor="email"
                className={`absolute left-5 top-4 text-[#8c8c8c] text-base transition-all duration-300 pointer-events-none origin-[0]
                  ${email || emailFocused ? "-translate-y-3 scale-75 text-gray-400" : "translate-y-0 scale-100 group-hover:text-gray-300"}`}
              >
                Email or phone number
              </label>
            </div>

            <div className="relative group">
              <input
                type="password"
                id="password"
                className={`peer block w-full rounded bg-[#333]/80 px-5 pb-2.5 pt-6 text-white focus:bg-[#454545] focus:outline-none focus:ring-0 border-b-2 border-transparent focus:border-[#e50914] transition-all duration-300 placeholder-transparent`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                required
                minLength={6}
              />
              <label
                htmlFor="password"
                className={`absolute left-5 top-4 text-[#8c8c8c] text-base transition-all duration-300 pointer-events-none origin-[0]
                  ${password || passwordFocused ? "-translate-y-3 scale-75 text-gray-400" : "translate-y-0 scale-100 group-hover:text-gray-300"}`}
              >
                Password
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#e50914] hover:bg-[#f40612] text-white font-bold py-3.5 rounded-md transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-8 shadow-lg shadow-red-900/20"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Memproses...
                </div>
              ) : (
                "Masuk"
              )}
            </button>

            <div className="flex items-center justify-between text-[#b3b3b3] text-sm font-medium">
              <label className="flex items-center space-x-2 cursor-pointer hover:text-white transition-colors group">
                <div className="relative">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="w-4 h-4 rounded bg-[#333] border border-gray-600 peer-checked:bg-[#737373] peer-checked:border-[#737373] transition-colors" />
                  <svg className="w-3 h-3 text-black absolute top-0.5 left-0.5 opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="group-hover:text-gray-300">Ingat saya</span>
              </label>
              <Link href="/help" className="hover:underline hover:text-white transition-colors">Butuh bantuan?</Link>
            </div>
          </form>

          {/* Pricing Section */}
          <div className="mt-10 border-t border-white/10 pt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold text-sm">Paket Premium Murah</h3>
              <span className="text-[10px] bg-red-600/20 text-red-400 px-2 py-0.5 rounded-full border border-red-600/30 animate-pulse">PROMO 🔥</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {/* Card 1 Month */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 p-3 rounded-xl border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg group">
                <p className="text-gray-400 text-xs mb-1">1 Bulan</p>
                <div className="flex items-end gap-1">
                  <p className="text-white font-bold text-lg group-hover:text-primary transition-colors">Rp 5.000</p>
                </div>
              </div>

              {/* Card 3 Months */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 p-3 rounded-xl border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg group relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-600 text-[9px] font-bold px-2 py-0.5 rounded-bl-lg text-white">Hemat 2K</div>
                <p className="text-gray-400 text-xs mb-1">3 Bulan</p>
                <div className="flex flex-col">
                   <p className="text-gray-500 text-[10px] line-through decoration-red-500">Rp 15.000</p>
                   <p className="text-white font-bold text-lg group-hover:text-primary transition-colors">Rp 13.000</p>
                </div>
              </div>

              {/* Card 6 Months */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 p-3 rounded-xl border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg group relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-600 text-[9px] font-bold px-2 py-0.5 rounded-bl-lg text-white">Hemat 5K</div>
                <p className="text-gray-400 text-xs mb-1">6 Bulan</p>
                <div className="flex flex-col">
                   <p className="text-gray-500 text-[10px] line-through decoration-red-500">Rp 30.000</p>
                   <p className="text-white font-bold text-lg group-hover:text-primary transition-colors">Rp 25.000</p>
                </div>
              </div>

              {/* Card 1 Year - Best Deal */}
              <div className="bg-gradient-to-br from-primary/20 to-black p-3 rounded-xl border border-primary/30 hover:border-primary transition-all hover:-translate-y-1 hover:shadow-lg group relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-[9px] font-bold px-2 py-0.5 rounded-bl-lg text-white">Hemat 15K</div>
                <p className="text-gray-300 text-xs mb-1">1 Tahun</p>
                <div className="flex flex-col">
                   <p className="text-gray-400 text-[10px] line-through decoration-white/50">Rp 60.000</p>
                   <p className="text-white font-bold text-lg group-hover:text-primary transition-colors">Rp 45.000</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/6285773818846?text=Halo%20Admin%20Murflix%2C%20saya%20tertarik%20beli%20paket%20premium%20promo%20ini"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-green-500/20 hover:scale-[1.02] group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <svg className="w-5 h-5 mr-2 fill-current relative z-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="relative z-10">Beli Akun via WhatsApp</span>
            </a>
            
            <p className="text-center text-[10px] text-gray-500 mt-4 leading-tight">
              Pembayaran via Transfer / E-Wallet. Proses cepat. <br/>Hubungi Admin untuk info lebih lanjut.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-black/80 px-4 py-8 md:px-12 md:py-16 text-[#737373] text-[13px]">
        <div className="max-w-[1000px] mx-auto">
          <p className="mb-6 hover:underline cursor-pointer">Questions? Call +62-857-7381-8846</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <Link href="#" className="hover:underline">FAQ</Link>
            <Link href="#" className="hover:underline">Help Center</Link>
            <Link href="#" className="hover:underline">Terms of Use</Link>
            <Link href="#" className="hover:underline">Privacy</Link>
            <Link href="#" className="hover:underline">Cookie Preferences</Link>
            <Link href="#" className="hover:underline">Corporate Information</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
