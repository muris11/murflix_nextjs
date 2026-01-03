"use client";

import { useAuth } from "@/contexts/AuthContext";
import { getSubscriptionStatus } from "@/types/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Avatar options
const AVATARS = [
  { id: 1, color: "from-red-500 to-red-700", icon: "😎" },
  { id: 2, color: "from-blue-500 to-blue-700", icon: "🎬" },
  { id: 3, color: "from-green-500 to-green-700", icon: "🍿" },
  { id: 4, color: "from-purple-500 to-purple-700", icon: "🎭" },
  { id: 5, color: "from-yellow-500 to-yellow-700", icon: "⭐" },
  { id: 6, color: "from-pink-500 to-pink-700", icon: "🎪" },
];

export default function ProfilePage() {
  const { profile, isLoading, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#141414]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const subscriptionStatus = getSubscriptionStatus(
    profile.subscription_expires_at
  );
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Selamanya";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#141414] px-4 pb-20 pt-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Header */}
        <div className="border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold text-white">Profil Saya</h1>
          <p className="mt-2 text-gray-400">Kelola informasi akun Murflix Anda</p>
        </div>

        {/* Avatar & Name */}
        <div className="flex flex-col items-center">
          {/* Current Avatar */}
          <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-lg bg-primary text-4xl font-bold text-white shadow-2xl shadow-black/40 ring-4 ring-white/10 md:h-32 md:w-32 md:text-5xl">
            {profile.full_name?.[0]?.toUpperCase() ||
              profile.email[0].toUpperCase()}
          </div>

          <h2 className="text-2xl font-bold text-white">
            {profile.full_name || "User"}
          </h2>
          <p className="text-gray-400">{profile.email}</p>

          {/* Role Badge */}
          {isAdmin && (
            <span className="mt-2 inline-flex items-center rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-500/30">
              Administrator
            </span>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Subscription Status */}
          <div className="rounded-xl bg-gray-900 p-6 shadow-lg ring-1 ring-white/5">
            <h3 className="mb-4 flex items-center text-lg font-semibold text-white">
              <span className="mr-2 h-2 w-2 rounded-full bg-green-500" />
              Status Langganan
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between border-b border-white/5 pb-3">
                <span className="text-gray-400">Status</span>
                {isAdmin ? (
                  <span className="font-medium text-purple-400">
                    Admin
                  </span>
                ) : subscriptionStatus === "forever" ? (
                  <span className="font-medium text-yellow-400">
                    Selamanya
                  </span>
                ) : subscriptionStatus === "active" ? (
                  <span className="font-medium text-green-400">
                    Aktif
                  </span>
                ) : (
                  <span className="font-medium text-red-400">
                    Expired
                  </span>
                )}
              </div>

              {!isAdmin && (
                <div className="flex justify-between border-b border-white/5 pb-3">
                  <span className="text-gray-400">Berlaku Hingga</span>
                  <span className="text-white">
                    {formatDate(profile.subscription_expires_at)}
                  </span>
                </div>
              )}

              <div className="flex justify-between pt-1">
                <span className="text-gray-400">Bergabung</span>
                <span className="text-white">
                  {formatDate(profile.created_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl bg-gray-900 p-6 shadow-lg ring-1 ring-white/5">
            <h3 className="mb-4 flex items-center text-lg font-semibold text-white">
              <span className="mr-2 h-2 w-2 rounded-full bg-blue-500" />
              Aksi Cepat
            </h3>

            <div className="space-y-3">
              <Link
                href="/profile/settings"
                className="group flex items-center justify-between rounded-lg bg-white/5 p-4 transition-all hover:bg-white/10"
              >
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-blue-500/20 p-2 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-white group-hover:text-blue-400 transition-colors">
                      Pengaturan Akun
                    </p>
                    <p className="text-xs text-gray-400">
                      Ubah password & info profil
                    </p>
                  </div>
                </div>
                <svg className="h-5 w-5 text-gray-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link
                href="/my-list"
                className="group flex items-center justify-between rounded-lg bg-white/5 p-4 transition-all hover:bg-white/10"
              >
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-pink-500/20 p-2 text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-white group-hover:text-pink-400 transition-colors">
                      My List
                    </p>
                    <p className="text-xs text-gray-400">
                      Lihat daftar favorit Anda
                    </p>
                  </div>
                </div>
                <svg className="h-5 w-5 text-gray-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {isAdmin && (
                <Link
                  href="/admin"
                  className="group flex items-center justify-between rounded-lg bg-white/5 p-4 transition-all hover:bg-white/10"
                >
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-purple-500/20 p-2 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-white group-hover:text-purple-400 transition-colors">Admin Panel</p>
                      <p className="text-xs text-gray-400">
                        Kelola users & settings
                      </p>
                    </div>
                  </div>
                  <svg className="h-5 w-5 text-gray-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Avatar Selection */}
        <div className="rounded-xl bg-gray-900 p-6 shadow-lg ring-1 ring-white/5">
          <h3 className="mb-6 flex items-center text-lg font-semibold text-white">
            <span className="mr-2 h-2 w-2 rounded-full bg-yellow-500" />
            Pilih Avatar
          </h3>
          <div className="flex flex-wrap gap-4">
            {AVATARS.map((avatar) => (
              <button
                key={avatar.id}
                className={`flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br ${avatar.color} text-2xl shadow-lg transition-transform hover:scale-110 hover:ring-2 hover:ring-white/50`}
                title={`Avatar ${avatar.id}`}
              >
                {avatar.icon}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-500">
            * Fitur avatar akan tersedia di update mendatang
          </p>
        </div>
      </div>
    </div>
  );
}
