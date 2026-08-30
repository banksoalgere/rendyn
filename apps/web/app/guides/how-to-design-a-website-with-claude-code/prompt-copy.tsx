'use client';

import { useState } from 'react';

const websiteBrief = `Act as a senior product designer and frontend engineer.

First, inspect this repository and explain the existing page architecture, design tokens, shared components, and constraints. Do not edit yet.

Then design and implement [PAGE / WEBSITE] for [AUDIENCE] whose main goal is [PRIMARY ACTION].

Creative direction:
- Tone: [3–5 precise adjectives]
- References: [FILES OR URLS], using their principles rather than copying them
- Memorable idea: [THE ONE VISUAL OR INTERACTION IDEA]
- Avoid: [GENERIC PATTERNS, COLOURS, OR LAYOUTS]

Requirements:
- Reuse the existing stack and shared primitives
- One clear H1 and semantic heading order
- Responsive at 1440px, 768px, and 390px
- Keyboard accessible, visible focus, reduced-motion support
- Fast loading; avoid decorative dependencies unless justified
- Preserve unrelated files and existing behaviour

Work in stages: audit, propose the direction, implement, then run the app and verify the result in a real browser. Check desktop and mobile layout, links, interactions, console errors, and failed network requests. Compare the rendered result with the references and fix the material differences before reporting what changed.`;

export function PromptCopy() {
  const [status, setStatus] = useState('Copy prompt');

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(websiteBrief);
      setStatus('Copied');
      window.setTimeout(() => setStatus('Copy prompt'), 1800);
    } catch {
      setStatus('Copy unavailable');
    }
  }

  return (
    <div className="article-prompt">
      <div className="article-prompt-bar">
        <span>website-brief.txt</span>
        <button type="button" onClick={copyPrompt} aria-live="polite">{status}</button>
      </div>
      <pre><code>{websiteBrief}</code></pre>
    </div>
  );
}
