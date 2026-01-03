"use client";

import { UserProfile } from "@/types/auth";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Stats {
  totalUsers: number;
  activeUsers: number;
  expiredUsers: number;
  admins: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeUsers: 0,
    expiredUsers: 0,
    admins: 0,
  });
  const [recentUsers, setRecentUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/admin/users");
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Failed to load users");
      }

      const profiles = (payload?.users || []) as UserProfile[];

      if (profiles.length > 0) {
        const now = new Date();
        const activeCount = profiles.filter((p) => {
          if (p.role === "admin") return true;
          if (!p.subscription_expires_at) return true; // Forever
          return new Date(p.subscription_expires_at) > now;
        }).length;

        const expiredCount = profiles.filter((p) => {
          if (p.role === "admin") return false;
          if (!p.subscription_expires_at) return false;
          return new Date(p.subscription_expires_at) <= now;
        }).length;

        setStats({
          totalUsers: profiles.length,
          activeUsers: activeCount,
          expiredUsers: expiredCount,
          admins: profiles.filter((p) => p.role === "admin").length,
        });

        setRecentUsers(profiles.slice(0, 5));
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getSubscriptionBadge = (profile: UserProfile) => {
    if (profile.role === "admin") {
      return (
        <span className="inline-flex items-center rounded-full bg-purple-900/30 px-2.5 py-0.5 text-xs font-medium text-purple-400">
          Admin
        </span>
      );
    }
    if (!profile.subscription_expires_at) {
      return (
        <span className="inline-flex items-center rounded-full bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-400">
          Selamanya
        </span>
      );
    }
    const isExpired = new Date(profile.subscription_expires_at) <= new Date();
    return isExpired ? (
      <span className="inline-flex items-center rounded-full bg-red-900/30 px-2.5 py-0.5 text-xs font-medium text-red-400">
        Expired
      </span>
    ) : (
      <span className="inline-flex items-center rounded-full bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-400">
        Active
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-white" />
      </div>
    );
  }

  return (
    <div className="space-y-8 text-white">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-gray-400">
          Selamat datang di Admin Panel Murflix
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Users */}
        <div className="rounded-xl bg-gray-800 p-6 shadow-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-blue-900/30 p-3 text-blue-400">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
          <p className="mt-4 text-3xl font-bold text-white">{stats.totalUsers}</p>
          <p className="text-sm text-gray-400">Total Users</p>
        </div>

        {/* Active Users */}
        <div className="rounded-xl bg-gray-800 p-6 shadow-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-green-900/30 p-3 text-green-400">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <p className="mt-4 text-3xl font-bold text-white">{stats.activeUsers}</p>
          <p className="text-sm text-gray-400">Active Subscriptions</p>
        </div>

        {/* Expired Users */}
        <div className="rounded-xl bg-gray-800 p-6 shadow-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-red-900/30 p-3 text-red-400">
              <svg
                className="h-6 w-6"
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
          </div>
          <p className="mt-4 text-3xl font-bold text-white">{stats.expiredUsers}</p>
          <p className="text-sm text-gray-400">Expired Subscriptions</p>
        </div>

        {/* Admins */}
        <div className="rounded-xl bg-gray-800 p-6 shadow-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-purple-900/30 p-3 text-purple-400">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
          </div>
          <p className="mt-4 text-3xl font-bold text-white">{stats.admins}</p>
          <p className="text-sm text-gray-400">Administrators</p>
        </div>
      </div>

      {/* Quick Actions & Recent Users */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-xl font-bold text-white">Quick Actions</h2>
          <div className="space-y-4">
            <Link
              href="/admin/users/create"
              className="flex items-center justify-between rounded-lg bg-gray-800 p-4 shadow hover:bg-gray-700 transition-colors border border-gray-700 group"
            >
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-blue-500/20 p-2 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
                <span className="font-medium text-white">Tambah User Baru</span>
              </div>
              <svg className="h-5 w-5 text-gray-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center justify-between rounded-lg bg-gray-800 p-4 shadow hover:bg-gray-700 transition-colors border border-gray-700 group"
            >
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-green-500/20 p-2 text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <span className="font-medium text-white">
                  Lihat Semua User
                </span>
              </div>
              <svg className="h-5 w-5 text-gray-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Recent Users */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">User Terbaru</h2>
            <Link
              href="/admin/users"
              className="text-sm font-medium text-primary hover:text-red-400"
            >
              Lihat Semua
            </Link>
          </div>

          {recentUsers.length === 0 ? (
            <div className="rounded-lg bg-gray-800 p-8 text-center text-gray-400 border border-gray-700">
              <p>Belum ada user yang terdaftar.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-800 shadow">
              <div className="divide-y divide-gray-700">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-700 text-lg font-bold text-white">
                        {user.full_name?.[0]?.toUpperCase() ||
                          user.email[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {user.full_name || "User"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getSubscriptionBadge(user)}
                      <p className="mt-1 text-xs text-gray-500">
                        {formatDate(user.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
