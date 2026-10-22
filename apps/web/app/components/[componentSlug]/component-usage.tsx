import type { ComponentEditorial } from '../../../lib/component-editorial';
import styles from './component-page.module.css';

export function ComponentUsage({ content, dependencies }: {
  content: ComponentEditorial;
  dependencies: string[];
}) {
  return (
    <>
      <section className={styles.usageSection} id="usage" aria-labelledby="usage-heading">
        <h2 id="usage-heading">Practical React example</h2>
        <p>{content.useCase}</p>
        <div className={styles.setupNote}>
          <h3>Before you copy and paste</h3>
          <p>{content.setup}</p>
          {dependencies.length > 0 && <p className={styles.dependencyList}>
            Listed package dependencies: {dependencies.map((dependency, index) => (
              <span key={dependency}>{index > 0 && ', '}<code>{dependency}</code></span>
            ))}.
          </p>}
          <p>Use the Code tab for the component files and installation instructions, then adapt the imports in this example to your project.</p>
        </div>
        <h3 id="example-heading">{content.example.title}</h3>
        <pre className={styles.usageCode} tabIndex={0} aria-labelledby="example-heading"><code>{content.example.code}</code></pre>
        {content.example.css && <>
          <h3 id="example-css-heading">Required animation CSS</h3>
          <pre className={styles.usageCode} tabIndex={0} aria-labelledby="example-css-heading"><code>{content.example.css}</code></pre>
        </>}
        <p>{content.example.explanation}</p>
      </section>

      <section className={styles.usageSection} id="customization" aria-labelledby="customization-heading">
        <h2 id="customization-heading">Customization</h2>
        <dl className={styles.controlList}>
          {content.controls.map((control) => <div key={control.name}>
            <dt>{control.name}</dt>
            <dd>{control.description}</dd>
          </div>)}
        </dl>
      </section>

      <section className={styles.usageSection} id="integration-notes" aria-labelledby="integration-heading">
        <h2 id="integration-heading">Integration notes</h2>
        <ul className={styles.integrationList}>
          {content.considerations.map((note) => <li key={note}>{note}</li>)}
        </ul>
        <p className={styles.sourceCredit}>
          Component source: <a href={content.source.url} rel="noopener noreferrer" target="_blank">{content.source.name} documentation <span aria-hidden="true">↗</span></a>.
          {' '}These examples describe the version imported into Rendyn. Upstream APIs may have changed; retain the source licence notices when adapting the code.
        </p>
      </section>
    </>
  );
}
