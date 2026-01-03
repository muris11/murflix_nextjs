"use client";

import {
  SUBSCRIPTION_DURATION_LABELS,
  SubscriptionDuration,
  UserRole,
} from "@/types/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateUserPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    role: "user" as UserRole,
    subscription_duration: "1_month" as SubscriptionDuration,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create user");
      }

      router.push("/admin/users");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl text-white">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center text-sm text-gray-400 hover:text-white transition-colors"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali
        </button>
        <h1 className="text-2xl font-bold">Tambah User Baru</h1>
        <p className="text-gray-400">Buat akun user baru dengan subscription</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-md bg-red-500/10 p-4 text-sm text-red-500 border border-red-500/20">
            {error}
          </div>
        )}

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-colors"
            placeholder="user@example.com"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            required
            minLength={6}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-colors"
            placeholder="Minimal 6 karakter"
          />
        </div>

        {/* Full Name */}
        <div>
          <label
            htmlFor="full_name"
            className="block text-sm font-medium text-gray-300"
          >
            Nama Lengkap
          </label>
          <input
            type="text"
            id="full_name"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-colors"
            placeholder="John Doe"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Role <span className="text-red-500">*</span>
          </label>
          <div className="mt-2 space-y-2 sm:flex sm:items-center sm:space-x-4 sm:space-y-0">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="user"
                checked={formData.role === "user"}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value as UserRole })
                }
                className="h-4 w-4 text-primary focus:ring-primary border-gray-600 bg-gray-700"
              />
              <span className="text-sm text-gray-300">User</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={formData.role === "admin"}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value as UserRole })
                }
                className="h-4 w-4 text-primary focus:ring-primary border-gray-600 bg-gray-700"
              />
              <span className="text-sm text-gray-300">Admin</span>
            </label>
          </div>
        </div>

        {/* Subscription Duration - Only show for regular users */}
        {formData.role === "user" && (
          <div className="rounded-md bg-gray-800 p-4 border border-gray-700">
            <label className="block text-sm font-medium text-white mb-3">
              Durasi Subscription <span className="text-red-500">*</span>
            </label>

            {/* Hours */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                Jam
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(
                  ["1_hour", "6_hours", "12_hours"] as SubscriptionDuration[]
                ).map((duration) => (
                  <label
                    key={duration}
                    className={`flex cursor-pointer items-center justify-center rounded-lg border p-3 transition-colors ${
                      formData.subscription_duration === duration
                        ? "border-primary bg-primary/10 ring-2 ring-primary"
                        : "border-gray-600 hover:bg-gray-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="subscription_duration"
                      value={duration}
                      checked={formData.subscription_duration === duration}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subscription_duration: e.target
                            .value as SubscriptionDuration,
                        })
                      }
                      className="sr-only"
                    />
                    <span className="text-sm font-medium text-gray-200">
                      {SUBSCRIPTION_DURATION_LABELS[duration]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Days & Weeks */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                Hari & Minggu
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(
                  [
                    "1_day",
                    "3_days",
                    "7_days",
                    "2_weeks",
                  ] as SubscriptionDuration[]
                ).map((duration) => (
                  <label
                    key={duration}
                    className={`flex cursor-pointer items-center justify-center rounded-lg border p-3 transition-colors ${
                      formData.subscription_duration === duration
                        ? "border-primary bg-primary/10 ring-2 ring-primary"
                        : "border-gray-600 hover:bg-gray-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="subscription_duration"
                      value={duration}
                      checked={formData.subscription_duration === duration}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subscription_duration: e.target
                            .value as SubscriptionDuration,
                        })
                      }
                      className="sr-only"
                    />
                    <span className="text-sm font-medium text-gray-200">
                      {SUBSCRIPTION_DURATION_LABELS[duration]}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Months & Year */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                Bulan & Tahun
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(
                  [
                    "1_month",
                    "2_months",
                    "3_months",
                    "6_months",
                    "1_year",
                    "forever",
                  ] as SubscriptionDuration[]
                ).map((duration) => (
                  <label
                    key={duration}
                    className={`flex cursor-pointer items-center justify-center rounded-lg border p-3 transition-colors ${
                      formData.subscription_duration === duration
                        ? "border-primary bg-primary/10 ring-2 ring-primary"
                        : "border-gray-600 hover:bg-gray-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="subscription_duration"
                      value={duration}
                      checked={formData.subscription_duration === duration}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subscription_duration: e.target
                            .value as SubscriptionDuration,
                        })
                      }
                      className="sr-only"
                    />
                    <span className="text-sm font-medium text-gray-200">
                      {SUBSCRIPTION_DURATION_LABELS[duration]}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Membuat...
              </span>
            ) : (
              "Buat User"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
