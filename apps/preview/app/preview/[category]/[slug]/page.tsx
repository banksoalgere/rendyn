import { notFound } from "next/navigation";
import { registry } from "@/lib/registry";
import { PreviewRenderer } from "../../../preview-renderer";

interface PreviewPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export function generateStaticParams() {
  return registry.flatMap((category) =>
    category.components.map((component) => ({ category: category.slug, slug: component.slug })),
  );
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { category: categorySlug, slug } = await params;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(categorySlug) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    notFound();
  }
  const category = registry.find((item) => item.slug === categorySlug);
  const component = category?.components.find((item) => item.slug === slug);
  if (!category || !component) notFound();

  const previewKey = component.examples?.[0]?.previewKey ?? `${category.slug}/${component.slug}`;

  return (
    <main className="preview-shell">
      <section
        className="preview-frame"
        data-preview-root
        data-component={component.slug}
        data-preview-key={previewKey}
        aria-label={`${component.name} interactive preview`}
      >
        <PreviewRenderer
          previewKey={previewKey}
          name={component.name}
          description={component.description}
        />
      </section>
    </main>
  );
}
