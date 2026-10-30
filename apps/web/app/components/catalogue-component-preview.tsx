'use client';

import { useEffect, useState, type ComponentType } from 'react';
import { ComponentPreview, type ComponentPreviewProps } from './component-preview';
import { PreviewErrorBoundary } from './preview-error-boundary';
import styles from './component-preview.module.css';

// These demos have been verified across documents. Other catalogue demos keep
// their own runtime, including integrations that depend on their window globals.
const loaders: Record<string, () => Promise<ComponentType>> = {
  'magicui-animated-beam': () => import('../../../preview/vendor-root/components/external-previews/magicui/upstream/animated-beam-demo').then(module => module.default),
  'magicui-globe': () => import('../../../preview/vendor-root/components/external-previews/magicui/upstream/globe-demo').then(module => module.default),
  tabs: () => import('../../../preview/vendor-root/components/previews/motion/tabs.preview').then(module => module.TabsPreview),
  'morphing-modal': () => import('../../../preview/vendor-root/components/previews/motion/morphing-modal.preview').then(module => module.MorphingModalPreview),
};

export function CatalogueComponentPreview(props: ComponentPreviewProps) {
  const id = props.component.previewId;
  const loader = Object.hasOwn(loaders, id) ? loaders[id] : undefined;
  const [loaded, setLoaded] = useState<{ id: string; Demo: ComponentType | null } | null>(null);
  useEffect(() => {
    if (!loader) return;
    let cancelled = false;
    void loader().then(
      Demo => { if (!cancelled) setLoaded({ id, Demo }); },
      () => { if (!cancelled) setLoaded({ id, Demo: null }); },
    );
    return () => { cancelled = true; };
  }, [id, loader]);

  if (!loader || (loaded?.id === id && !loaded.Demo)) return <ComponentPreview {...props} />;
  if (loaded?.id !== id) return <div className={styles.preview} aria-busy="true">
    <span className={styles.loading} role="status" aria-label={`Loading ${props.component.name}`}><span aria-hidden="true" /></span>
  </div>;
  const Demo = loaded.Demo!;
  return <ComponentPreview {...props} compact compactContent={
    <PreviewErrorBoundary><Demo /></PreviewErrorBoundary>
  } />;
}
