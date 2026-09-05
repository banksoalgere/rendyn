import { pageMetadata } from '../../lib/seo';
import type { Metadata } from 'next';
import { guides } from '../../lib/guides';
import styles from '../components/guides.module.css';

export const metadata: Metadata = pageMetadata(
  'AI Coding & UI Design Guides | Rendyn',
  'Practical guides to designing and building with Claude Code, Cursor, Codex and ChatGPT. Find workflows, prompts and templates for better interfaces.',
  '/guides',
);

export default function GuidesPage() {
  return (
    <main className={styles.index}>
      <header className={styles.intro}>
        <span className={styles.kicker}>Learn with Rendyn</span>
        <h1>Guides</h1>
        <p>Practical workflows, prompts and templates for building with your coding agent.</p>
      </header>
      <div className={styles.listHeading}><h2>All guides</h2><span>{guides.length} guides</span></div>
      <div className={styles.grid}>
        {guides.map((guide) => (
          <a className={styles.card} href={guide.href} key={guide.slug}>
            <div className={styles.cardMeta}><span>{guide.category}</span><span>{guide.readTime}</span></div>
            <h2>{guide.title}</h2>
            <p>{guide.description}</p>
            <span className={styles.read}>Read guide <span aria-hidden="true">↗</span></span>
          </a>
        ))}
      </div>
    </main>
  );
}
