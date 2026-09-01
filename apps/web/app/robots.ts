import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/account', '/component-preview/', '/login', '/oauth/'],
    },
    sitemap: 'https://rendyn.dev/sitemap.xml',
  };
}
