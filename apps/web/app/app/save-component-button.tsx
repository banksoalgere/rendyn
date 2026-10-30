'use client';
import { useWorkspace, WorkspaceIcon } from './workspace-shell';
import styles from './workspace.module.css';

export function SaveComponentButton({ slug, name }: { slug: string; name: string }) {
  const { saved, toggleSaved, ready } = useWorkspace();
  const isSaved = saved.includes(slug);
  return <button className={styles.secondaryButton} type="button" disabled={!ready} aria-pressed={isSaved} aria-label={`${isSaved ? 'Unsave' : 'Save'} ${name}`} onClick={() => toggleSaved(slug)}><WorkspaceIcon name="bookmark" />{isSaved ? 'Saved' : 'Save component'}</button>;
}
