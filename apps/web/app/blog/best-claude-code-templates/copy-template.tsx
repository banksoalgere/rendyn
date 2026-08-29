'use client';

import { useState } from 'react';

export function CopyTemplate({ value }: { value: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  async function copyTemplate() {
    try {
      await navigator.clipboard.writeText(value);
      setStatus('copied');
    } catch {
      setStatus('error');
    }

    window.setTimeout(() => setStatus('idle'), 1800);
  }

  const label = status === 'copied' ? 'Copied' : status === 'error' ? 'Copy manually' : 'Copy starter';

  return (
    <button className="copy-template-button" onClick={copyTemplate} type="button">
      <span aria-live="polite">{label}</span>
      <span aria-hidden="true">{status === 'copied' ? '✓' : status === 'error' ? '!' : '⌘'}</span>
    </button>
  );
}
