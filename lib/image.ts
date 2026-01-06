/**
 * TMDB Image Utilities
 * These functions can be safely used on both client and server
 */

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL || 'https://image.tmdb.org/t/p';

// Helper function to get image URL
export function getImageUrl(
  path: string | null,
  size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'
): string {
  if (!path) return '/placeholder.svg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

// Helper function to get backdrop URL
export function getBackdropUrl(
  path: string | null,
  size: 'w300' | 'w780' | 'w1280' | 'original' = 'original'
): string {
  if (!path) return '/placeholder.svg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

// Helper function to get profile image URL
export function getProfileUrl(
  path: string | null,
  size: 'w45' | 'w185' | 'h632' | 'original' = 'w185'
): string {
  if (!path) return '/placeholder.svg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
}
