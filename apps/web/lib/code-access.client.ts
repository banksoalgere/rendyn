import { isCodeAccess, type CodeAccess } from './code-access';

export async function readCodeAccess(signal?: AbortSignal): Promise<CodeAccess> {
  const response = await fetch('/api/code-access', { credentials: 'same-origin', cache: 'no-store', signal });
  const access: unknown = await response.json();
  if (!response.ok || !isCodeAccess(access)) throw new Error('Code access unavailable');
  return access;
}
