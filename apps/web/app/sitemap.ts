import type { MetadataRoute } from 'next';
import { catalogueEntries } from '../lib/catalogue';

const siteUrl = 'https://rendyn.dev';
const publicRoutes = [
  '/',
  '/components',
  '/pricing',
  '/blog/best-claude-code-templates',
  '/blog/best-cursor-templates',
  '/blog/how-to-design-an-app-with-chatgpt',
  '/guides/cursor-design',
  '/guides/how-to-build-a-good-looking-website-with-cursor',
  '/guides/how-to-build-a-website-with-vibe-coding',
  '/guides/how-to-design-a-website-with-chatgpt',
  '/guides/how-to-design-a-website-with-claude-code',
  '/guides/how-to-make-claude-code-better-at-design',
  '/guides/how-to-make-codex-better-at-design',
  '/guides/vibe-coding-design',
  '/guides/vibe-coding-templates',
  '/resources/how-to-design-a-website-with-chatgpt',
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
      lastModified: new Date('2026-08-31'),
      changeFrequency: route === '/' || route === '/components' ? 'weekly' as const : 'monthly' as const,
      priority: route === '/' ? 1 : route === '/components' ? 0.9 : 0.7,
    })),
    ...componentPages,
  ];
}
