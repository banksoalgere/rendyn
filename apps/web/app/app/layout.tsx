import '../globals.css';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '../../lib/supabase/server';
import { isFreeAccessActive } from '../../../../packages/catalog/src/free-access';
import { WorkspaceShell } from './workspace-shell';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Workspace | Rendyn',
  description: 'Find, save and use components in your Rendyn workspace.',
  robots: { index: false, follow: false },
};

export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  if (!supabase) redirect('/login?error=configuration&next=%2Fapp');
  const result = await supabase.auth.getUser().catch(() => null);
  if (!result || result.error || !result.data.user) redirect('/login?next=%2Fapp');
  return <WorkspaceShell userId={result.data.user.id} email={result.data.user.email ?? 'Your account'} freeAccess={isFreeAccessActive()}>{children}</WorkspaceShell>;
}
