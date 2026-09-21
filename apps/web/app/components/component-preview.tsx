'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { ComponentPreviewData } from '../../lib/component-preview';
import { isPreviewReadyMessage, PREVIEW_READY_REQUEST } from '../../lib/preview-ready';
import styles from './component-preview.module.css';

interface ComponentPreviewProps {
  component: ComponentPreviewData;
  size?: 'card' | 'hero' | 'full';
  example?: string;
  dark?: boolean;
  priority?: boolean;
}

/** One isolated, automatically interactive preview for every catalogue surface. */
export function ComponentPreview({ component, size = 'full', example, dark = false, priority = false }: ComponentPreviewProps) {
  const container = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  // The first gallery preview and detail preview can start fetching from the
  // server-rendered HTML, without waiting for the parent page to hydrate.
  const [active, setActive] = useState(priority || size === 'full');
  const [readySource, setReadySource] = useState<string | null>(null);
  const [scale, setScale] = useState(size === 'hero' ? 0.9 : 1);
  const source = `/component-preview/${encodeURIComponent(component.previewId)}?embed=1${example ? `&example=${encodeURIComponent(example)}` : ''}${dark ? '&theme=dark' : ''}`;
  const ready = active && readySource === source;

  function requestReadiness() {
    frame.current?.contentWindow?.postMessage({ type: PREVIEW_READY_REQUEST }, window.location.origin);
  }

  useEffect(() => {
    const onReady = (event: MessageEvent<unknown>) => {
      if (isPreviewReadyMessage(event, frame.current?.contentWindow, window.location.origin)) {
        setReadySource(source);
      }
    };
    window.addEventListener('message', onReady);
    // An eager iframe may finish before this page hydrates. Ask it to replay
    // readiness after our listener is attached so that signal cannot be lost.
    requestReadiness();
    return () => window.removeEventListener('message', onReady);
  }, [source]);

  useEffect(() => {
    const element = container.current;
    if (!element || size === 'full') return;
    // Give every demo a usable layout width, including in a narrow mobile card.
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) {
        setScale(Math.min(size === 'hero' ? 0.9 : 1, entry.contentRect.width / 560));
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
      if (!nextActive) setReadySource(null);
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
      data-loaded={ready}
      data-dark={dark}
      aria-busy={active && !ready}
      ref={container}
      style={size !== 'full' ? { '--preview-scale': scale } as CSSProperties : undefined}
    >
      {active && !ready && (
        <span className={styles.loading} role="status" aria-label={`Loading ${component.name}`}>
          <span aria-hidden="true" />
        </span>
      )}
      {active && (
        <iframe
          key={source}
          ref={frame}
          onLoad={requestReadiness}
          src={source}
          title={`${component.name} interactive preview`}
          sandbox="allow-scripts allow-same-origin"
          tabIndex={ready ? 0 : -1}
          aria-hidden={!ready}
        />
      )}
    </div>
  );
}
