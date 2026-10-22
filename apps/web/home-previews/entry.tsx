import { Component, type ComponentType, type ReactNode } from 'react';
import { HomeCarouselPreview, HomeShaderPreview, HomeDockPreview } from '../../preview/presentation/homepage';
import AnimatedBeam from '../../preview/vendor-root/components/external-previews/magicui/upstream/animated-beam-demo';
import Globe from '../../preview/vendor-root/components/external-previews/magicui/upstream/globe-demo';
import { MorphingModalPreview } from '../../preview/vendor-root/components/previews/motion/morphing-modal.preview';
import { TabsPreview } from '../../preview/vendor-root/components/previews/motion/tabs.preview';

// Only these reviewed demos may run in the small homepage document. Never turn
// a URL or postMessage value into a module path or executable source.
export const previews: Record<string, ComponentType> = {
  'cylinder-carousel': HomeCarouselPreview,
  'shader-background': HomeShaderPreview,
  dock: HomeDockPreview,
  'magicui-animated-beam': AnimatedBeam,
  'magicui-globe': Globe,
  'morphing-modal': MorphingModalPreview,
  tabs: TabsPreview,
};

export class PreviewErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed
      ? <div role="alert" data-preview-error="true">Preview unavailable. <button onClick={() => this.setState({ failed: false })}>Retry preview</button></div>
      : this.props.children;
  }
}
