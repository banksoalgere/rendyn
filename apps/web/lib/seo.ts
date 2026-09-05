import type { Metadata } from 'next';
import { catalogueEntries, type CatalogueEntry } from './catalogue';

export const siteOrigin = 'https://rendyn.dev';
export const siteName = 'Rendyn';
export const homeTitle = 'Rendyn | React UI Components for AI Coding Agents';
export const homeDescription = `Explore ${catalogueEntries.length} React UI components with live previews, TypeScript source and MCP integration for Claude Code, Codex and Cursor.`;

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      locale: 'en_GB',
      type: 'website',
      images: ['/og.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og.png'],
    },
  };
}

// These components share display names but offer different interactions.
// Describe those differences without changing their established public URLs.
const componentSearchNames: Record<string, string> = {
  marquee: 'Marquee with Pause on Hover',
  'magicui-marquee': 'Infinite Media Marquee',
  'kibo-marquee': 'Draggable Marquee',
  combobox: 'Grouped Combobox',
  'kibo-combobox': 'Autocomplete Combobox',
  'file-tree': 'Keyboard File Tree',
  'magicui-file-tree': 'Directory File Tree',
  dock: 'Dock with Active Indicator',
  'magicui-dock': 'Magnifying Dock',
  table: 'Virtualized Data Table',
  'kibo-table': 'Data Table',
  'code-block': 'Streaming Code Block',
  'kibo-code-block': 'Syntax Highlighted Code Block',
};

export function componentMetadata(component: CatalogueEntry): Metadata {
  const name = componentSearchNames[component.slug] ?? component.name;
  return pageMetadata(
    `${name} React Component | Rendyn`,
    `Try the ${name} React component. Explore its live preview, usage and dependencies, then adapt it with your AI coding agent.`,
    `/components/${component.publicSlug}`,
  );
}

export const homeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteOrigin}/#organization`,
      name: siteName,
      url: `${siteOrigin}/`,
      logo: `${siteOrigin}/favicon.svg`,
    },
    {
      '@type': 'WebSite',
      '@id': `${siteOrigin}/#website`,
      name: siteName,
      alternateName: 'rendyn.dev',
      url: `${siteOrigin}/`,
      description: homeDescription,
      publisher: { '@id': `${siteOrigin}/#organization` },
      inLanguage: 'en-GB',
    },
  ],
};
