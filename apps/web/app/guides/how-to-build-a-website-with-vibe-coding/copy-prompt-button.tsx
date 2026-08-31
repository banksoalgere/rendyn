'use client';

import { useState } from 'react';

interface CopyPromptButtonProps {
  text: string;
  compact?: boolean;
}

export function CopyPromptButton({ text, compact = false }: CopyPromptButtonProps) {
  const defaultLabel = compact ? 'Copy starter prompt' : 'Copy prompt';
  const [label, setLabel] = useState(defaultLabel);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(text);
      setLabel('Copied');
      window.setTimeout(() => setLabel(defaultLabel), 1800);
    } catch {
      setLabel('Copy unavailable');
    }
  }

  return (
    <button className={compact ? 'vibe-website-copy vibe-website-copy--compact' : 'vibe-website-copy'} type="button" onClick={copyPrompt}>
      <span aria-live="polite">{label}</span>
      <i aria-hidden="true">{label === 'Copied' ? '✓' : '↗'}</i>
    </button>
  );
}
