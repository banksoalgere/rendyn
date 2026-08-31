'use client';

import {
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';

export type PortalLayout = {
  trigger: { left: number; top: number; width: number; height: number };
  content: { width: number; height: number };
};

function sameLayout(current: PortalLayout | null, next: PortalLayout) {
  return current?.trigger.left === next.trigger.left
    && current.trigger.top === next.trigger.top
    && current.trigger.width === next.trigger.width
    && current.trigger.height === next.trigger.height
    && current.content.width === next.content.width
    && current.content.height === next.content.height;
}

/** Measures a trigger and portalled panel in viewport coordinates. */
export function usePopoverPortalPosition(
  trigger: HTMLElement | null,
  content: HTMLElement | null,
  active: boolean,
) {
  const [layout, setLayout] = useState<PortalLayout | null>(null);

  const update = useCallback(() => {
    if (!trigger || !content) return;

    const rect = trigger.getBoundingClientRect();
    const next: PortalLayout = {
      trigger: { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
      content: { width: content.offsetWidth, height: content.offsetHeight },
    };
    setLayout((current) => (sameLayout(current, next) ? current : next));
  }, [content, trigger]);

  useLayoutEffect(() => {
    if (!active) return;

    const observer = new ResizeObserver(update);
    const frame = window.requestAnimationFrame(update);
    if (trigger) observer.observe(trigger);
    if (content) observer.observe(content);

    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [active, content, trigger, update]);

  return layout;
}
