import type { CodeAccess } from './code-access';

export const codeAccessHeaders = { 'Cache-Control': 'private, no-store', Vary: 'Cookie' };

export async function getCodeAccess(): Promise<CodeAccess> {
  return { allowed: true };
}
