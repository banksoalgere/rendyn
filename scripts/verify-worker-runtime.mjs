import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { setTimeout } from 'node:timers/promises';

const root = resolve(import.meta.dirname, '..');
const temporary = await mkdtemp(resolve(tmpdir(), 'rendyn-worker-test-'));
const socket = createServer();
await new Promise(resolve => socket.listen(0, '127.0.0.1', resolve));
const port = socket.address().port;
await new Promise(resolve => socket.close(resolve));
const config = JSON.parse(await readFile(resolve(root, 'apps/api/wrangler.jsonc'), 'utf8'));
delete config.$schema;
delete config.routes;
config.main = resolve(root, 'apps/api/src/worker.ts');
config.assets.directory = resolve(root, 'catalog/previews');
config.workers_dev = false;
config.vars = { ...config.vars, ALLOWED_HOSTS: '127.0.0.1,localhost', SUPABASE_URL: 'https://example.supabase.co', SUPABASE_ANON_KEY: 'local-test-public-key-value' };
config.secrets = { required: [] };
await writeFile(resolve(temporary, 'wrangler.json'), JSON.stringify(config));
const child = spawn(process.execPath, [resolve(root, 'apps/api/node_modules/wrangler/bin/wrangler.js'),
  'dev', '--local', '--ip', '127.0.0.1', '--port', String(port), '--inspector-port', '0',
  '--config', resolve(temporary, 'wrangler.json')], {
  cwd: root, env: { ...process.env, WRANGLER_SEND_METRICS: 'false', WRANGLER_LOG_PATH: temporary,
    // Use the explicit fixture bindings rather than unrelated local website URLs.
    CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV: 'false' },
  stdio: ['ignore', 'pipe', 'pipe'],
});
let logs = '';
child.stdout.on('data', chunk => { logs = (logs + chunk).slice(-12000); });
child.stderr.on('data', chunk => { logs = (logs + chunk).slice(-12000); });
const exited = new Promise(resolve => child.once('exit', resolve));
const origin = `http://127.0.0.1:${port}`;
try {
  let ready = false;
  for (let attempt = 0; attempt < 80; attempt++) {
    try { ready = (await fetch(`${origin}/health`, { signal: AbortSignal.timeout(1000) })).ok; } catch { /* Wait for local compilation. */ }
    if (ready) break;
    if (child.exitCode !== null) throw new Error(logs);
    await setTimeout(250);
  }
  assert.ok(ready, `Local Worker did not start: ${logs}`);
  for (const path of ['/health', '/api/categories', '/api/search?q=animated%20background',
    '/api/components/button', '/api/previews/contact-sheet?ids=button,tilt-card', '/mcp']) {
    const response = await fetch(origin + path);
    assert.equal(response.status, path === '/mcp' ? 401 : 200, path);
    const body = await response.text();
    if (path.includes('contact-sheet')) {
      assert.equal(response.headers.get('content-type'), 'image/svg+xml');
      assert.ok(body.includes('1. Button') && body.includes('2. Tilt Card'));
    }
    const tag = response.headers.get('etag');
    if (tag) {
      assert.match(response.headers.get('cache-control'), /public/);
      assert.equal((await fetch(origin + path, { headers: { 'If-None-Match': tag } })).status, 304);
    }
  }
  console.log('Local workerd: health, metadata, search, conditional cache, contact sheet and auth denial passed');
} finally {
  child.kill('SIGTERM');
  await Promise.race([exited, setTimeout(5000)]);
  if (child.exitCode === null && child.signalCode === null) { child.kill('SIGKILL'); await exited; }
  await rm(temporary, { recursive: true, force: true });
}
