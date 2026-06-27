import { initServerI18next, getT, getResources, generateI18nStaticParams } from 'next-i18next/server';
import { I18nProvider } from 'next-i18next/client';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactElement, ReactNode } from 'react';

// configs
import i18nConfig from '@/i18n.config';

// providers
import StoreProvider from '@/providers/StoreProvider';

// styles
import './globals.css';

interface Props {
  children: ReactNode;
}

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});
const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const metadata: Metadata = {
  title: 'Boat Assistant',
  description:
    'A practical onboard assistant for your sailboat: maintenance, systems, power, weather, and logbook in a chat-first interface.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
};

const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

initServerI18next(i18nConfig);

async function generateStaticParams() {
  return generateI18nStaticParams();
}

const RootLayout: (props: Props) => Promise<ReactElement> = async ({ children }) => {
  const { i18n, lng } = await getT();
  const resources = getResources(i18n);

  return (
    <html lang={lng} className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        <StoreProvider>
          <I18nProvider language={lng} resources={resources}>
            {children}
          </I18nProvider>
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
export { generateStaticParams, metadata, viewport };
