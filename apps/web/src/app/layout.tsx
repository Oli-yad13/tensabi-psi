import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import AppLoadingScreen from '@/components/AppLoadingScreen';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Tena-Sabi — HIV Self-Test',
  description: 'Test Privately. Know Your Status.',
  icons: {
    icon: '/psi-ethiopia.png',
    shortcut: '/psi-ethiopia.png',
    apple: '/psi-ethiopia.png',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={`${montserrat.variable} font-sans`} style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
        <NextIntlClientProvider messages={messages}>
          <AppLoadingScreen />
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
