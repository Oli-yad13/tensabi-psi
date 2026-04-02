import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'am', 'om', 'so', 'ti'] as const,
  defaultLocale: 'en',
  localePrefix: 'never',
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
