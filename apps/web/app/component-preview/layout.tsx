import type { Metadata } from 'next';
import '../../../preview/app/globals.css';
import './embedded.css';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ComponentPreviewLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
