const MAX_SAVED_COMPONENTS = 500;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function readSavedComponents(value: string | null): string[] {
  if (!value || value.length > 131_072) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return [...new Set(parsed.filter((slug): slug is string => (
      typeof slug === 'string' && slug.length <= 200 && SLUG_PATTERN.test(slug)
    )))].slice(0, MAX_SAVED_COMPONENTS);
  } catch {
    return [];
  }
}

export function toggleSavedComponent(saved: string[], slug: string): string[] {
  if (slug.length > 200 || !SLUG_PATTERN.test(slug)) return saved;
  if (saved.includes(slug)) return saved.filter(item => item !== slug);
  return [...saved, slug].slice(-MAX_SAVED_COMPONENTS);
}
