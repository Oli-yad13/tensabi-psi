import { getRequestConfig } from 'next-intl/server';
import { IntlErrorCode } from 'next-intl';
import { cookies } from 'next/headers';

const LOCALES = ['en', 'am', 'om', 'so', 'ti'] as const;
type Locale = (typeof LOCALES)[number];

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get('NEXT_LOCALE')?.value;
  const locale: Locale = LOCALES.includes(raw as Locale) ? (raw as Locale) : 'en';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    onError(error) {
      if (error.code !== IntlErrorCode.MISSING_MESSAGE) {
        console.error(error);
      }
    },
    getMessageFallback({ key, namespace }) {
      return '';
    },
  };
});
