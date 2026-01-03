/**
 * Route constants for navigation
 */

// Public routes that don't require authentication
export const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/about",
  "/contact",
  "/faq",
  "/help",
  "/privacy",
  "/terms",
  "/cookies",
  "/corporate",
] as const;

// Main navigation links
export const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/browse/tv", label: "Serial TV" },
  { href: "/browse/movies", label: "Film" },
  { href: "/browse/new", label: "Baru & Populer" },
  { href: "/my-list", label: "Daftar Saya" },
] as const;

// Footer links organized by section
export const FOOTER_LINKS = {
  company: [
    { href: "/about", label: "Tentang Kami" },
    { href: "/corporate", label: "Hubungan Investor" },
    { href: "/media", label: "Media Center" },
  ],
  support: [
    { href: "/faq", label: "FAQ" },
    { href: "/help", label: "Pusat Bantuan" },
    { href: "/contact", label: "Hubungi Kami" },
  ],
  legal: [
    { href: "/terms", label: "Ketentuan Penggunaan" },
    { href: "/privacy", label: "Privasi" },
    { href: "/cookies", label: "Preferensi Cookie" },
  ],
} as const;

// Browse categories
export const BROWSE_CATEGORIES = [
  { href: "/browse/movies", label: "Film", icon: "film" },
  { href: "/browse/tv", label: "Serial TV", icon: "tv" },
  { href: "/browse/new", label: "Baru Dirilis", icon: "sparkles" },
] as const;
