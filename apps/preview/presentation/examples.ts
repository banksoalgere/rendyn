import { registry } from '../vendor-root/lib/registry';
import { externalRegistry } from '../generated/external-registry';

// Shared by the detail page and iframe route: a URL can only select an
// example that belongs to this component, never an arbitrary module.
export function getComponentExamples(category: string, slug: string) {
  if (slug === 'kibo-stories') return [
    { slug: 'images', name: 'Image stories', previewKey: 'kibo/kibo-stories', description: 'Image cards with author details. Swipe or use the arrows to browse; select a card to expand it.' },
    { slug: 'videos', name: 'Video stories', previewKey: 'kibo/kibo-stories-video', description: 'The same carousel with video cards. Select a card to play or pause. The sample clips are silent photo animations.' },
  ];
  const local = registry.find((item) => item.slug === category)?.components.find((item) => item.slug === slug);
  if (category === 'motion' && ['cylinder-carousel', 'shader-background', 'dock'].includes(slug) && local) return [
    { slug: 'default', name: 'Default', previewKey: `${category}/${slug}`, description: undefined },
    { slug: 'homepage', name: 'Compact', previewKey: `homepage/${slug}`, description: undefined },
  ];
  if (local?.examples?.length) return local.examples.map(({ slug, name, previewKey, description }) => ({ slug, name, previewKey, description }));
  const external = externalRegistry.find((item) => item.category === category && item.slug === slug);
  return [{ slug: 'default', name: 'Default', previewKey: external?.previewKey ?? `${category}/${slug}`, description: undefined }];
}
