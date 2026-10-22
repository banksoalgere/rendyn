import { createRoot } from 'react-dom/client';
import { Component, useEffect, type ComponentType, type ReactNode } from 'react';
import { HomeCarouselPreview, HomeShaderPreview, HomeDockPreview } from '../../preview/presentation/homepage';
import AnimatedBeam from '../../preview/vendor-root/components/external-previews/magicui/upstream/animated-beam-demo';
import Globe from '../../preview/vendor-root/components/external-previews/magicui/upstream/globe-demo';
import { MorphingModalPreview } from '../../preview/vendor-root/components/previews/motion/morphing-modal.preview';
import { TabsPreview } from '../../preview/vendor-root/components/previews/motion/tabs.preview';
import { ApprovalCardQuestionPreview } from '../../preview/vendor-root/components/previews/agents/approval-card-question.preview';
import '../../preview/app/globals.css';
import '../app/component-preview/embedded.css';

// Only these reviewed demos may run in the small homepage document. Never turn
// a URL or postMessage value into a module path or executable source.
const previews: Record<string, ComponentType> = {
  'cylinder-carousel': HomeCarouselPreview,
  'shader-background': HomeShaderPreview,
  dock: HomeDockPreview,
  'magicui-animated-beam': AnimatedBeam,
  'magicui-globe': Globe,
  'morphing-modal': MorphingModalPreview,
  tabs: TabsPreview,
  'approval-card': ApprovalCardQuestionPreview,
};

class PreviewErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed
      ? <div role="alert" data-preview-error="true">Preview unavailable. <button onClick={() => this.setState({ failed: false })}>Retry preview</button></div>
      : this.props.children;
  }
}

function Preview({ Demo }: { Demo: ComponentType }) {
  useEffect(() => {
    let disposed = false;
    let paint = 0;
    let ready = false;
    const notify = () => window.parent.postMessage({ type: 'rendyn:preview-ready' }, window.parent.location.origin);
    const onMessage = (event: MessageEvent) => {
      if (event.source !== window.parent || event.origin !== window.parent.location.origin
        || !event.data || typeof event.data !== 'object') return;
      if (ready && event.data.type === 'rendyn:preview-ready-request') notify();
      if (event.data.type === 'rendyn:preview-visibility' && typeof event.data.visible === 'boolean') {
        document.documentElement.dataset.previewPaused = String(!event.data.visible);
      }
    };
    window.addEventListener('message', onMessage);
    void document.fonts.ready.then(() => {
      if (disposed) return;
      paint = requestAnimationFrame(() => {
        paint = requestAnimationFrame(() => {
          if (disposed) return;
          ready = true;
          notify();
        });
      });
    });
    return () => { disposed = true; cancelAnimationFrame(paint); window.removeEventListener('message', onMessage); };
  }, []);
  return <PreviewErrorBoundary><Demo /></PreviewErrorBoundary>;
}

const frame = window.frameElement;
const key = frame?.getAttribute('data-home-preview') ?? '';
const Demo = Object.hasOwn(previews, key) ? previews[key] : undefined;
if (Demo) {
  const dark = frame?.getAttribute('data-preview-dark') === 'true';
  document.documentElement.classList.toggle('dark', dark);
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  createRoot(document.getElementById('preview')!).render(<Preview Demo={Demo} />);
}
