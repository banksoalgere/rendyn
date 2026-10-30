import type { Metadata } from 'next';
import './fonts.css';
import { homeDescription, homeTitle, siteOrigin } from '../lib/seo';
import { WebsiteAnalytics } from './components/website-analytics';

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
        data-theme="white"
        className="antialiased"
      >
        {children}
        <WebsiteAnalytics />
      </body>
    </html>
  );
}
