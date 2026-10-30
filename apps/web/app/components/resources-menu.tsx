'use client';

import { useState } from 'react';
import {
  MorphPopover,
  MorphPopoverContent,
  MorphPopoverTrigger,
} from '@/components/motion/popover-morph';

const resources = [
  { href: '/components', label: 'Component guide', detail: 'Browse components' },
  { href: '#how-it-works', label: 'Agent workflows', detail: 'How Rendyn fits your flow' },
  { href: '#docs', label: 'Documentation', detail: 'Connect your coding agent' },
];

export function ResourcesMenu() {
  const [open, setOpen] = useState(false);

  return (
    <MorphPopover open={open} onOpenChange={setOpen} className="resource-menu">
      <MorphPopoverTrigger>
        <button className="resource-menu__trigger" type="button">
          Resources
          <svg aria-hidden="true" viewBox="0 0 12 12"><path d="m3 4.5 3 3 3-3" /></svg>
        </button>
      </MorphPopoverTrigger>
      <MorphPopoverContent align="end" radius={10} className="resource-menu__content">
        <nav aria-label="Resources">
          <p>Resources</p>
          {resources.map((resource) => (
            <a href={resource.href} key={resource.label} onClick={() => setOpen(false)}>
              <span><strong>{resource.label}</strong><small>{resource.detail}</small></span>
              <b aria-hidden="true">→</b>
            </a>
          ))}
        </nav>
      </MorphPopoverContent>
    </MorphPopover>
  );
}
