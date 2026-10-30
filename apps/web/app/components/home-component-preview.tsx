'use client';

import { LayoutGroup } from 'motion/react';
import { previews, PreviewErrorBoundary } from '../../home-previews/entry';
import { ComponentPreview, type ComponentPreviewProps } from './component-preview';

/** Share runtime code only for the reviewed homepage demos. */
export function HomeComponentPreview(props: ComponentPreviewProps) {
  const Demo = Object.hasOwn(previews, props.component.previewId) ? previews[props.component.previewId] : undefined;
  return <ComponentPreview {...props} compact={Boolean(Demo)} compactContent={Demo ? (
    <PreviewErrorBoundary><LayoutGroup id={props.component.previewId}><Demo /></LayoutGroup></PreviewErrorBoundary>
  ) : undefined} />;
}
