'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { ComponentPreviewData } from '../../lib/component-preview';
import styles from './component-preview.module.css';

interface ComponentPreviewProps {
  component: ComponentPreviewData;
  size?: 'card' | 'hero' | 'full';
  example?: string;
  dark?: boolean;
}

/** One isolated, automatically interactive preview for every catalogue surface. */
export function ComponentPreview({ component, size = 'full', example, dark = false }: ComponentPreviewProps) {
  const container = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const element = container.current;
    if (!element || size !== 'card') return;
    // Give every demo a usable layout width, including in a narrow mobile card.
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) {
        setScale(Math.min(1, entry.contentRect.width / 560));
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [size]);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let nearby = false;
    const update = () => {
      const nextActive = nearby || element.contains(document.activeElement);
      setActive(nextActive);
      if (!nextActive) setLoaded(false);
    };
    const observer = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      update();
    }, { rootMargin: '160px 0px' });

    observer.observe(element);
    // Focus inside an iframe does not bubble as a React focus event.
    // Keep that document alive until focus returns to the surrounding page.
    window.addEventListener('focus', update);
    document.addEventListener('focusin', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('focus', update);
      document.removeEventListener('focusin', update);
    };
  }, []);

  return (
    <div
      className={styles.preview}
      data-size={size}
      data-loaded={active && loaded}
      ref={container}
      style={size === 'card' ? { '--preview-scale': scale } as CSSProperties : undefined}
    >
      {component.previewImage ? (
        <img className={styles.poster} src={component.previewImage} alt={`${component.name} preview`} loading="lazy" decoding="async" />
      ) : (
        <span className={styles.placeholder}>{component.name}</span>
      )}
      {active && (
        <iframe
          key={component.previewId}
          src={`/component-preview/${encodeURIComponent(component.previewId)}?embed=1${example ? `&example=${encodeURIComponent(example)}` : ''}${dark ? '&theme=dark' : ''}`}
          title={`${component.name} interactive preview`}
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
}
