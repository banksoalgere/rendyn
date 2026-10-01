'use client';

/* eslint-disable @next/next/no-html-link-for-pages -- Vinext's next/link shim can hydrate from a second React context. */

import { useState } from 'react';
import { Drawer } from '@/components/motion/drawer';

export interface MobileComponentGroup {
  id: string;
  label: string;
  detail: string;
  components: { publicSlug: string; name: string }[];
}

const primaryLinks = [
  { href: '/components', label: 'Browse components' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/#for-teams', label: 'For teams' },
  { href: '/guides', label: 'Guides' },
] as const;

const SIGN_UP_HREF = '/pricing';

export function MobileMenu({ groups }: { groups: MobileComponentGroup[] }) {
  const [open, setOpen] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState('motion');
  const activeGroup = groups.find((group) => group.id === activeGroupId) ?? groups[0];
  const closeMenu = () => setOpen(false);
  if (!activeGroup) return null;

  return (
    <div className="mobile-menu">
      <button
        aria-controls="mobile-site-menu"
        aria-expanded={open}
        aria-label="Open site menu"
        className="mobile-menu__trigger"
        onClick={() => setOpen(true)}
        type="button"
      >
        <span>Menu</span>
        <svg aria-hidden="true" viewBox="0 0 18 18">
          <path d="M3 5.25h12M3 9h12M3 12.75h12" />
        </svg>
      </button>

      <Drawer
        ariaLabel="Site menu"
        backdropClassName="mobile-menu__backdrop"
        className="mobile-menu__drawer"
        id="mobile-site-menu"
        onOpenChange={setOpen}
        open={open}
        side="right"
      >
        <div className="mobile-menu__header">
          <span><b>Rendyn</b><small>Navigation</small></span>
          <button aria-label="Close site menu" onClick={closeMenu} type="button">
            <svg aria-hidden="true" viewBox="0 0 18 18"><path d="m4.5 4.5 9 9m0-9-9 9" /></svg>
          </button>
        </div>

        <div className="mobile-menu__body">
          <nav aria-label="Primary navigation" className="mobile-menu__links">
            {primaryLinks.map((link) => (
              <a href={link.href} key={link.href} onClick={closeMenu}>
                <strong>{link.label}</strong>
                <b aria-hidden="true">→</b>
              </a>
            ))}
          </nav>

          <section aria-labelledby="mobile-catalogue-title" className="mobile-menu__catalogue">
            <div className="mobile-menu__catalogue-heading">
              <span><b>Product</b><strong id="mobile-catalogue-title">Component catalogue</strong></span>
              <small>{groups.reduce((count, group) => count + group.components.length, 0)} components</small>
            </div>

            <div aria-label="Filter components by category" className="mobile-menu__filters">
              {groups.map((group) => (
                <button
                  aria-pressed={group.id === activeGroup.id}
                  key={group.id}
                  onClick={() => setActiveGroupId(group.id)}
                  type="button"
                >
                  <span>{group.label}</span>
                  <b>{group.components.length}</b>
                </button>
              ))}
            </div>

            <div className="mobile-menu__category-copy">
              <strong>{activeGroup.label}</strong>
              <span>{activeGroup.detail}</span>
            </div>
            <div className="mobile-menu__components">
              {activeGroup.components.map(({ publicSlug, name }) => (
                <a href={`/components/${publicSlug}`} key={publicSlug} onClick={closeMenu}>
                  <strong>{name}</strong>
                  <b aria-hidden="true">↗</b>
                </a>
              ))}
            </div>
            <a className="mobile-menu__catalogue-footer" href="/components" onClick={closeMenu}>
              <span><strong>Browse complete catalogue</strong><small>Preview every component</small></span>
              <b aria-hidden="true">→</b>
            </a>
          </section>

          <div className="mobile-menu__actions">
            <a href="/login?next=%2Faccount" onClick={closeMenu}>Sign in</a>
            <a className="button" href={SIGN_UP_HREF} onClick={closeMenu}>Start 7-day trial</a>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
