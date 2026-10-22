import '../globals.css';
import type { Metadata } from 'next';
import { createClient } from '../../lib/supabase/server';
import { WorkspaceShell } from './workspace-shell';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Workspace | Rendyn',
  description: 'Find, save and use components in your Rendyn workspace.',
  robots: { index: false, follow: false },
};

export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const result = await supabase?.auth.getUser().catch(() => null);
  const user = result && !result.error ? result.data.user : null;
  return <WorkspaceShell userId={user?.id ?? null} email={user?.email ?? 'Browsing freely'}>{children}</WorkspaceShell>;
}
