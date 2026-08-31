import { notFound } from 'next/navigation';
import catalog from '../../../../../catalog/index.json';
import { externalRegistry } from '../../../../preview/generated/external-registry';
import { registry } from '../../../../preview/vendor-root/lib/registry';
import { PreviewRenderer } from '../preview-renderer';

interface PreviewPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return catalog.components.map((_, index) => ({
    id: String(index + 1).padStart(3, '0'),
  }));
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { id } = await params;
  if (!/^\d{3}$/.test(id)) notFound();

  const component = catalog.components[Number(id) - 1];
  if (!component) notFound();

  const category = registry.find((item) => item.slug === component.category);
  const localComponent = category?.components.find((item) => item.slug === component.slug);
  const externalComponent = externalRegistry.find(
    (item) => item.category === component.category && item.slug === component.slug,
  );
  if (!localComponent && !externalComponent) notFound();

  const previewKey = externalComponent?.previewKey
    ?? localComponent?.examples?.[0]?.previewKey
    ?? `${component.category}/${component.slug}`;

  return (
    <main className="preview-shell">
      <section
        aria-label={`${component.name} interactive preview`}
        className="preview-frame"
        data-preview-root
      >
        <PreviewRenderer
          description={component.description}
          name={component.name}
          previewKey={previewKey}
        />
      </section>
    </main>
  );
}
