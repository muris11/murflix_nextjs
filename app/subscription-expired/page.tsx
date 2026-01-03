import Link from "next/link";

export default function SubscriptionExpiredPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#141414] px-4 text-center text-white">
      <div className="max-w-md w-full space-y-8 bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-900/30 ring-1 ring-red-500/50">
          <svg
            className="h-10 w-10 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Langganan Berakhir
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Masa aktif akun Murflix Anda telah habis. Silakan hubungi
            administrator untuk memperpanjang langganan dan kembali menikmati
            konten favorit Anda.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/help"
            className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 font-bold text-white transition-all hover:bg-red-700 shadow-lg shadow-red-900/20"
          >
            Hubungi Admin
          </Link>

          <Link
            href="/login"
            className="flex w-full items-center justify-center rounded-lg border border-gray-700 bg-transparent px-4 py-3 font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
          >
            Login dengan Akun Lain
          </Link>
        </div>

        {/* Info Box */}
        <div className="rounded-lg bg-gray-800/50 p-4 text-sm text-gray-400 border border-gray-700/50">
          <p>
            <span className="font-semibold text-white">Info:</span> Jika
            Anda baru saja memperpanjang langganan, coba logout dan login
            kembali untuk memperbarui status akun.
          </p>
        </div>
      </div>
    </div>
  );
}
