'use client';

import { useState } from 'react';
import styles from './component-page.module.css';

interface CopyPromptProps {
  prompt: string;
}

export function CopyPrompt({ prompt }: CopyPromptProps) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setFailed(false);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setFailed(true);
    }
  };

  return (
    <button className={styles.copyButton} onClick={copyPrompt} type="button" aria-live="polite" title={failed ? 'Clipboard unavailable. Select and copy the prompt below.' : 'Copy agent prompt'}>
      <span aria-hidden="true">{copied ? '✓' : '⧉'}</span>
      {failed ? 'Select prompt below' : copied ? 'Copied' : 'Copy prompt'}
    </button>
  );
}
