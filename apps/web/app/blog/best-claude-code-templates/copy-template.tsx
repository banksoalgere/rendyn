'use client';

import { trackCopy } from '../../../lib/analytics';

import { useState } from 'react';

export function CopyTemplate({ value, label = 'Copy starter' }: { value: string; label?: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  async function copyTemplate() {
    try {
      await navigator.clipboard.writeText(value);
      trackCopy('prompt');
      setStatus('copied');
    } catch {
      setStatus('error');
    }

    window.setTimeout(() => setStatus('idle'), 1800);
  }

  const buttonLabel = status === 'copied' ? 'Copied' : status === 'error' ? 'Copy manually' : label;

  return (
    <button className="copy-template-button" onClick={copyTemplate} type="button">
      <span aria-live="polite">{buttonLabel}</span>
      <span aria-hidden="true">{status === 'copied' ? '✓' : status === 'error' ? '!' : '⌘'}</span>
    </button>
  );
}
