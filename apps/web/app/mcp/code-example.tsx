'use client';

import { useState } from 'react';
import styles from './mcp.module.css';

export function CodeExample({ label, code }: { label: string; code: string }) {
  const [message, setMessage] = useState('');

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setMessage('Copied');
    } catch {
      setMessage('Select the code to copy it');
    }
  }

  return (
    <figure className={styles.codeExample}>
      <figcaption>
        <span>{label}</span>
        <button type="button" onClick={copy} aria-label={`Copy ${label}`}>Copy</button>
      </figcaption>
      <pre tabIndex={0} aria-label={label}><code>{code}</code></pre>
      <span className={styles.copyStatus} role="status">{message}</span>
    </figure>
  );
}
