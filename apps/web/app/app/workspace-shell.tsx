'use client';

/* eslint-disable @next/next/no-html-link-for-pages -- Native anchors avoid Vinext hydration failures. */
import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { BrandMark } from '../components/brand-mark';
import { SignOutForm } from '../auth/sign-out-form';
import { readSavedComponents, toggleSavedComponent } from '../../lib/saved-components';
import styles from './workspace.module.css';

const changedEvent = 'rendyn-saved-components-changed';
const WorkspaceContext = createContext<{ saved: string[]; toggleSaved: (slug: string) => void; ready: boolean } | null>(null);
const navigation = [
  { href: '/app', label: 'Components', icon: 'grid' },
  { href: '/app/saved', label: 'Saved components', icon: 'bookmark' },
  { href: '/app/mcp', label: 'Connect to MCP', icon: 'code' },
  { href: '/app/account', label: 'Account', icon: 'account' },
];

export function useWorkspace() {
  const workspace = useContext(WorkspaceContext);
  if (!workspace) throw new Error('Workspace context is required');
  return workspace;
}

export function WorkspaceIcon({ name }: { name: string }) {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {name === 'grid' ? <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></> : name === 'bookmark' ? <path d="M6 4h12v17l-6-4-6 4z" /> : name === 'code' ? <><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-12-2 18" /></> : <><circle cx="12" cy="8" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2" /></>}
  </svg>;
}

export function WorkspaceShell({ userId, email, children }: {
  userId: string | null; email: string; children: React.ReactNode;
}) {
  const pathname = usePathname();
  const key = `rendyn:saved:${userId ?? 'guest'}`;
  const [message, setMessage] = useState('');
  const getSnapshot = useCallback(() => {
    try { return window.localStorage.getItem(key) ?? '[]'; } catch { return '[]'; }
  }, [key]);
  const subscribe = useCallback((listener: () => void) => {
    const onStorage = (event: StorageEvent) => { if (event.key === key || event.key === null) listener(); };
    window.addEventListener('storage', onStorage);
    window.addEventListener(changedEvent, listener);
    return () => { window.removeEventListener('storage', onStorage); window.removeEventListener(changedEvent, listener); };
  }, [key]);
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => '[]');
  const ready = useSyncExternalStore(subscribe, () => true, () => false);
  const saved = useMemo(() => readSavedComponents(snapshot), [snapshot]);
  const toggleSaved = useCallback((slug: string) => {
    try {
      const current = readSavedComponents(window.localStorage.getItem(key));
      window.localStorage.setItem(key, JSON.stringify(toggleSavedComponent(current, slug)));
      window.dispatchEvent(new Event(changedEvent));
      setMessage('');
    } catch { setMessage('Your browser could not save this component. Allow site storage and try again.'); }
  }, [key]);

  return <WorkspaceContext.Provider value={{ saved, toggleSaved, ready }}>
    <div className={styles.workspace}>
      <a href="#workspace-content" className={styles.skipLink}>Skip to workspace</a>
      <aside className={styles.sidebar}>
        <a className={styles.brand} href="/app" aria-label="Rendyn workspace"><BrandMark className={styles.brandMark} /><span>Rendyn<span className={styles.workspaceLabel}>Workspace</span></span></a>
        <nav className={styles.navigation} aria-label="Workspace">
          {navigation.filter(item => userId || item.icon !== 'account').map(item => {
            const active = item.href === '/app' ? pathname === '/app' || pathname.startsWith('/app/components/') : pathname === item.href;
            return <a key={item.href} href={item.href} aria-current={active ? 'page' : undefined}><WorkspaceIcon name={item.icon} /><span>{item.label}</span>{item.icon === 'bookmark' && ready && <small>{saved.length}</small>}</a>;
          })}
        </nav>
        <div className={styles.sidebarBottom}>
          <a href="/guides">Guides <span aria-hidden="true">↗</span></a>
          <a href="/">Rendyn home <span aria-hidden="true">↗</span></a>
          <div className={styles.identity}><span className={styles.avatar}>{email.slice(0, 1).toUpperCase()}</span><span title={email}>{email}</span></div>
          {userId ? <SignOutForm returnTo="/" /> : <span>No account needed</span>}
        </div>
      </aside>
      <div className={styles.body}>
        <header className={styles.topbar}><span>Your component workspace</span><span className={styles.accessBadge}>Everything is free</span></header>
        <div className={styles.promotion}><span className={styles.promotionDot} /><p><strong>Give your agent taste.</strong> MCP is the best way to use Rendyn. Free source and previews, inside your project.</p><a href="/app/mcp">Connect to MCP <span aria-hidden="true">↗</span></a></div>
        <main id="workspace-content" className={styles.content}>{message && <p className={styles.notice} role="alert">{message}</p>}{children}</main>
      </div>
    </div>
  </WorkspaceContext.Provider>;
}
