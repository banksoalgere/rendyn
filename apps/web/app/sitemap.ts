import type { MetadataRoute } from 'next';
import { catalogueEntries } from '../lib/catalogue';
import { guides } from '../lib/guides';
import { siteOrigin } from '../lib/seo';

const siteUrl = siteOrigin;
const publicRoutes = [
  '/',
  '/components',
  '/pricing',
  '/guides',
  '/mcp',
  '/collections/ai-agent-ui',
  '/collections/animated-react-components',
  ...guides.map((guide) => guide.href),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const componentPages: MetadataRoute.Sitemap = catalogueEntries.map((component) => ({
    url: `${siteUrl}/components/${component.publicSlug}`,
    lastModified: new Date(component.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    ...publicRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      // Omit lastmod until this route has a maintained content revision date.
      changeFrequency: route === '/' || route === '/components' ? 'weekly' as const : 'monthly' as const,
      priority: route === '/' ? 1 : route === '/components' ? 0.9 : 0.7,
    })),
    ...componentPages,
  ];
}
