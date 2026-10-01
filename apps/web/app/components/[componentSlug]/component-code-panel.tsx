'use client';

import { useEffect, useRef, useState } from 'react';
import type { ComponentCode } from '../../../lib/component-code';
import { isCodeAccess, type CodeAccess } from '../../../lib/code-access';
import { readCodeAccess } from '../../../lib/code-access.client';
import styles from './component-page.module.css';
import { trackCopy } from '../../../lib/analytics';

type State = { status: 'loading' | 'signed-out' | 'error' } | { status: 'ready'; code: ComponentCode & CodeAccess };

export function ComponentCodePanel({ slug }: { slug: string }) {
  const [state, setState] = useState<State>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  const [filePath, setFilePath] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [copying, setCopying] = useState(false);
  const copyInProgress = useRef(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/components/${encodeURIComponent(slug)}/code`, {
      credentials: 'same-origin', cache: 'no-store', signal: controller.signal,
    }).then(async (response) => {
      if (controller.signal.aborted) return;
      if (response.status === 401) { setState({ status: 'signed-out' }); return; }
      if (!response.ok) throw new Error('Source request failed');
      const code: ComponentCode & CodeAccess = await response.json();
      if (!code.files?.length || !isCodeAccess(code) || !code.signedIn) throw new Error('Source is empty');
      if (!controller.signal.aborted) { setState({ status: 'ready', code }); }
    }).catch(() => {
      if (!controller.signal.aborted) setState({ status: 'error' });
    });
    return () => controller.abort();
  }, [slug, attempt]);

  useEffect(() => {
    const refresh = () => { setState({ status: 'loading' }); setAttempt((value) => value + 1); };
    window.addEventListener('focus', refresh);
    return () => window.removeEventListener('focus', refresh);
  }, []);

  if (state.status === 'loading') return <div className={styles.codeMessage} role="status">Loading component code…</div>;
  if (state.status === 'signed-out') return <div className={styles.codeMessage}>
    <span className={styles.codeMark} aria-hidden="true">{'</>'}</span>
    <h2>Get this component free.</h2>
    <p>Log in to unlock every component’s source code, dependencies, and examples. Free, with no subscription required.</p>
    <a className={styles.codeSignIn} href={`/login?next=${encodeURIComponent(`/components/${slug}?tab=code#preview`)}`}>Log in to get this component free <span aria-hidden="true">↗</span></a>
  </div>;
  if (state.status === 'error') return <div className={styles.codeMessage}>
    <p role="alert">We couldn’t load the code. Please try again.</p>
    <button type="button" className={styles.copyButton} onClick={() => { setState({ status: 'loading' }); setAttempt((value) => value + 1); }}>Try again</button>
  </div>;

  const { code } = state;
  const file = code.files.find((item) => item.path === filePath) ?? code.files[0];
  const copyCode = async () => {
    if (copyInProgress.current) return;
    copyInProgress.current = true;
    setCopying(true);
    setCopyStatus('');
    try {
      const access = await readCodeAccess();
      if (!access.signedIn) { setState({ status: 'signed-out' }); return; }
      await navigator.clipboard.writeText(file.content);
      trackCopy('code', slug);
      setCopyStatus('Copied');
    } catch {
      setCopyStatus('We couldn’t copy the code. Please try again.');
    } finally {
      copyInProgress.current = false;
      setCopying(false);
    }
  };
  return <div className={styles.codePanel}>
    <div className={styles.codeFileToolbar}>
      <label><span className={styles.srOnly}>Source file</span><select aria-label="Source file" value={file.path} disabled={copying} onChange={(event) => { setFilePath(event.target.value); setCopyStatus(''); }}>{code.files.map((item) => <option key={item.path} value={item.path}>{item.path}</option>)}</select></label>
      <button className={styles.copyButton} data-analytics-action="copy-code" type="button" disabled={copying} onClick={copyCode}>{copying ? 'Copying…' : 'Copy code'}</button>
    </div>
    {copyStatus && <p className={styles.codeCopyStatus} role="status">{copyStatus}</p>}
    <pre className={styles.sourceCode} tabIndex={0} aria-label={file.path}><code>{file.content}</code></pre>
    <div className={styles.codeInstall}>
      <h3>Installation</h3>
      {code.install.dependencyCommand && <pre><code>{code.install.dependencyCommand}</code></pre>}
      {code.install.registryDependencyCommand && <pre><code>{code.install.registryDependencyCommand}</code></pre>}
      <ol>{code.install.instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}</ol>
      <details><summary>MIT licence</summary><pre>{code.license}</pre></details>
    </div>
  </div>;
}
