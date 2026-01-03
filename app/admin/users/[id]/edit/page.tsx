"use client";

import {
  SUBSCRIPTION_DURATION_LABELS,
  SubscriptionDuration,
  UserProfile,
  UserRole,
} from "@/types/auth";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    role: "user" as UserRole,
    subscription_duration: "1_month" as SubscriptionDuration | "keep",
    is_active: true,
  });

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`);
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Failed to load user");
      }

      const data = payload.user as UserProfile;
      setUser(data);
      setFormData({
        full_name: data.full_name || "",
        role: data.role,
        subscription_duration: "keep",
        is_active: data.is_active,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update user");
      }

      router.push("/admin/users");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Selamanya";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-white" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-gray-400">
        <p>User tidak ditemukan</p>
      </div>
    );
  }

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
        <h1 className="text-2xl font-bold">Edit User</h1>
        <p className="text-gray-400">{user.email}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-md bg-red-500/10 p-4 text-sm text-red-500 border border-red-500/20">
            {error}
          </div>
        )}

        {/* Current Subscription Info */}
        <div className="rounded-md bg-gray-800 p-4 border border-gray-700">
          <p className="text-sm font-medium text-gray-400">
            Subscription saat ini
          </p>
          <p className="mt-1 text-lg font-semibold">
            {user.role === "admin" ? (
              <span className="text-primary">
                Admin (Tidak ada batas waktu)
              </span>
            ) : (
              <>
                Expires: {formatDate(user.subscription_expires_at)}
                {user.subscription_expires_at &&
                  new Date(user.subscription_expires_at) <= new Date() && (
                    <span className="ml-2 text-red-500 font-bold">
                      (Expired)
                    </span>
                  )}
              </>
            )}
          </p>
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
            Role
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

        {/* Account Status */}
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Status Akun
          </label>
          <div className="mt-2 space-y-2 sm:flex sm:items-center sm:space-x-4 sm:space-y-0">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="is_active"
                value="true"
                checked={formData.is_active === true}
                onChange={() => setFormData({ ...formData, is_active: true })}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-600 bg-gray-700"
              />
              <span className="text-sm text-gray-300">Aktif</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="is_active"
                value="false"
                checked={formData.is_active === false}
                onChange={() => setFormData({ ...formData, is_active: false })}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-600 bg-gray-700"
              />
              <span className="text-sm text-gray-300">Nonaktif</span>
            </label>
          </div>
        </div>

        {/* Extend/Change Subscription Duration - Only for regular users */}
        {formData.role === "user" && (
          <div className="rounded-md bg-gray-800 p-4 border border-gray-700">
            <label className="block text-sm font-medium text-white mb-3">
              Perpanjang/Ubah Subscription
            </label>

            {/* Keep Current Option */}
            <div className="mb-4">
              <label
                className={`flex cursor-pointer items-center justify-center rounded-lg border p-3 transition-colors ${
                  formData.subscription_duration === "keep"
                    ? "border-primary bg-primary/10 ring-2 ring-primary"
                    : "border-gray-600 hover:bg-gray-700"
                }`}
              >
                <input
                  type="radio"
                  name="subscription_duration"
                  value="keep"
                  checked={formData.subscription_duration === "keep"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subscription_duration: e.target.value as
                        | SubscriptionDuration
                        | "keep",
                    })
                  }
                  className="sr-only"
                />
                <span className="text-sm font-medium text-gray-200">
                  Tidak Ubah
                </span>
              </label>
            </div>

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

            {formData.subscription_duration !== "keep" && (
              <p className="mt-4 text-xs text-amber-400">
                ⚠️ Subscription akan di-reset dan dihitung dari sekarang
              </p>
            )}
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
                Menyimpan...
              </span>
            ) : (
              "Simpan Perubahan"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
