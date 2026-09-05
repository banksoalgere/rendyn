import type { ReactNode } from 'react';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';
import styles from './guides.module.css';

export function GuidesLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <SiteHeader activeSection="resources" />
      <div className={styles.articles}>{children}</div>
      <SiteFooter />
    </div>
  );
}
