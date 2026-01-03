// Auth Types for Murflix
export type UserRole = 'admin' | 'user';

export type SubscriptionDuration = 
  | '1_month' 
  | '2_months' 
  | '3_months' 
  | '6_months' 
  | '1_year' 
  | 'forever';

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
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// Subscription status type
export type SubscriptionStatus = 'active' | 'expired' | 'forever';

export function getSubscriptionStatus(expiresAt: string | null): SubscriptionStatus {
  if (expiresAt === null) return 'forever';
  const expiryDate = new Date(expiresAt);
  const now = new Date();
  return expiryDate > now ? 'active' : 'expired';
}

// Calculate expiry date from duration
export function calculateExpiryDate(duration: SubscriptionDuration): string | null {
  if (duration === 'forever') return null;
  
  const now = new Date();
  const monthsMap: Record<Exclude<SubscriptionDuration, 'forever'>, number> = {
    '1_month': 1,
    '2_months': 2,
    '3_months': 3,
    '6_months': 6,
    '1_year': 12,
  };
  
  const months = monthsMap[duration];
  now.setMonth(now.getMonth() + months);
  return now.toISOString();
}

// Duration labels for UI
export const SUBSCRIPTION_DURATION_LABELS: Record<SubscriptionDuration, string> = {
  '1_month': '1 Bulan',
  '2_months': '2 Bulan',
  '3_months': '3 Bulan',
  '6_months': '6 Bulan',
  '1_year': '1 Tahun',
  'forever': 'Selamanya',
};
