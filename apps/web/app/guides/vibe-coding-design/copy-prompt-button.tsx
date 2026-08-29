'use client';

import { useState } from 'react';

interface CopyPromptButtonProps {
  text: string;
}

export function CopyPromptButton({ text }: CopyPromptButtonProps) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(text);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }

    window.setTimeout(() => setCopyState('idle'), 2000);
  }

  const label = copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Copy failed' : 'Copy prompt';

  return (
    <button className="guide-copy-button" type="button" onClick={copyPrompt}>
      <span aria-live="polite">{label}</span>
      <span aria-hidden="true">{copyState === 'copied' ? '✓' : copyState === 'failed' ? '!' : '↗'}</span>
    </button>
  );
}
