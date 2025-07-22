import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!query) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 });
  }

  try {
    const params = {
      part: 'snippet',
      q: query,
      maxResults: 1,
      key: apiKey,
    };
    const response = await axios.get(YOUTUBE_BASE_URL + "/search", { params });
    return NextResponse.json(response.data.items);
  } catch (error: unknown) {
    let message = 'Unknown error';
    if (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string') {
      message = (error as { message: string }).message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}