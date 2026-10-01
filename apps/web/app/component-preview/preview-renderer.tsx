'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { externalPreviews } from '../../../preview/vendor-root/components/external-previews';
import { previews } from '../../../preview/vendor-root/components/previews';
import { presentationPreviews } from '../../../preview/presentation';

interface PreviewRendererProps {
  description: string;
  name: string;
  previewKey: string;
  dark?: boolean;
}

const subscribe = () => () => {};

export function PreviewRenderer({ description, name, previewKey, dark = false }: PreviewRendererProps) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    return () => {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = '';
    };
  }, [dark]);


  if (!mounted) {
    return <div aria-label={`Loading ${name} preview`} role="status" />;
  }

  const Preview = presentationPreviews[previewKey] ?? previews[previewKey] ?? externalPreviews[previewKey];
  if (Preview) return <Preview />;

  return (
    <div style={{ maxWidth: '32rem', padding: '3rem', textAlign: 'center' }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>{name}</h1>
      <p style={{ color: 'var(--muted-foreground)' }}>{description}</p>
    </div>
  );
}
