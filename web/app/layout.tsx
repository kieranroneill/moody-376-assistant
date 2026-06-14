import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactElement, ReactNode } from 'react';

// styles
import './globals.css';

type Props = Record<'children', ReactNode>;

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});
const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const metadata: Metadata = {
  title: 'Helm Assistant — Onboard Companion',
  description:
    'A calm, practical onboard assistant for your sailboat: maintenance, systems, power, weather, and logbook in one chat-first interface.',
  generator: 'v0.app',
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

const RootLayout: (props: Props) => ReactElement = ({ children }) => {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
};

export default RootLayout;
export { metadata, viewport };
