import { notFound } from 'next/navigation';
import catalog from '../../../../../catalog/index.json';
import legacyPreviewIds from '../../../lib/legacy-preview-ids.json';
import { externalRegistry } from '../../../../preview/generated/external-registry';
import { registry } from '../../../../preview/vendor-root/lib/registry';
import { PreviewRenderer } from '../preview-renderer';
import { getComponentExamples } from '../../../../preview/presentation/examples';

interface PreviewPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ embed?: string | string[]; example?: string | string[]; theme?: string | string[] }>;
}

export function generateStaticParams() {
  return catalog.components.map((component) => ({
    id: component.slug,
  }));
}

export default async function PreviewPage({ params, searchParams }: PreviewPageProps) {
  const { id } = await params;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || id.length > 160) notFound();
  const slug = Object.hasOwn(legacyPreviewIds, id) ? legacyPreviewIds[id as keyof typeof legacyPreviewIds] : id;
  const component = catalog.components.find(component => component.slug === slug);
  if (!component) notFound();
  const query = await searchParams;
  const embedded = query.embed === '1';

  const category = registry.find((item) => item.slug === component.category);
  const localComponent = category?.components.find((item) => item.slug === component.slug);
  const externalComponent = externalRegistry.find(
    (item) => item.category === component.category && item.slug === component.slug,
  );
  if (!localComponent && !externalComponent) notFound();

  const examples = getComponentExamples(component.category, component.slug);
  const previewKey = (examples.find((example) => example.slug === query.example) ?? examples[0]).previewKey;

  return (
    <main className={embedded ? 'preview-shell preview-shell--embedded' : 'preview-shell'}>
      <section
        aria-label={`${component.name} interactive preview`}
        className="preview-frame"
        data-preview-root
      >
        <PreviewRenderer
          description={component.description}
          name={component.name}
          previewKey={previewKey}
          dark={query.theme === 'dark'}
        />
      </section>
    </main>
  );
}
