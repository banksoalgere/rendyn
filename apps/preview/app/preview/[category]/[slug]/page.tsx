import { notFound } from "next/navigation";
import { registry } from "@/lib/registry";
import { externalRegistry } from "../../../../generated/external-registry";
import { PreviewRenderer } from "../../../preview-renderer";

interface PreviewPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export function generateStaticParams() {
  return [
    ...registry.flatMap((category) =>
      category.components.map((component) => ({ category: category.slug, slug: component.slug })),
    ),
    ...externalRegistry.map((component) => ({
      category: component.category,
      slug: component.slug,
    })),
  ];
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { category: categorySlug, slug } = await params;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(categorySlug) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    notFound();
  }
  const category = registry.find((item) => item.slug === categorySlug);
  const localComponent = category?.components.find((item) => item.slug === slug);
  const externalComponent = externalRegistry.find(
    (item) => item.category === categorySlug && item.slug === slug,
  );
  if (!localComponent && !externalComponent) notFound();
  const name = externalComponent?.name ?? localComponent?.name;
  const description = externalComponent?.description ?? localComponent?.description;
  const componentSlug = externalComponent?.slug ?? localComponent?.slug;
  if (!name || !description || !componentSlug) notFound();
  const previewKey = externalComponent?.previewKey
    ?? localComponent?.examples?.[0]?.previewKey
    ?? `${categorySlug}/${componentSlug}`;

  return (
    <main className="preview-shell">
      <section
        className="preview-frame"
        data-preview-root
        data-component={componentSlug}
        data-preview-key={previewKey}
        aria-label={`${name} interactive preview`}
      >
        <PreviewRenderer
          previewKey={previewKey}
          name={name}
          description={description}
        />
      </section>
    </main>
  );
}
