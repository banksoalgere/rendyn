'use client';

import { useEffect, useRef, type CSSProperties, type PointerEvent } from 'react';
import styles from './horizon-wall.module.css';

type Study = 'approval' | 'tabs' | 'activity' | 'dock' | 'command' | 'progress' | 'chart' | 'avatars';
const columns: Study[][] = [
  ['tabs', 'progress', 'approval'],
  ['command', 'avatars', 'chart'],
  ['activity', 'tabs', 'dock'],
  ['chart', 'approval', 'progress'],
  ['approval', 'dock', 'avatars'],
  ['dock', 'command', 'activity'],
];

const names: Record<Study, string> = {
  approval: 'Approval card', tabs: 'Morphing tabs', activity: 'Agent activity',
  dock: 'Spring dock', command: 'Command palette', progress: 'Circular progress',
  chart: 'Animated bars', avatars: 'Avatar stack',
};

function StudyPreview({ kind }: { kind: Study }) {
  switch (kind) {
    case 'approval':
      return <><h3>Publish changes?</h3><p>3 files changed</p><div className={styles.approval}><span>Cancel</span><span>Approve</span></div></>;
    case 'tabs':
      return <div className={styles.tabs}><span>Preview</span><span>Source</span></div>;
    case 'activity':
      return <div className={styles.activity}><span><i /><i /><i /></span>Generating…</div>;
    case 'dock':
      return <div className={styles.dock}>{['⌂', '▱', '✳', '⚙'].map((icon) => <span key={icon}>{icon}</span>)}</div>;
    case 'command':
      return <><div className={styles.search}>⌕ <span>Search…</span><kbd>⌘ K</kbd></div><div className={styles.command}><span>New project</span><span>⌘ N</span></div><div className={styles.command}><span>Find a component</span></div><div className={styles.command}><span>Your collection</span></div></>;
    case 'progress':
      return <div className={styles.progress}>72%</div>;
    case 'chart':
      return <div className={styles.bars}>{[38, 62, 49, 82, 68].map((height) => <i key={height} style={{ height: `${height}%` }} />)}</div>;
    case 'avatars':
      return <div className={styles.avatars}>{['AL', 'JR', 'SK', '+3'].map((label) => <span key={label}>{label}</span>)}</div>;
  }
}

export function HorizonWall({ componentCount }: { componentCount: number }) {
  const wallRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const reducedRef = useRef(true);

  useEffect(() => {
    const wall = wallRef.current;
    if (!wall) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true;
    const updatePlayback = () => {
      wall.dataset.running = String(visible && !document.hidden);
    };
    const updatePreference = () => {
      reducedRef.current = preference.matches;
      if (preference.matches) {
        if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
        wall.style.removeProperty('--pointer-x');
        wall.style.removeProperty('--pointer-y');
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    });
    observer.observe(wall);
    updatePreference();
    updatePlayback();
    preference.addEventListener('change', updatePreference);
    document.addEventListener('visibilitychange', updatePlayback);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', updatePreference);
      document.removeEventListener('visibilitychange', updatePlayback);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  function resetPointer() {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    wallRef.current?.style.removeProperty('--pointer-x');
    wallRef.current?.style.removeProperty('--pointer-y');
  }

  function movePointer(event: PointerEvent<HTMLDivElement>) {
    if (reducedRef.current || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      wallRef.current?.style.setProperty('--pointer-x', `${x * 18}px`);
      wallRef.current?.style.setProperty('--pointer-y', `${y * 18}px`);
    });
  }

  return (
    <div className={styles.wall} ref={wallRef}>
      {/* These miniature studies are decorative; the working previews live in the playground. */}
      <div aria-hidden="true" className={styles.stage} onPointerMove={movePointer} onPointerLeave={resetPointer}>
        <div className={styles.plane}>
          {columns.map((studies, column) => (
            <div className={styles.track} key={column}>
              {/* Three 184px cards plus three 16px gaps form one exact 600px loop. */}
              {[...studies, ...studies].map((kind, index) => (
                <div className={styles.card} data-study={kind} key={`${kind}-${index}`} style={{ '--sheen-delay': `${-column * 2 - index}s` } as CSSProperties}>
                  <div className={styles.cardTitle}>{names[kind]}</div>
                  <div className={styles.cardBody}><StudyPreview kind={kind} /></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.caption}>
        <span><i aria-hidden="true" />{componentCount} components</span>
      </div>
    </div>
  );
}
