// Auth Types for Murflix
export type UserRole = "admin" | "user";

export type SubscriptionDuration =
  | "1_hour"
  | "6_hours"
  | "12_hours"
  | "1_day"
  | "3_days"
  | "7_days"
  | "2_weeks"
  | "1_month"
  | "2_months"
  | "3_months"
  | "6_months"
  | "1_year"
  | "forever";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  subscription_expires_at: string | null; // null = forever
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  id: string;
  email: string;
  profile: UserProfile | null;
}

export interface AuthContextType {
  // State
  user: AuthUser | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSubscriptionValid: boolean;

  // Actions
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// Subscription status type
export type SubscriptionStatus = "active" | "expired" | "forever";

export function getSubscriptionStatus(
  expiresAt: string | null
): SubscriptionStatus {
  if (expiresAt === null) return "forever";
  const expiryDate = new Date(expiresAt);
  const now = new Date();
  return expiryDate > now ? "active" : "expired";
}

// Calculate expiry date from duration
export function calculateExpiryDate(
  duration: SubscriptionDuration
): string | null {
  if (duration === "forever") return null;

  const now = new Date();

  // Hours
  if (duration === "1_hour") {
    now.setHours(now.getHours() + 1);
    return now.toISOString();
  }
  if (duration === "6_hours") {
    now.setHours(now.getHours() + 6);
    return now.toISOString();
  }
  if (duration === "12_hours") {
    now.setHours(now.getHours() + 12);
    return now.toISOString();
  }

  // Days
  if (duration === "1_day") {
    now.setDate(now.getDate() + 1);
    return now.toISOString();
  }
  if (duration === "3_days") {
    now.setDate(now.getDate() + 3);
    return now.toISOString();
  }
  if (duration === "7_days") {
    now.setDate(now.getDate() + 7);
    return now.toISOString();
  }

  // Weeks
  if (duration === "2_weeks") {
    now.setDate(now.getDate() + 14);
    return now.toISOString();
  }

  // Months
  const monthsMap: Record<string, number> = {
    "1_month": 1,
    "2_months": 2,
    "3_months": 3,
    "6_months": 6,
    "1_year": 12,
  };

  const months = monthsMap[duration];
  if (months) {
    now.setMonth(now.getMonth() + months);
    return now.toISOString();
  }

  return now.toISOString();
}

// Duration labels for UI
export const SUBSCRIPTION_DURATION_LABELS: Record<
  SubscriptionDuration,
  string
> = {
  "1_hour": "1 Jam",
  "6_hours": "6 Jam",
  "12_hours": "12 Jam",
  "1_day": "1 Hari",
  "3_days": "3 Hari",
  "7_days": "7 Hari",
  "2_weeks": "2 Minggu",
  "1_month": "1 Bulan",
  "2_months": "2 Bulan",
  "3_months": "3 Bulan",
  "6_months": "6 Bulan",
  "1_year": "1 Tahun",
  forever: "Selamanya",
};
