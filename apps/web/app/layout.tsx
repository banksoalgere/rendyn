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
  title: 'React UI Components for AI Coding Agents | Rendyn',
  description: 'Browse polished React UI components with live previews, complete TypeScript source, and MCP-ready context for AI coding agents.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'React UI Components for AI Coding Agents | Rendyn',
    description: 'Polished React UI components, live previews, and complete source for AI coding agents.',
    locale: 'en_GB',
    siteName: 'Rendyn',
    type: 'website',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'React UI Components for AI Coding Agents | Rendyn',
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
