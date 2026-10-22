'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { ComponentPreviewData } from '../../lib/component-preview';
import { isPreviewReadyMessage, PREVIEW_READY_REQUEST } from '../../lib/preview-ready';
import styles from './component-preview.module.css';

const homePreviewIds = new Set(['cylinder-carousel', 'shader-background', 'dock', 'magicui-animated-beam', 'magicui-globe', 'morphing-modal', 'tabs', 'approval-card']);
let homeDocument: Promise<string> | undefined;

function loadHomeDocument() {
  homeDocument ??= fetch('/home-previews.txt', { cache: 'no-cache', credentials: 'same-origin', redirect: 'error' }).then(async (response) => {
    if (!response.ok || response.headers.get('content-type')?.split(';')[0].trim() !== 'text/plain') {
      throw new Error('Homepage preview document unavailable');
    }
    return response.text();
  }).catch((error) => { homeDocument = undefined; throw error; });
  return homeDocument;
}

interface ComponentPreviewProps {
  component: ComponentPreviewData;
  size?: 'card' | 'hero' | 'full';
  example?: string;
  dark?: boolean;
  priority?: boolean;
  compact?: boolean;
}

/** One isolated, automatically interactive preview for every catalogue surface. */
export function ComponentPreview({ component, size = 'full', example, dark = false, priority = false, compact = false }: ComponentPreviewProps) {
  const container = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const visible = useRef(true);
  // The first gallery preview and detail preview can start fetching from the
  // server-rendered HTML, without waiting for the parent page to hydrate.
  const [active, setActive] = useState(priority || size === 'full');
  const [readySource, setReadySource] = useState<string | null>(null);
  const [scale, setScale] = useState(size === 'hero' ? 0.9 : 1);
  const source = `/component-preview/${encodeURIComponent(component.previewId)}?embed=1${example ? `&example=${encodeURIComponent(example)}` : ''}${dark ? '&theme=dark' : ''}`;
  const ready = active && readySource === source;
  const useCompact = compact && homePreviewIds.has(component.previewId);
  const [previewDocument, setPreviewDocument] = useState<string | null>(null);
  const [documentFailed, setDocumentFailed] = useState(false);

  useEffect(() => {
    if (!active || !useCompact) return;
    let cancelled = false;
    void loadHomeDocument().then(
      (html) => { if (!cancelled) setPreviewDocument(html); },
      () => { if (!cancelled) setDocumentFailed(true); },
    );
    return () => { cancelled = true; };
  }, [active, useCompact]);

  function requestReadiness() {
    frame.current?.contentWindow?.postMessage({ type: PREVIEW_READY_REQUEST }, window.location.origin);
  }

  useEffect(() => {
    const onReady = (event: MessageEvent<unknown>) => {
      if (isPreviewReadyMessage(event, frame.current?.contentWindow, window.location.origin)) {
        setReadySource(source);
        frame.current?.contentWindow?.postMessage({ type: 'rendyn:preview-visibility', visible: visible.current }, window.location.origin);
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
      frame.current?.contentWindow?.postMessage({ type: 'rendyn:preview-visibility', visible: nearby }, window.location.origin);
      if (size === 'full') return;
      // Load once on approach; scrolling away must preserve the document and demo state.
      if (nearby) setActive(true);
    };
    const observer = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      visible.current = nearby;
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
  }, [size]);

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
      {active && (!useCompact || previewDocument || documentFailed) && (
        <iframe
          key={source}
          ref={frame}
          onLoad={requestReadiness}
          src={useCompact && previewDocument ? undefined : source}
          srcDoc={useCompact && previewDocument ? previewDocument : undefined}
          data-home-preview={component.previewId}
          data-preview-dark={dark}
          title={`${component.name} interactive preview`}
          sandbox="allow-scripts allow-same-origin"
          tabIndex={ready ? 0 : -1}
          aria-hidden={!ready}
        />
      )}
    </div>
  );
}
