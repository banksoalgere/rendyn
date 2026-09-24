import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSupabasePublicConfig } from '../apps/web/lib/supabase/config';

export function verifyBuiltWebConfig(
  chunks: Iterable<string>,
  env: Record<string, string | undefined>,
) {
  const config = getSupabasePublicConfig(env);
  if (!config) throw new Error('Valid public Supabase configuration is required to verify the website build');

  let foundUrl = false;
  let foundKey = false;
  for (const chunk of chunks) {
    foundUrl ||= chunk.includes(config.url);
    foundKey ||= chunk.includes(config.publishableKey);
    if (foundUrl && foundKey) return;
  }
  throw new Error('Website browser bundles are missing the configured public Supabase values; refusing release');
}

function* clientChunks(directory: string): Generator<string> {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* clientChunks(path);
    else if (entry.isFile() && entry.name.endsWith('.js')) yield readFileSync(path, 'utf8');
  }
}

if (import.meta.url === new URL(process.argv[1] ?? '', 'file:').href) {
  const directory = fileURLToPath(new URL('../apps/web/dist/client/', import.meta.url));
  verifyBuiltWebConfig(clientChunks(directory), process.env);
  console.log('Website browser login configuration verified (values omitted)');
}
