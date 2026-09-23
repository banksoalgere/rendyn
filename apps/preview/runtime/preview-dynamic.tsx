'use client';

import { Component, lazy, Suspense, useEffect, useRef, useState, useSyncExternalStore, type ComponentType, type ReactNode } from 'react';

const subscribe = () => () => {};

function ReadyPreview({ Preview }: { Preview: ComponentType }) {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let disposed = false;
    let paint = 0;
    let settled = false;
    const notify = () => window.parent.postMessage({ type: 'rendyn:preview-ready' }, window.location.origin);
    const onMessage = (event: MessageEvent) => {
      if (event.source !== window.parent || event.origin !== window.location.origin
        || !event.data || typeof event.data !== 'object') return;
      if (settled && event.data.type === 'rendyn:preview-ready-request') notify();
      if (event.data.type === 'rendyn:preview-visibility' && typeof event.data.visible === 'boolean') {
        document.documentElement.dataset.previewPaused = String(!event.data.visible);
      }
    };
    window.addEventListener('message', onMessage);
    const assets = [document.fonts.ready, ...Array.from(root.current?.querySelectorAll('img') ?? [])
      .filter(image => image.loading !== 'lazy').map(image => image.decode().catch(() => undefined))];
    void Promise.all(assets).then(() => {
      if (disposed) return;
      paint = requestAnimationFrame(() => {
        paint = requestAnimationFrame(() => {
          if (disposed) return;
          settled = true;
          setReady(true);
          notify();
        });
      });
    });
    return () => { disposed = true; cancelAnimationFrame(paint); window.removeEventListener('message', onMessage); };
  }, []);
  return <div ref={root} style={{ display: 'contents' }} data-preview-ready={ready ? 'true' : undefined}><Preview /></div>;
}

function PreviewError() {
  useEffect(() => {
    const notify = () => window.parent.postMessage({ type: 'rendyn:preview-ready' }, window.location.origin);
    const onMessage = (event: MessageEvent) => {
      if (event.source === window.parent && event.origin === window.location.origin
        && event.data?.type === 'rendyn:preview-ready-request') notify();
    };
    window.addEventListener('message', onMessage);
    // Also answer a later host handshake if this error rendered before host hydration.
    notify();
    return () => window.removeEventListener('message', onMessage);
  }, []);
  return <div role="alert" data-preview-error="true">Preview unavailable. <button onClick={() => window.location.reload()}>Retry preview</button></div>;
}

class PreviewErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? <PreviewError /> : this.props.children;
  }
}

/** Registry loader: readiness is emitted only after this exact lazy demo commits. */
export default function previewDynamic(loader: () => Promise<ComponentType | { default: ComponentType }>, _options?: { ssr?: boolean }) {
  const Loaded = lazy(async () => {
    const module = await loader();
    const Preview = 'default' in module ? module.default : module;
    return { default: () => <ReadyPreview Preview={Preview} /> };
  });
  return function DynamicPreview() {
    const mounted = useSyncExternalStore(subscribe, () => true, () => false);
    if (!mounted) return <div role="status">Loading preview…</div>;
    return <PreviewErrorBoundary><Suspense fallback={<div role="status">Loading preview…</div>}><Loaded /></Suspense></PreviewErrorBoundary>;
  };
}
