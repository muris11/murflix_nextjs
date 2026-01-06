import { getMovieAccountStates, getTVAccountStates, addToWatchlist } from '@/lib/account';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  const type = searchParams.get('type') || 'movie';
  const sessionId = searchParams.get('sessionId');

  if (!id || !sessionId) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  try {
    const status = type === 'tv' 
      ? await getTVAccountStates(parseInt(id), sessionId)
      : await getMovieAccountStates(parseInt(id), sessionId);
    
    return NextResponse.json(status);
  } catch (error) {
    console.error('Failed to get account states:', error);
    return NextResponse.json({ error: 'Failed to get account states' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accountId, sessionId, mediaType, mediaId, watchlist } = body;

    if (!accountId || !sessionId || !mediaType || !mediaId || watchlist === undefined) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const result = await addToWatchlist(accountId, sessionId, mediaType, mediaId, watchlist);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to update watchlist:', error);
    return NextResponse.json({ error: 'Failed to update watchlist' }, { status: 500 });
  }
}
