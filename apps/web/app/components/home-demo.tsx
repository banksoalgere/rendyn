'use client';

/* eslint-disable @next/next/no-html-link-for-pages -- Use native anchors consistently with the existing Vinext pages to avoid the next/link hydration boundary. */

import { useState } from 'react';
import type { ComponentPreviewData } from '../../lib/component-preview';
import { ComponentPreview } from './component-preview';
import styles from './home-demo.module.css';

export interface DemoExample extends ComponentPreviewData {
  label: string;
  description: string;
}

export function HomeDemo({ examples, componentCount }: { examples: DemoExample[]; componentCount: number }) {
  const [selected, setSelected] = useState(0);
  const example = examples[selected];
  if (!example) return null;

  return (
    <section className={styles.demo} aria-label="Explore real Rendyn components">
      <div className={styles.heading}><span><i aria-hidden="true" /> Component studio</span><small>Live preview</small></div>
      <div className={styles.choices} role="group" aria-label="Choose a component example">
        {examples.map((item, index) => (
          <button type="button" key={item.publicSlug} aria-pressed={index === selected} onClick={() => setSelected(index)}>
            {item.label}
          </button>
        ))}
      </div>
      <div className={styles.canvas}>
        <ComponentPreview key={example.previewId} component={example} size="hero" />
      </div>
      <div className={styles.caption} aria-live="polite">
        <div><span>{example.name}</span><p>{example.description}</p></div>
        <a href={`/components/${example.publicSlug}`} aria-label={`Explore ${example.name}`}>Explore <span aria-hidden="true">↗</span></a>
      </div>
      <div className={styles.footnote}><span>React · TypeScript · Tailwind</span><a href="/components">All {componentCount} components ↗</a></div>
    </section>
  );
}
