import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { homeDescription, homeTitle, siteOrigin } from '../lib/seo';

const archivo = localFont({
  src: '../public/fonts/archivo-latin.woff2',
  variable: '--font-archivo',
  weight: '100 900',
  display: 'swap',
});

const geistMono = localFont({
  src: '../public/fonts/geist-mono-latin.woff2',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  applicationName: 'Rendyn',
  title: homeTitle,
  description: homeDescription,
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: homeTitle,
    description: 'Polished React UI components, live previews, and complete source for AI coding agents.',
    locale: 'en_GB',
    siteName: 'Rendyn',
    type: 'website',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: homeTitle,
    description: 'Polished React UI components, live previews, and complete source for AI coding agents.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
