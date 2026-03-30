import { NextRequest, NextResponse } from 'next/server';
import { looksLikeGoogleMapsUrl, parseGoogleMapsUrl } from '@/lib/parseGoogleMapsUrl';

async function resolveFinalGoogleMapsUrl(url: string) {
  const userAgent = 'Mozilla/5.0 (compatible; Tena-Sabi Maps Resolver/1.0)';

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      cache: 'no-store',
      headers: { 'user-agent': userAgent },
    });
    return response.url || url;
  } catch {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      cache: 'no-store',
      headers: { 'user-agent': userAgent },
    });
    return response.url || url;
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const url = typeof body?.url === 'string' ? body.url.trim() : '';

  if (!url || !looksLikeGoogleMapsUrl(url)) {
    return NextResponse.json({ error: 'Invalid Google Maps link.' }, { status: 400 });
  }

  const directCoords = parseGoogleMapsUrl(url);
  if (directCoords) {
    return NextResponse.json({ coords: directCoords, resolvedUrl: url });
  }

  const resolvedUrl = await resolveFinalGoogleMapsUrl(url);
  const coords = parseGoogleMapsUrl(resolvedUrl);

  if (!coords) {
    return NextResponse.json(
      { error: 'Could not extract coordinates from that Google Maps link.', resolvedUrl },
      { status: 422 },
    );
  }

  return NextResponse.json({ coords, resolvedUrl });
}
