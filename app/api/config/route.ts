import { fetchCountries, fetchMovieGenres, fetchTVGenres } from '@/lib/tmdb';
import { NextResponse } from 'next/server';

// Cache configuration data for 24 hours
export const revalidate = 86400;

export async function GET() {
  try {
    const [countries, movieGenres, tvGenres] = await Promise.all([
      fetchCountries(),
      fetchMovieGenres(),
      fetchTVGenres(),
    ]);

    // Merge and dedupe genres
    const allGenres = [...movieGenres.genres];
    tvGenres.genres.forEach(tvGenre => {
      if (!allGenres.find(g => g.id === tvGenre.id)) {
        allGenres.push(tvGenre);
      }
    });

    // Sort alphabetically
    allGenres.sort((a, b) => a.name.localeCompare(b.name));
    const sortedCountries = countries.sort((a, b) => a.english_name.localeCompare(b.english_name));

    // Generate years (1900 to current year)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);

    return NextResponse.json({
      countries: sortedCountries,
      genres: allGenres,
      years,
    });
  } catch (error) {
    console.error('Error fetching TMDB config:', error);
    return NextResponse.json(
      { error: 'Failed to fetch configuration' },
      { status: 500 }
    );
  }
}
