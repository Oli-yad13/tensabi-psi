'use client';

import { useEffect, useState } from 'react';
import {
  looksLikeGoogleMapsUrl,
  parseGoogleMapsUrl,
  type Coordinates,
} from '@/lib/parseGoogleMapsUrl';

interface ResolveResponse {
  coords?: Coordinates | null;
  error?: string;
}

export function useGoogleMapsInput(initialValue = '') {
  const [mapsUrl, setMapsUrl] = useState(initialValue);
  const [parsed, setParsed] = useState<Coordinates | null>(() => parseGoogleMapsUrl(initialValue));
  const [isResolving, setIsResolving] = useState(false);
  const [resolveError, setResolveError] = useState('');

  useEffect(() => {
    const value = mapsUrl.trim();

    if (!value) {
      setParsed(null);
      setResolveError('');
      setIsResolving(false);
      return;
    }

    const directCoords = parseGoogleMapsUrl(value);
    if (directCoords) {
      setParsed(directCoords);
      setResolveError('');
      setIsResolving(false);
      return;
    }

    if (!looksLikeGoogleMapsUrl(value)) {
      setParsed(null);
      setResolveError('');
      setIsResolving(false);
      return;
    }

    let cancelled = false;
    const timer = setTimeout(async () => {
      setIsResolving(true);
      setResolveError('');

      try {
        const response = await fetch('/api/maps/resolve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: value }),
        });
        const data = (await response.json().catch(() => null)) as ResolveResponse | null;
        if (cancelled) return;

        if (response.ok && data?.coords) {
          setParsed(data.coords);
          setResolveError('');
          return;
        }

        setParsed(null);
        setResolveError(data?.error ?? 'Could not resolve that Google Maps link.');
      } catch {
        if (cancelled) return;
        setParsed(null);
        setResolveError('Could not resolve that Google Maps link.');
      } finally {
        if (!cancelled) setIsResolving(false);
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [mapsUrl]);

  return { mapsUrl, setMapsUrl, parsed, isResolving, resolveError };
}
