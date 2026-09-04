'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import styles from './component-page.module.css';

const storageKey = 'rendyn:component-nav-scroll';

export function ComponentNavScroll({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    // Native page navigation remounts the menu; remember its position per tab.
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? 'null');
      if (saved && Number.isFinite(saved.top) && Number.isFinite(saved.left)
        && saved.top >= 0 && saved.left >= 0) {
        element.scrollTop = saved.top;
        element.scrollLeft = saved.left;
      }
    } catch {
      // Navigation still works when browser storage is unavailable.
    }

    const savePosition = () => {
      try {
        sessionStorage.setItem(storageKey, JSON.stringify({
          top: element.scrollTop,
          left: element.scrollLeft,
        }));
      } catch {
        // Storage may be disabled or full.
      }
    };

    window.addEventListener('pagehide', savePosition);
    return () => {
      savePosition();
      window.removeEventListener('pagehide', savePosition);
    };
  }, []);

  return <div className={styles.navScroll} ref={scrollRef}>{children}</div>;
}
