'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, type ReactNode } from 'react';
import { EASE_OUT, SPRING_PANEL } from '@/lib/ease';
import { PresenceGate } from '@/lib/presence-gate';
import { cn } from '@/lib/utils';

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: 'left' | 'right';
  children: ReactNode;
  className?: string;
  backdropClassName?: string;
  ariaLabel?: string;
  dismissable?: boolean;
  id?: string;
}

export function Drawer({
  open,
  onOpenChange,
  side = 'right',
  children,
  className,
  backdropClassName,
  ariaLabel,
  dismissable = true,
  id,
}: DrawerProps) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusPanel = window.requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>(focusableSelector)?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(focusableSelector));
      if (focusable.length === 0) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusPanel);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open, onOpenChange]);

  const offscreen = side === 'right' ? '100%' : '-100%';

  return (
    <AnimatePresence>
      {open ? (
        <PresenceGate key="backdrop">
          {({ gate }) => (
            <motion.button
              aria-label="Close menu"
              className={cn(
                'fixed inset-0 z-50 h-full w-full cursor-default bg-black/40 backdrop-blur-sm',
                backdropClassName,
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dismissable && onOpenChange(false)}
              tabIndex={-1}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              type="button"
              {...gate}
            />
          )}
        </PresenceGate>
      ) : null}
      {open ? (
        <PresenceGate key="panel">
          {({ gate }) => (
            <motion.aside
              aria-label={ariaLabel}
              aria-modal="true"
              className={cn(
                'fixed inset-y-0 z-50 flex w-80 max-w-[85vw] flex-col bg-background shadow-2xl',
                side === 'right' ? 'right-0 border-l border-border' : 'left-0 border-r border-border',
                className,
              )}
              id={id}
              initial={reduce ? { opacity: 0 } : { x: offscreen }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: offscreen }}
              ref={panelRef}
              role="dialog"
              tabIndex={-1}
              transition={reduce ? { duration: 0.2, ease: EASE_OUT } : SPRING_PANEL}
              {...gate}
            >
              {children}
            </motion.aside>
          )}
        </PresenceGate>
      ) : null}
    </AnimatePresence>
  );
}
