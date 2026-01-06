import { 
  discoverMoviesByGenre, 
  discoverTVByGenre,
  discoverMoviesByYear,
  discoverTVByYear,
  discoverMoviesByCountry,
  discoverTVByCountry
} from '@/lib/tmdb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'movie';
  const page = parseInt(searchParams.get('page') || '1');
  
  const genreId = searchParams.get('genreId');
  const year = searchParams.get('year');
  const countryCode = searchParams.get('countryCode');

  try {
    let data;

    if (genreId) {
      data = type === 'tv' 
        ? await discoverTVByGenre(parseInt(genreId), page)
        : await discoverMoviesByGenre(parseInt(genreId), page);
    } else if (year) {
      data = type === 'tv'
        ? await discoverTVByYear(parseInt(year), page)
        : await discoverMoviesByYear(parseInt(year), page);
    } else if (countryCode) {
      data = type === 'tv'
        ? await discoverTVByCountry(countryCode, page)
        : await discoverMoviesByCountry(countryCode, page);
    } else {
      return NextResponse.json({ error: 'Missing filter parameter (genreId, year, or countryCode)' }, { status: 400 });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to discover:', error);
    return NextResponse.json({ error: 'Failed to discover' }, { status: 500 });
  }
}
