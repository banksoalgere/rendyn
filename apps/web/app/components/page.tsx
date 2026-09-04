import type { Metadata } from 'next';
import { catalogueEntries } from '../../lib/catalogue';
import { getComponentPreview } from '../../lib/component-preview';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { ComponentExplorer, type CatalogueComponent } from './component-explorer';
import styles from './components.module.css';

export const metadata: Metadata = {
  title: 'Live component catalogue | Rendyn',
  description: 'Browse 189 interactive React component examples, each with a dedicated live preview, usage guidance, and complete editable source.',
  alternates: { canonical: '/components' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Live React component catalogue | Rendyn',
    description: 'Browse 189 interactive React component examples with live previews, usage guidance, and complete editable source.',
    type: 'website',
    url: '/components',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live React component catalogue | Rendyn',
    description: 'Browse 189 interactive React component examples with live previews, usage guidance, and complete editable source.',
    images: ['/og.png'],
  },
};

const featuredComponents = [
  'magicui-animated-beam',
  'kibo-kanban',
  'approval-card',
  'magicui-bento-grid',
  'kibo-gantt',
  'wallet-card',
  'magicui-terminal',
  'kibo-editor',
  'morphing-modal',
];

const catalogueComponents: CatalogueComponent[] = [...catalogueEntries].sort((left, right) => {
  const leftPriority = featuredComponents.indexOf(left.slug);
  const rightPriority = featuredComponents.indexOf(right.slug);
  if (leftPriority >= 0 || rightPriority >= 0) {
    if (leftPriority < 0) return 1;
    if (rightPriority < 0) return -1;
    return leftPriority - rightPriority;
  }
  return left.name.localeCompare(right.name);
}).map((component) => ({
  category: component.category as CatalogueComponent['category'],
  description: component.description,
  ...getComponentPreview(component),
  tags: component.metadata.tags,
}));

interface ComponentsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ComponentsPage({ searchParams }: ComponentsPageProps) {
  const parameters = await searchParams;
  const requestedCategory = typeof parameters.category === 'string' ? parameters.category : 'all';
  const initialCategory = ['motion', 'agents', 'blocks'].includes(requestedCategory) ? requestedCategory : 'all';

  return (
    <main className={styles.page}>
      <div className={styles.headerShell}><SiteHeader activeSection="catalogue" /></div>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>The collection <span> / {catalogueComponents.length} components</span></p>
          <h1>Find your next <em>great interface.</em></h1>
          <p>Explore the details. Try the interaction. Make it yours.</p>
        </div>
        <div className={styles.heroNote}>
          <span>React · TypeScript · Tailwind</span>
          <p>Free to explore. Complete source with your trial.</p>
        </div>
      </section>

      <ComponentExplorer
        components={catalogueComponents}
        initialCategory={initialCategory}
      />

      <section className={styles.catalogueCta}>
        <p>Found the right direction?</p>
        <h2>Let your coding agent<br />take it from here.</h2>
        <a className="button" href="/pricing">Start 7-day trial <span aria-hidden="true">→</span></a>
      </section>
      <SiteFooter />
    </main>
  );
}
