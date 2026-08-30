'use client';

import { useState } from 'react';

export function CopyPromptButton({ text }: { text: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('copied');
      window.setTimeout(() => setStatus('idle'), 1800);
    } catch {
      setStatus('error');
    }
  }

  const label = status === 'copied' ? 'Copied' : status === 'error' ? 'Copy unavailable' : 'Copy prompt';

  return (
    <button type="button" onClick={copyPrompt} aria-live="polite">
      {label}<span aria-hidden="true">{status === 'copied' ? ' ✓' : ' ⧉'}</span>
    </button>
  );
}
