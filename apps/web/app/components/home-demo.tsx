'use client';

import { useState } from 'react';
import type { ComponentPreviewData } from '../../lib/component-preview';
import { HomeComponentPreview as ComponentPreview } from './home-component-preview';
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
      </div>
      <div className={styles.canvas}>
        <ComponentPreview compact key={example.previewId} component={example} example="homepage" size="hero" />
      </div>
    </section>
  );
}
