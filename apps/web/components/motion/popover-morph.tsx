'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  cloneElement,
  createContext,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type Ref,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
import { createPortal } from 'react-dom';
import { usePopoverPortalPosition } from '@/components/motion/popover-position';
import { EASE_OUT, SPRING_PANEL } from '@/lib/ease';
import { cn } from '@/lib/utils';

type Side = 'top' | 'bottom';
type Align = 'start' | 'end';

type MorphContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  triggerId: string;
  contentId: string;
  trigger: HTMLElement | null;
  registerTrigger: (node: HTMLElement | null) => void;
  content: HTMLDivElement | null;
  registerContent: (node: HTMLDivElement | null) => void;
};

const MorphContext = createContext<MorphContextValue | null>(null);

function useMorphContext(component: string) {
  const context = useContext(MorphContext);
  if (!context) throw new Error(`${component} must be used within <MorphPopover>`);
  return context;
}

const subscribeToClient = () => () => {};

function usePortalReady() {
  return useSyncExternalStore(subscribeToClient, () => true, () => false);
}

export function MorphPopover({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className,
}: {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}) {
  const baseId = useId();
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const [content, setContent] = useState<HTMLDivElement | null>(null);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const controlled = controlledOpen !== undefined;
  const open = controlled ? controlledOpen : internalOpen;

  const setOpen = useCallback((next: boolean) => {
    if (!controlled) setInternalOpen(next);
    onOpenChange?.(next);
  }, [controlled, onOpenChange]);
  const toggle = useCallback(() => setOpen(!open), [open, setOpen]);
  const anchor = trigger ?? root;

  const close = useCallback(() => {
    setOpen(false);
    const focused = document.activeElement;
    if (!(focused instanceof HTMLElement) || !content?.contains(focused)) return;
    (trigger ?? (root && root.tabIndex >= 0 ? root : null))?.focus();
  }, [content, root, setOpen, trigger]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && close();
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (root && !root.contains(target) && !content?.contains(target)) close();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
    };
  }, [close, content, open, root]);

  const value = useMemo<MorphContextValue>(() => ({
    open,
    setOpen,
    toggle,
    triggerId: `${baseId}-trigger`,
    contentId: `${baseId}-content`,
    trigger: anchor,
    registerTrigger: setTrigger,
    content,
    registerContent: setContent,
  }), [anchor, baseId, content, open, setOpen, toggle]);

  return <MorphContext.Provider value={value}><div ref={setRoot} className={cn(className)}>{children}</div></MorphContext.Provider>;
}

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(node);
      else if (ref && typeof ref === 'object') (ref as React.MutableRefObject<T | null>).current = node;
    }
  };
}

export function MorphPopoverTrigger({ children }: { children: ReactElement }) {
  const context = useMorphContext('MorphPopoverTrigger');
  if (!isValidElement(children)) return children;

  const child = children as ReactElement<Record<string, unknown>>;
  const childOnClick = child.props.onClick as ((event: unknown) => void) | undefined;
  const childRef = (child.props as { ref?: Ref<HTMLElement> }).ref;

  return cloneElement(child, {
    id: context.triggerId,
    ref: mergeRefs(childRef, context.registerTrigger),
    onClick: (event: unknown) => {
      childOnClick?.(event);
      context.toggle();
    },
    'aria-haspopup': 'dialog',
    'aria-expanded': context.open,
    'aria-controls': context.open ? context.contentId : undefined,
    'data-state': context.open ? 'open' : 'closed',
  });
}

const originFor = (side: Side, align: Align) => `${side === 'bottom' ? 'top' : 'bottom'} ${align === 'end' ? 'right' : 'left'}`;
const clipHidden = (side: Side, align: Align, radius: number) => `inset(${side === 'bottom' ? '0%' : '92%'} ${align === 'end' ? '0%' : '92%'} ${side === 'bottom' ? '92%' : '0%'} ${align === 'end' ? '92%' : '0%'} round ${radius}px)`;
const clipShown = (radius: number) => `inset(0% 0% 0% 0% round ${radius}px)`;
const CLIP_TRANSITION = { duration: 0.32, ease: EASE_OUT } as const;

export function MorphPopoverContent({
  children,
  side = 'bottom',
  align = 'end',
  sideOffset = 8,
  radius = 16,
  className,
}: {
  children: ReactNode;
  side?: Side;
  align?: Align;
  sideOffset?: number;
  radius?: number;
  className?: string;
}) {
  const {
    content,
    contentId,
    open,
    registerContent,
    trigger,
    triggerId,
  } = useMorphContext('MorphPopoverContent');
  const reduce = useReducedMotion() ?? false;
  const portalReady = usePortalReady();
  const layout = usePopoverPortalPosition(trigger, content, portalReady && open);

  const left = layout ? (align === 'end' ? layout.trigger.left + layout.trigger.width - layout.content.width : layout.trigger.left) : 0;
  const top = layout ? (side === 'bottom' ? layout.trigger.top + layout.trigger.height + sideOffset : layout.trigger.top - layout.content.height - sideOffset) : 0;
  const wrapper = reduce ? undefined : {
    hidden: { opacity: 0, scale: 0.96, transition: SPRING_PANEL },
    show: { opacity: 1, scale: 1, transition: SPRING_PANEL },
  };
  const clip = reduce ? undefined : {
    hidden: { clipPath: clipHidden(side, align, radius), transition: CLIP_TRANSITION },
    show: { clipPath: clipShown(radius), transition: CLIP_TRANSITION },
  };

  if (!portalReady) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          data-morph-popover-portal=""
          variants={wrapper}
          initial={reduce ? { opacity: 0 } : 'hidden'}
          animate={reduce ? { opacity: 1 } : 'show'}
          exit={reduce ? { opacity: 0 } : 'hidden'}
          transition={reduce ? { duration: 0.12 } : undefined}
          style={{ left, top, visibility: layout ? 'visible' : 'hidden', transformOrigin: originFor(side, align) }}
          className="morph-popover__portal"
        >
          <motion.div
            ref={registerContent}
            id={contentId}
            role="dialog"
            aria-labelledby={triggerId}
            variants={clip}
            style={{ borderRadius: radius }}
            className={cn(className)}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
