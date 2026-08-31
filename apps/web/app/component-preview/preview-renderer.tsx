'use client';

import { useSyncExternalStore } from 'react';
import { externalPreviews } from '../../../preview/vendor-root/components/external-previews';
import { previews } from '../../../preview/vendor-root/components/previews';

interface PreviewRendererProps {
  description: string;
  name: string;
  previewKey: string;
}

const subscribe = () => () => {};

export function PreviewRenderer({ description, name, previewKey }: PreviewRendererProps) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) {
    return <div aria-label={`Loading ${name} preview`} role="status" />;
  }

  const Preview = previews[previewKey] ?? externalPreviews[previewKey];
  if (Preview) return <Preview />;

  return (
    <div style={{ maxWidth: '32rem', padding: '3rem', textAlign: 'center' }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>{name}</h1>
      <p style={{ color: 'var(--muted-foreground)' }}>{description}</p>
    </div>
  );
}
