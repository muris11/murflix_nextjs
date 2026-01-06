import { fetchMovieVideos, fetchTVVideos } from '@/lib/tmdb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const type = searchParams.get('type') || 'movie';

  if (!id) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
  }

  try {
    const data = type === 'tv' 
      ? await fetchTVVideos(parseInt(id))
      : await fetchMovieVideos(parseInt(id));
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
