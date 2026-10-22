import { redirect } from 'next/navigation';
import { createClient } from '../../../lib/supabase/server';
import { ClientSetup } from '../../mcp/client-setup';
import styles from '../workspace.module.css';

export default async function WorkspaceMcpPage() {
  const supabase = await createClient();
  const result = await supabase?.auth.getUser().catch(() => null);
  if (!result || result.error || !result.data.user) redirect('/login?next=%2Fapp%2Fmcp');
  return <>
    <div className={styles.pageHeading}><div><p className={styles.eyebrow}>Rendyn + your agent</p><h1>Give your agent taste.</h1><p>MCP is the best way to use Rendyn. Let your agent search, compare previews and get complete source inside your project. All free.</p></div></div>
    <div className={styles.setup}><ClientSetup /></div>
    <section className={styles.quickStart}><h2>Try your first request</h2><p>Once connected, ask your agent:</p><blockquote>“Use Rendyn to find a keyboard-friendly command menu. Show me the preview, then add the component to my project.”</blockquote><p>Your agent will search the catalogue and retrieve the implementation. Sign in with the same Rendyn account when your editor asks you to authorize.</p></section>
  </>;
}
