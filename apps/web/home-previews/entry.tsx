import type { ComponentType } from 'react';
export { PreviewErrorBoundary } from '../app/components/preview-error-boundary';
import { HomeCarouselPreview, HomeShaderPreview } from '../../preview/presentation/homepage';
import { ExpandableControlPreview } from '../../preview/vendor-root/components/previews/motion/expandable-control.preview';
import AnimatedBeam from '../../preview/vendor-root/components/external-previews/magicui/upstream/animated-beam-demo';
import Globe from '../../preview/vendor-root/components/external-previews/magicui/upstream/globe-demo';
import { MorphingModalPreview } from '../../preview/vendor-root/components/previews/motion/morphing-modal.preview';
import { TabsPreview } from '../../preview/vendor-root/components/previews/motion/tabs.preview';

// Only these reviewed demos may run in the small homepage document. Never turn
// a URL or postMessage value into a module path or executable source.
export const previews: Record<string, ComponentType> = {
  'cylinder-carousel': HomeCarouselPreview,
  'shader-background': HomeShaderPreview,
  'expandable-control': ExpandableControlPreview,
  'magicui-animated-beam': AnimatedBeam,
  'magicui-globe': Globe,
  'morphing-modal': MorphingModalPreview,
  tabs: TabsPreview,
};
