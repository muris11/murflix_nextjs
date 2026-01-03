/**
 * TMDB Authentication Library
 * Handles guest sessions, request tokens, and session management
 */

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;

const authOptions = {
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

// ============================================
// GUEST SESSION
// ============================================

export interface GuestSession {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
}

// Create Guest Session
export async function createGuestSession(): Promise<GuestSession> {
  const res = await fetch(
    `${BASE_URL}/authentication/guest_session/new`,
    { ...authOptions, method: 'GET' }
  );
  if (!res.ok) throw new Error('Failed to create guest session');
  return res.json();
}

// ============================================
// REQUEST TOKEN & SESSION
// ============================================

export interface RequestToken {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface Session {
  success: boolean;
  session_id: string;
}

// Create Request Token
export async function createRequestToken(): Promise<RequestToken> {
  const res = await fetch(
    `${BASE_URL}/authentication/token/new`,
    { ...authOptions, method: 'GET' }
  );
  if (!res.ok) throw new Error('Failed to create request token');
  return res.json();
}

// Create Session (after user authorizes token on TMDB website)
export async function createSession(requestToken: string): Promise<Session> {
  const res = await fetch(
    `${BASE_URL}/authentication/session/new`,
    {
      ...authOptions,
      method: 'POST',
      body: JSON.stringify({ request_token: requestToken }),
    }
  );
  if (!res.ok) throw new Error('Failed to create session');
  return res.json();
}

// Validate Login with Username/Password
export async function validateWithLogin(
  username: string,
  password: string,
  requestToken: string
): Promise<RequestToken> {
  const res = await fetch(
    `${BASE_URL}/authentication/token/validate_with_login`,
    {
      ...authOptions,
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        request_token: requestToken,
      }),
    }
  );
  if (!res.ok) throw new Error('Invalid username or password');
  return res.json();
}

// Delete Session (Logout)
export async function deleteSession(sessionId: string): Promise<{ success: boolean }> {
  const res = await fetch(
    `${BASE_URL}/authentication/session`,
    {
      ...authOptions,
      method: 'DELETE',
      body: JSON.stringify({ session_id: sessionId }),
    }
  );
  if (!res.ok) throw new Error('Failed to delete session');
  return res.json();
}

// ============================================
// ACCOUNT DETAILS
// ============================================

export interface AccountDetails {
  id: number;
  name: string;
  username: string;
  include_adult: boolean;
  iso_639_1: string;
  iso_3166_1: string;
  avatar: {
    gravatar: { hash: string };
    tmdb: { avatar_path: string | null };
  };
}

// Get Account Details
export async function getAccountDetails(sessionId: string): Promise<AccountDetails> {
  const res = await fetch(
    `${BASE_URL}/account?session_id=${sessionId}`,
    { ...authOptions, method: 'GET' }
  );
  if (!res.ok) throw new Error('Failed to get account details');
  return res.json();
}

// ============================================
// HELPER: Get Authorization URL
// ============================================

export function getAuthorizationUrl(requestToken: string, redirectTo?: string): string {
  const baseUrl = 'https://www.themoviedb.org/authenticate';
  const redirect = redirectTo ? `?redirect_to=${encodeURIComponent(redirectTo)}` : '';
  return `${baseUrl}/${requestToken}${redirect}`;
}

// ============================================
// LOCAL STORAGE HELPERS
// ============================================

const GUEST_SESSION_KEY = 'tmdb_guest_session';
const SESSION_KEY = 'tmdb_session';
const ACCOUNT_KEY = 'tmdb_account';

export function saveGuestSession(session: GuestSession): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(GUEST_SESSION_KEY, JSON.stringify(session));
  }
}

export function getGuestSession(): GuestSession | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(GUEST_SESSION_KEY);
  if (!data) return null;
  
  const session = JSON.parse(data) as GuestSession;
  // Check if expired
  if (new Date(session.expires_at) < new Date()) {
    localStorage.removeItem(GUEST_SESSION_KEY);
    return null;
  }
  return session;
}

export function saveSession(sessionId: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, sessionId);
  }
}

export function getSession(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(SESSION_KEY);
}

export function saveAccount(account: AccountDetails): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
  }
}

export function getAccount(): AccountDetails | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(ACCOUNT_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearAuth(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(GUEST_SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(ACCOUNT_KEY);
  }
}

// Check if user is authenticated (either guest or full session)
export function isAuthenticated(): boolean {
  return !!(getSession() || getGuestSession());
}
