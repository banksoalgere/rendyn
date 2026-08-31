'use client';

import { useState } from 'react';
import styles from './component-page.module.css';

interface CopyPromptProps {
  prompt: string;
}

export function CopyPrompt({ prompt }: CopyPromptProps) {
  const [copied, setCopied] = useState(false);

  const copyPrompt = async () => {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button className={styles.copyButton} onClick={copyPrompt} type="button">
      <span aria-hidden="true">{copied ? '✓' : '⧉'}</span>
      {copied ? 'Copied' : 'Copy agent prompt'}
    </button>
  );
}
