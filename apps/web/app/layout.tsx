import type { Metadata } from 'next';
import { Archivo, Geist_Mono } from 'next/font/google';
import './globals.css';

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rendyn.dev'),
  title: 'Rendyn | Give your coding agent great taste',
  description: 'A curated catalogue of polished interface components, visual previews and complete code for coding agents.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Rendyn | Give your coding agent great taste',
    description: 'Polished interface components, visual previews and complete code for coding agents.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rendyn | Give your coding agent great taste',
    description: 'Polished interface components, visual previews and complete code for coding agents.',
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
