'use client';

import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

import { createClient } from '@/lib/supabase/client';
import {
    AuthContextType,
    AuthUser,
    getSubscriptionStatus,
    UserProfile,
} from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const supabase = useMemo(() => createClient(), []);
  const redirectIfInactive = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (url.pathname !== '/login' || url.searchParams.get('error') !== 'account_disabled') {
        window.location.href = '/login?error=account_disabled';
      }
    }
  }, [supabase]);

  // Fetch user profile from database
  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    
    return data as UserProfile;
  }, [supabase]);

  // Refresh profile data
  const refreshProfile = useCallback(async () => {
    if (!user?.id) return;
    const profileData = await fetchProfile(user.id);
    setProfile(profileData);
  }, [user?.id, fetchProfile]);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const authUser = session?.user ?? null;
        
        if (authUser) {
          const profileData = await fetchProfile(authUser.id);
          if (profileData && !profileData.is_active) {
            await redirectIfInactive();
            return;
          }
          setUser({
            id: authUser.id,
            email: authUser.email || '',
            profile: profileData,
          });
          setProfile(profileData);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const profileData = await fetchProfile(session.user.id);
          if (profileData && !profileData.is_active) {
            await redirectIfInactive();
            return;
          }
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            profile: profileData,
          });
          setProfile(profileData);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, fetchProfile, redirectIfInactive]);

  // Sign in with email and password
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: 'An unexpected error occurred' };
    }
  }, [supabase]);

  // Sign out
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }, [supabase]);

  // Computed values
  const isAuthenticated = !!user;
  const isAdmin = profile?.role === 'admin';
  const isSubscriptionValid = profile 
    ? (profile.role === 'admin' || getSubscriptionStatus(profile.subscription_expires_at) !== 'expired')
    : false;

  const value: AuthContextType = {
    user,
    profile,
    isLoading,
    isAuthenticated,
    isAdmin,
    isSubscriptionValid,
    signIn,
    signOut,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
