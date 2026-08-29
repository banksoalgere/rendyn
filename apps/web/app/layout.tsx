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
  title: 'DesignMCP | Ship UI that feels designed, not generated',
  description: 'Give coding agents ranked component choices and complete implementation-ready code, so you ship stronger UI with fewer revisions.',
  openGraph: {
    title: 'DesignMCP | Ship UI that feels designed, not generated',
    description: 'Better first drafts, faster decisions and complete component code for AI-built products.',
    images: ['http://localhost:3001/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DesignMCP | Ship UI that feels designed, not generated',
    description: 'Better first drafts, faster decisions and complete component code for AI-built products.',
    images: ['http://localhost:3001/og.png'],
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
