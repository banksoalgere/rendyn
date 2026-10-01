'use client';

import { trackCopy } from '../../../lib/analytics';

import { useEffect, useRef, useState } from 'react';

interface CopyPromptProps {
  label: string;
  children: string;
}

export function CopyPrompt({ children, label }: CopyPromptProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(children);
      trackCopy('prompt');
      setStatus('copied');
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setStatus('error');
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setStatus('idle'), 3500);
    }
  }

  const buttonLabel = status === 'copied' ? 'Copied' : status === 'error' ? 'Try again' : 'Copy prompt';
  const announcement = status === 'copied'
    ? 'Prompt copied to clipboard.'
    : status === 'error'
      ? 'Copy failed. Select the prompt text to copy it manually.'
      : '';

  return (
    <div className="chatgpt-website-prompt-block">
      <div className="chatgpt-website-prompt-block__bar">
        <span>{label}</span>
        <button type="button" onClick={copyPrompt} aria-label={`${buttonLabel}: ${label.toLowerCase()}`}>
          {buttonLabel}
        </button>
      </div>
      <pre><code>{children}</code></pre>
      {status === 'error' ? (
        <p className="chatgpt-website-prompt-block__error">Couldn&apos;t copy automatically. Select the prompt text to copy it manually.</p>
      ) : null}
      <span className="chatgpt-website-sr-only" aria-live="polite">{announcement}</span>
    </div>
  );
}
