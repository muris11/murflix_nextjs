"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function MobileNav() {
  const pathname = usePathname();
  const { profile } = useAuth();

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: (active: boolean) => (
        <svg
          className={`w-6 h-6 ${active ? "text-white" : "text-gray-500"}`}
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={active ? 0 : 2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      name: "Search",
      href: "/search",
      icon: (active: boolean) => (
        <svg
          className={`w-6 h-6 ${active ? "text-white" : "text-gray-500"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={active ? 3 : 2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },
    {
      name: "Coming Soon",
      href: "/browse/new",
      icon: (active: boolean) => (
        <svg
          className={`w-6 h-6 ${active ? "text-white" : "text-gray-500"}`}
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={active ? 0 : 2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      name: "My List",
      href: "/my-list",
      icon: (active: boolean) => (
        <svg
          className={`w-6 h-6 ${active ? "text-white" : "text-gray-500"}`}
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={active ? 0 : 2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      ),
    },
    {
      name: "More",
      href: "/profile",
      icon: (active: boolean) =>
        profile ? (
          <div
            className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${
              active
                ? "bg-white text-black border-2 border-white"
                : "bg-primary text-white border-2 border-transparent"
            }`}
          >
            {profile.full_name?.[0]?.toUpperCase() ||
              profile.email[0].toUpperCase()}
          </div>
        ) : (
          <svg
            className={`w-6 h-6 ${active ? "text-white" : "text-gray-500"}`}
            fill={active ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={active ? 0 : 2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        ),
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#121212] border-t border-gray-800 pb-safe">
      <div className="flex justify-around items-center h-[3.5rem]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center w-full h-full space-y-1"
            >
              {item.icon(isActive)}
              <span
                className={`text-[10px] ${
                  isActive ? "text-white font-medium" : "text-gray-500"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
