export interface Coordinates {
  lat: number;
  lng: number;
}

const GOOGLE_MAPS_HOST_PATTERNS = [
  /^maps\.app\.goo\.gl$/i,
  /^goo\.gl$/i,
  /(^|\.)google\.[a-z.]+$/i,
];

const COORDINATE_PATTERNS = [
  /!3d(-?\d{1,2}(?:\.\d+)?)!4d(-?\d{1,3}(?:\.\d+)?)/,
  /[?&](?:q|query|ll|destination|daddr)=(-?\d{1,2}(?:\.\d+)?),(-?\d{1,3}(?:\.\d+)?)/,
  /@(-?\d{1,2}(?:\.\d+)?),(-?\d{1,3}(?:\.\d+)?)/,
  /^(-?\d{1,2}(?:\.\d+)?)[,\s]+(-?\d{1,3}(?:\.\d+)?)$/,
];

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function parseUrl(value: string) {
  try {
    return new URL(value.trim());
  } catch {
    return null;
  }
}

export function hasValidCoordinates(lat: number, lng: number) {
  return Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
}

export function looksLikeGoogleMapsUrl(input: string) {
  const url = parseUrl(input);
  if (!url) return false;
  return GOOGLE_MAPS_HOST_PATTERNS.some((pattern) => pattern.test(url.hostname));
}

function toCoordinates(lat: string, lng: string): Coordinates | null {
  const parsedLat = Number.parseFloat(lat);
  const parsedLng = Number.parseFloat(lng);
  return hasValidCoordinates(parsedLat, parsedLng) ? { lat: parsedLat, lng: parsedLng } : null;
}

/**
 * Extracts latitude and longitude from common Google Maps URL formats:
 *  - https://www.google.com/maps/place/.../@9.005,38.763,17z/...
 *  - https://www.google.com/maps/place/.../data=!3m1!4b1!4m6!3m5...!3d9.005!4d38.763
 *  - https://maps.google.com/?q=9.005,38.763
 *  - https://www.google.com/maps?ll=9.005,38.763
 *  - https://www.google.com/maps/dir/?api=1&destination=9.005,38.763
 *  - Plain "9.005, 38.763" coordinate pair
 */
export function parseGoogleMapsUrl(input: string): Coordinates | null {
  if (!input) return null;
  const value = safeDecode(input.trim());

  for (const pattern of COORDINATE_PATTERNS) {
    const match = value.match(pattern);
    if (!match) continue;
    const coords = toCoordinates(match[1], match[2]);
    if (coords) return coords;
  }

  return null;
}

export function getGoogleMapsDirectionsUrl(lat: number, lng: number) {
  const url = new URL('https://www.google.com/maps/dir/');
  url.searchParams.set('api', '1');
  url.searchParams.set('destination', `${lat},${lng}`);
  return url.toString();
}
