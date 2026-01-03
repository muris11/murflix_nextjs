-- =============================================
-- MURFLIX Database Schema for Supabase
-- Run this in Supabase SQL Editor
-- =============================================

-- Table: profiles
-- Stores user profile information with role and subscription
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  subscription_expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first (if any)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for service role" ON public.profiles;
DROP POLICY IF EXISTS "Enable read for users own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for users own profile" ON public.profiles;

-- =============================================
-- RLS Policies (FIXED - No circular dependency)
-- =============================================

-- Policy: All authenticated users can read their own profile
CREATE POLICY "Enable read for users own profile" ON public.profiles
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = id);

-- Policy: Users can update their own profile (role protected by trigger)
CREATE POLICY "Enable update for users own profile" ON public.profiles
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Service role can do everything (for admin operations via API)
-- Note: service_role bypasses RLS by default, so no policy needed

-- =============================================
-- Triggers & Functions
-- =============================================

-- Function: Create profile on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function: Keep updated_at fresh + prevent restricted field changes by normal users
CREATE OR REPLACE FUNCTION public.handle_profile_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Block role changes by normal users (admin can change via service_role)
  IF NEW.role IS DISTINCT FROM OLD.role AND auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'Changing role is not allowed';
  END IF;

  -- Block subscription field changes by normal users
  IF (NEW.subscription_expires_at IS DISTINCT FROM OLD.subscription_expires_at 
      OR NEW.is_active IS DISTINCT FROM OLD.is_active) 
     AND auth.uid() IS NOT NULL THEN
    RAISE EXCEPTION 'Changing subscription fields is not allowed';
  END IF;

  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger: Run function after new user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger: Update timestamps + protect role updates
DROP TRIGGER IF EXISTS on_profiles_updated ON public.profiles;
CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_profile_update();

-- =============================================
-- Create Initial Admin User
-- =============================================

-- IMPORTANT: After creating a user via Authentication → Add User:
-- UPDATE profiles SET role = 'admin' WHERE email = 'your-admin@email.com';
