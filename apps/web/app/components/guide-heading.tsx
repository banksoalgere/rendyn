import { guides } from '../../lib/guides';
import styles from './guides.module.css';

export function GuideHeading({ slug, id = 'guide-title' }: { slug: string; id?: string }) {
  const guide = guides.find((entry) => entry.slug === slug);
  if (!guide) throw new Error(`Unknown guide: ${slug}`);

  return (
    <div className={styles.heading}>
      <a className={styles.back} href="/guides"><span aria-hidden="true">←</span> All guides</a>
      <div className={styles.meta}><span>{guide.category}</span><span>{guide.readTime}</span></div>
      <h1 id={id}>{guide.title}</h1>
      <p>{guide.description}</p>
      <div className={styles.byline}>By Rendyn Editorial <span aria-hidden="true">·</span> <time dateTime="2026-08-29">29 August 2026</time></div>
    </div>
  );
}
