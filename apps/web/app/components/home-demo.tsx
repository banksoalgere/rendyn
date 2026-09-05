'use client';

import { useState } from 'react';
import type { ComponentPreviewData } from '../../lib/component-preview';
import { ComponentPreview } from './component-preview';
import styles from './home-demo.module.css';

export function HomeDemo({ examples }: { examples: ComponentPreviewData[] }) {
  const [selected, setSelected] = useState(0);
  const example = examples[selected];
  if (!example) return null;

  return (
    <section className={styles.demo} aria-label="Explore real Rendyn components">
      <div className={styles.toolbar}>
        <div className={styles.choices} role="group" aria-label="Choose a component example">
          {examples.map((item, index) => (
            <button type="button" key={item.publicSlug} aria-pressed={index === selected} onClick={() => setSelected(index)}>
              {item.name}
            </button>
          ))}
        </div>
        <a className={styles.details} href={`/components/${example.publicSlug}`} aria-label={`View ${example.name}`} title={`View ${example.name}`}><span aria-hidden="true">↗</span></a>
      </div>
      <div className={styles.canvas}>
        <ComponentPreview key={example.previewId} component={example} example="homepage" size="hero" />
      </div>
    </section>
  );
}
