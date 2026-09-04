'use client';

import { useEffect, useRef, useState } from 'react';
import type { ComponentPreviewData } from '../../lib/component-preview';
import styles from './component-preview.module.css';

interface ComponentPreviewProps {
  component: ComponentPreviewData;
  size?: 'card' | 'hero' | 'full';
}

/** One isolated, automatically interactive preview for every catalogue surface. */
export function ComponentPreview({ component, size = 'full' }: ComponentPreviewProps) {
  const container = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let nearby = false;
    const update = () => setActive(nearby || element.contains(document.activeElement));
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
      ref={container}
    >
      {active ? (
        <iframe
          key={component.previewId}
          src={`/component-preview/${encodeURIComponent(component.previewId)}?embed=1`}
          title={`${component.name} interactive preview`}
          sandbox="allow-scripts allow-same-origin"
        />
      ) : component.previewImage ? (
        <img src={component.previewImage} alt={`${component.name} preview`} loading="lazy" decoding="async" />
      ) : (
        <span className={styles.placeholder}>{component.name}</span>
      )}
    </div>
  );
}
