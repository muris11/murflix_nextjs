import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#141414] text-center text-white overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-[#141414] to-[#141414] z-0" />
      
      <div className="relative z-10 px-4">
        <h1 className="text-9xl font-black text-primary drop-shadow-2xl animate-pulse-subtle">404</h1>
        <h2 className="mt-8 text-3xl md:text-4xl font-bold">Tersesat di Angkasa?</h2>
        <p className="mt-4 max-w-lg mx-auto text-gray-400 text-lg">
          Maaf, kami tidak dapat menemukan halaman yang Anda cari. Anda akan menemukan banyak tontonan menarik di halaman utama.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block rounded-md bg-white px-8 py-3.5 font-bold text-black transition-all hover:bg-gray-200 hover:scale-105 shadow-lg shadow-white/10"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
