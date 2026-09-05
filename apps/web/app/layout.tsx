import type { Metadata } from 'next';
import { DM_Sans, Geist_Mono } from 'next/font/google';
import './globals.css';
import { homeDescription, homeTitle, siteOrigin } from '../lib/seo';

const dmSans = DM_Sans({
  variable: '--font-rendyn-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
        data-theme="horizon"
        className={`${dmSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
