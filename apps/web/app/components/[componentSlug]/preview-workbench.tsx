'use client';

import { useRef, useState } from 'react';
import type { ComponentPreviewData } from '../../../lib/component-preview';
import { ComponentPreview } from '../component-preview';
import styles from './component-page.module.css';

type Example = { slug: string; name: string; description?: string };
type Props = {
  component: ComponentPreviewData;
  examples: Example[];
  kind: string;
  useWhen: string[];
  notIdealWhen: string[];
};

function Icon({ kind }: { kind: 'desktop' | 'mobile' | 'replay' | 'sun' | 'moon' | 'open' }) {
  const paths = {
    desktop: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>,
    mobile: <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>,
    replay: <><path d="M3 11a9 9 0 1 1 2.7 7M3 4v7h7" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5" /></>,
    moon: <path d="M20.8 13A9 9 0 0 1 11 3.2 9 9 0 1 0 20.8 13Z" />,
    open: <><path d="M14 3h7v7m0-7L10 14M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" /></>,
  };
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind]}</svg>;
}

export function PreviewWorkbench({ component, examples, kind, useWhen, notIdealWhen }: Props) {
  const [tab, setTab] = useState<'preview' | 'usage'>('preview');
  const [exampleSlug, setExampleSlug] = useState(examples[0].slug);
  const [mobile, setMobile] = useState(false);
  const [dark, setDark] = useState(false);
  const [run, setRun] = useState(0);
  const tabs = useRef<HTMLDivElement>(null);
  const selected = examples.find((example) => example.slug === exampleSlug) ?? examples[0];
  const previewUrl = `/component-preview/${component.previewId}?example=${encodeURIComponent(selected.slug)}&theme=${dark ? 'dark' : 'light'}`;

  return <section className={styles.previewSection} id="preview" aria-label={`${component.name} example`}>
    <div className={styles.previewToolbar}>
      <div className={styles.previewTabs} role="tablist" aria-label="Component example" ref={tabs} onKeyDown={(event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 'preview' : event.key === 'End' ? 'usage' : tab === 'preview' ? 'usage' : 'preview';
        setTab(next);
        tabs.current?.querySelector<HTMLButtonElement>(`#example-tab-${next}`)?.focus();
      }}>
        {(['preview', 'usage'] as const).map((value) => <button key={value} type="button" role="tab" id={`example-tab-${value}`} aria-selected={tab === value} aria-controls={`example-panel-${value}`} tabIndex={tab === value ? 0 : -1} onClick={() => setTab(value)}>{value === 'preview' ? 'Preview' : 'Usage'}</button>)}
      </div>
      <div className={styles.previewActions} hidden={tab !== 'preview'}>
        <div className={styles.viewportButtons} aria-label="Preview width">
          <button type="button" aria-label="Desktop preview" title="Desktop preview" aria-pressed={!mobile} onClick={() => setMobile(false)}><Icon kind="desktop" /></button>
          <button type="button" aria-label="Mobile preview" title="Mobile preview" aria-pressed={mobile} onClick={() => setMobile(true)}><Icon kind="mobile" /></button>
        </div>
        <button type="button" aria-label={dark ? 'Use light preview' : 'Use dark preview'} title={dark ? 'Use light preview' : 'Use dark preview'} onClick={() => setDark(!dark)}><Icon kind={dark ? 'sun' : 'moon'} /></button>
        <button type="button" aria-label="Replay preview" title="Replay preview" onClick={() => setRun((value) => value + 1)}><Icon kind="replay" /></button>
        <a href={previewUrl} target="_blank" rel="noopener noreferrer" aria-label="Open preview in a new tab" title="Open preview in a new tab"><Icon kind="open" /></a>
      </div>
    </div>
    <div id="example-panel-preview" role="tabpanel" aria-labelledby="example-tab-preview" hidden={tab !== 'preview'}>
      <div className={styles.previewCanvas} data-kind={kind} data-dark={dark}>
        <div className={styles.previewViewport} data-mobile={mobile}>
          <ComponentPreview key={`${selected.slug}-${dark}-${run}`} component={component} example={selected.slug} dark={dark} />
        </div>
      </div>
      <div className={styles.previewCaption}>
        {examples.length > 1 ? <label><span className={styles.srOnly}>Example variant</span><select aria-label="Example variant" value={selected.slug} onChange={(event) => setExampleSlug(event.target.value)}>{examples.map((example) => <option key={example.slug} value={example.slug}>{example.name}</option>)}</select></label> : <span>Interactive example</span>}
        <span>React <span aria-hidden="true">·</span> Tailwind CSS</span>
      </div>
    </div>
    <div id="example-panel-usage" role="tabpanel" aria-labelledby="example-tab-usage" hidden={tab !== 'usage'} className={styles.usagePanel}>
      <h2>{selected.name === 'Default' ? component.name : selected.name}</h2>
      {selected.description && <p>{selected.description}</p>}
      <h3>When to use it</h3>
      <ul>{useWhen.map((text) => <li key={text}>{text}</li>)}</ul>
      <h3>Consider another pattern when</h3>
      <ul>{notIdealWhen.map((text) => <li key={text}>{text}</li>)}</ul>
      <a href="#install">Add this component <span aria-hidden="true">↗</span></a>
    </div>
  </section>;
}
