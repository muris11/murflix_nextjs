"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { useScrollLock, useDebounce } from "@/hooks";
import Icon from "@/components/ui/Icon";

interface Genre {
  id: number;
  name: string;
}

interface Country {
  iso_3166_1: string;
  english_name: string;
}

interface TMDBConfig {
  genres: Genre[];
  countries: Country[];
  years: number[];
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [config, setConfig] = useState<TMDBConfig | null>(null);
  const [dropdownSearch, setDropdownSearch] = useState("");
  const router = useRouter();
  const { profile, isAuthenticated, isAdmin, signOut, isLoading } = useAuth();
  
  // Use scroll lock hook for mobile menu
  useScrollLock(isMobileMenuOpen);
  
  // Debounce dropdown search for better performance
  const debouncedDropdownSearch = useDebounce(dropdownSearch, 150);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Instant Search Effect
  useEffect(() => {
    if (debouncedSearchQuery) {
      router.push(`/search?q=${encodeURIComponent(debouncedSearchQuery)}`);
    }
  }, [debouncedSearchQuery, router]);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch("/api/config");
        if (res.ok) {
          const data = await res.json();
          setConfig(data);
        }
      } catch (error) {
        console.error("Failed to fetch config:", error);
      }
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  const filterItems = useCallback(
    (items: { label: string; href: string }[], searchTerm: string) => {
      if (!searchTerm) return items.slice(0, 20);
      return items.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    []
  );

  // Use debounced search for filtering
  const getFilteredItems = useCallback(
    (items: { label: string; href: string }[], searchable: boolean) => {
      return searchable
        ? filterItems(items, debouncedDropdownSearch)
        : items;
    },
    [filterItems, debouncedDropdownSearch]
  );

  const genres = config?.genres || [];
  const countries = config?.countries || [];
  const years =
    config?.years ||
    Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

  const currentYear = new Date().getFullYear();

  const quickCategories = [
    { name: "Action", path: "/browse/genre/28" },
    { name: "Animation", path: "/browse/genre/16" },
    { name: "Horror", path: "/browse/genre/27" },
    { name: "Comedy", path: "/browse/genre/35" },
    { name: "Sci-Fi", path: "/browse/genre/878" },
    { name: "Romance", path: "/browse/genre/10749" },
    { name: "China", path: "/browse/country/CN" },
    { name: "India", path: "/browse/country/IN" },
    { name: "Japan", path: "/browse/country/JP" },
    { name: "Korea", path: "/browse/country/KR" },
    { name: "Thailand", path: "/browse/country/TH" },
    { name: "New & Popular", path: "/browse/new" },
    { name: "Movies", path: "/browse/movies" },
    { name: "TV Shows", path: "/browse/tv" },
    { name: `${currentYear}`, path: `/browse/year/${currentYear}` },
    { name: `${currentYear - 1}`, path: `/browse/year/${currentYear - 1}` },
  ];

  const dropdowns = [
    {
      label: "Genre",
      items: genres.map((g) => ({
        label: g.name,
        href: `/browse/genre/${g.id}`,
      })),
      searchable: true,
    },
    {
      label: "Browse",
      items: [
        { label: "All Movies", href: "/browse/movies" },
        { label: "All TV Shows", href: "/browse/tv" },
        { label: "New & Popular", href: "/browse/new" },
      ],
      searchable: false,
    },
    {
      label: "Country",
      items: countries.map((c) => ({
        label: c.english_name,
        href: `/browse/country/${c.iso_3166_1}`,
      })),
      searchable: true,
    },
    {
      label: "Year",
      items: years.map((y) => ({
        label: y.toString(),
        href: `/browse/year/${y}`,
      })),
      searchable: true,
    },
  ];

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled ? "bg-[#141414] shadow-md" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between transition-all duration-300">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex-shrink-0 group">
              <span className="text-2xl md:text-3xl font-bold text-primary tracking-widest transition-transform duration-300 group-hover:scale-105 block drop-shadow-md">
                MURFLIX
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {dropdowns.map((dropdown) => {
                const displayItems = dropdown.searchable
                  ? filterItems(dropdown.items, dropdownSearch)
                  : dropdown.items;

                return (
                  <div
                    key={dropdown.label}
                    className="relative group"
                    onMouseEnter={() => setDropdownSearch("")}
                  >
                    <button className="flex items-center space-x-1 text-sm font-medium text-[#e5e5e5] hover:text-[#b3b3b3] transition-colors py-4">
                      <span>{dropdown.label}</span>
                      <svg
                        className="h-3 w-3 transform group-hover:rotate-180 transition-transform duration-300 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute left-0 top-full hidden w-56 rounded bg-black/95 border-t-2 border-white p-0 shadow-2xl group-hover:block animate-in fade-in zoom-in-95 duration-200">
                      {dropdown.searchable && (
                        <div className="p-2 border-b border-gray-800">
                          <input
                            type="text"
                            className="w-full bg-[#333] rounded-sm px-2 py-1 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-white"
                            placeholder={`Search...`}
                            onChange={(e) => setDropdownSearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      )}
                      <div className="max-h-64 overflow-y-auto custom-scrollbar py-2">
                        {displayItems.length > 0 ? (
                          displayItems.map((item, idx) => (
                            <Link
                              key={`${item.href}-${idx}`}
                              href={item.href}
                              className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-[#333] hover:text-white transition-colors hover:underline"
                            >
                              {item.label}
                            </Link>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-sm text-gray-500">
                            No results
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Search Bar (Desktop) */}
            <div className="hidden md:block relative group">
              <form onSubmit={handleSearch} className="relative flex items-center">
                <svg
                  className={`h-6 w-6 text-white absolute left-2 transition-all duration-300 z-10 pointer-events-none ${searchQuery ? 'opacity-0' : 'opacity-100'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchQuery ? "" : "Titles, people, genres"}
                  className={`bg-black/50 border border-white/80 text-sm text-white focus:outline-none focus:bg-black/80 transition-all duration-300 h-9 px-9
                    ${searchQuery ? "w-64 pl-4 border-white" : "w-0 group-hover:w-64 focus:w-64 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer pl-10"}`}
                />
              </form>
            </div>

            {/* Profile / Auth */}
            {!isLoading && (
              <div className="relative">
                {isAuthenticated && profile ? (
                  <div
                    className="relative group"
                    onMouseEnter={() => setIsProfileOpen(true)}
                    onMouseLeave={() => setIsProfileOpen(false)}
                  >
                    <button className="flex items-center space-x-2 focus:outline-none">
                      <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-white font-bold text-sm">
                        {profile.full_name?.[0]?.toUpperCase() ||
                          profile.email[0].toUpperCase()}
                      </div>
                      <svg
                        className={`h-4 w-4 text-white transition-transform duration-200 ${
                          isProfileOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    <div
                      className={`absolute right-0 top-full mt-2 w-48 rounded-md bg-black/95 border border-white/10 shadow-xl backdrop-blur-md transition-all duration-200 ${
                        isProfileOpen
                          ? "opacity-100 translate-y-0 visible"
                          : "opacity-0 -translate-y-2 invisible"
                      }`}
                    >
                      <div className="p-3 border-b border-white/10">
                        <p className="text-sm font-medium text-white truncate">
                          {profile.full_name || "User"}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {profile.email}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Profil Saya
                        </Link>
                        <Link
                          href="/profile/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Pengaturan
                        </Link>
                        <Link
                          href="/my-list"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                          My List
                        </Link>
                        {isAdmin && (
                          <Link
                            href="/admin"
                            className="flex items-center px-4 py-2 text-sm text-amber-500 hover:bg-white/10 hover:text-amber-400 transition-colors"
                          >
                            <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Admin Panel
                          </Link>
                        )}
                      </div>
                      <div className="border-t border-white/10 py-1">
                        <button
                          onClick={handleSignOut}
                          className="flex w-full items-center px-4 py-2 text-sm text-red-500 hover:bg-white/10 hover:text-red-400 transition-colors"
                        >
                          <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="bg-primary text-white px-5 py-1.5 rounded text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Masuk
                  </Link>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-white p-2 -mr-2 rounded-md hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Icon name={isMobileMenuOpen ? "x" : "menu"} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Slide-in Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-[#141414] shadow-2xl transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-primary">
                MURFLIX
              </h2>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
              {/* Mobile User Info */}
              {isAuthenticated && profile && (
                <div className="mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      {profile.full_name?.[0]?.toUpperCase() || profile.email[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {profile.full_name || "User"}
                      </p>
                      <p className="text-xs text-gray-400 truncate max-w-[150px]">{profile.email}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href="/profile"
                      className="flex-1 text-center bg-white/10 hover:bg-white/20 text-sm text-white py-2 rounded transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profil
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex-1 text-center bg-white/10 hover:bg-red-500/20 text-sm text-red-500 py-2 rounded transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}

              {!isAuthenticated && (
                <Link
                  href="/login"
                  className="block w-full text-center bg-primary text-white py-3 rounded mb-6 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Masuk
                </Link>
              )}

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-white/50"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>

              {/* Mobile Links */}
              <div className="space-y-6">
                {dropdowns.map((dropdown) => (
                  <div key={dropdown.label}>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                      <span className="w-1 h-3 bg-primary mr-2 rounded-full"></span>
                      {dropdown.label}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {dropdown.items.slice(0, 16).map((item, idx) => (
                        <Link
                          key={`mobile-${item.href}-${idx}`}
                          href={item.href}
                          className="text-sm text-gray-300 hover:text-white truncate py-1"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                    <span className="w-1 h-3 bg-primary mr-2 rounded-full"></span>
                    Quick Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {quickCategories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.path}
                        className="text-xs bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-1 rounded-full transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
