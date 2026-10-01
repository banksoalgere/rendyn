'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { analyticsConfigured, CONSENT_EVENT, CONSENT_KEY, readAnalyticsConsent, setAnalyticsConsent, syncAnalytics, trackClick, trackPageview } from '../../lib/analytics';
import { isAnalyticsPage } from '../../lib/analytics-privacy';
import styles from './website-analytics.module.css';

export function WebsiteAnalytics() {
  const pathname = usePathname();
  const [showChoice, setShowChoice] = useState(false);
  const configured = analyticsConfigured();

  useEffect(() => {
    if (!configured) return;
    let cancelled = false;
    const sync = async () => {
      setShowChoice(readAnalyticsConsent() === null);
      await syncAnalytics();
      if (!cancelled) trackPageview();
    };
    const storageChanged = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY || event.key === null) {
        setAnalyticsConsent(readAnalyticsConsent() ?? 'declined');
      }
    };
    void sync();
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener('storage', storageChanged);
    document.addEventListener('click', trackClick, true);
    return () => {
      cancelled = true;
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener('storage', storageChanged);
      document.removeEventListener('click', trackClick, true);
    };
  }, [configured, pathname]);

  if (!configured || !isAnalyticsPage(pathname ?? '')) return null;

  return <aside className={styles.root} data-analytics-private aria-label="Analytics preferences">
    {showChoice ? <div className={styles.panel}>
      <h2>Help improve Rendyn</h2>
      <p>Allow analytics and session recordings so we can understand page visits, searches, clicks and copies. Recordings mask text and inputs. We don’t send copied content.</p>
      <div className={styles.actions}>
        <button type="button" onClick={() => { setAnalyticsConsent('declined'); setShowChoice(false); }}>Decline</button>
        <button type="button" onClick={() => { setAnalyticsConsent('accepted'); setShowChoice(false); }}>Allow analytics</button>
      </div>
    </div> : <button className={styles.settings} type="button" onClick={() => setShowChoice(true)}>Analytics preferences</button>}
  </aside>;
}
