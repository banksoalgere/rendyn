import { notFound } from 'next/navigation';
import { findCatalogueEntry } from '../../../../lib/catalogue';
import { getComponentPreview } from '../../../../lib/component-preview';
import { ComponentPreview } from '../../../components/component-preview';
import { ComponentCodePanel } from '../../../components/[componentSlug]/component-code-panel';
import { SaveComponentButton } from '../../save-component-button';
import styles from '../../workspace.module.css';

export default async function WorkspaceComponentPage({ params }: { params: Promise<{ componentSlug: string }> }) {
  const { componentSlug } = await params;
  const component = findCatalogueEntry(componentSlug);
  if (!component) notFound();
  return <>
    <a className={styles.backLink} href="/app">← All components</a>
    <div className={styles.pageHeading}><div><p className={styles.eyebrow}>{component.categoryLabel}</p><h1>{component.name}</h1><p>{component.description}</p></div><SaveComponentButton slug={component.publicSlug} name={component.name} /></div>
    <section className={styles.previewWorkbench} aria-label="Live component preview"><ComponentPreview component={getComponentPreview(component)} size="full" priority /></section>
    <section className={styles.sourceSection} id="component-code" aria-labelledby="source-title"><h2 id="source-title">Make it yours</h2><p>Complete source, dependencies and installation instructions.</p><ComponentCodePanel slug={component.publicSlug} /></section>
  </>;
}
