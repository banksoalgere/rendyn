import { ClientSetup } from '../../mcp/client-setup';
import styles from '../workspace.module.css';

export default function WorkspaceMcpPage() {
  return <>
    <div className={styles.pageHeading}><div><p className={styles.eyebrow}>Rendyn + your agent</p><h1>Bring the catalogue to your editor.</h1><p>Search components, inspect previews and get complete source without leaving your project.</p></div></div>
    <div className={styles.setup}><ClientSetup /></div>
    <section className={styles.quickStart}><h2>Try your first request</h2><p>Once connected, ask your agent:</p><blockquote>“Use Rendyn to find a keyboard-friendly command menu. Show me the preview, then add the component to my project.”</blockquote><p>Your agent will search the catalogue and retrieve the implementation. Sign in with the same Rendyn account when your editor asks you to authorize.</p></section>
  </>;
}
