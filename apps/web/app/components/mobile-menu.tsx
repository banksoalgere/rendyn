'use client';

/* eslint-disable @next/next/no-html-link-for-pages -- Vinext's next/link shim can hydrate from a second React context. */

import { useState } from 'react';
import { Drawer } from '@/components/motion/drawer';
import { componentGroups, getPublicComponentSlug } from './product-menu';

const primaryLinks = [
  { href: '/components', label: 'Browse components', number: '01' },
  { href: '#how-it-works', label: 'How it works', number: '02' },
  { href: '/pricing', label: 'Pricing', number: '03' },
  { href: '#for-teams', label: 'For teams', number: '04' },
  { href: '#docs', label: 'Resources', number: '05' },
] as const;

const SIGN_UP_HREF = '/pricing';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState<(typeof componentGroups)[number]['id']>('motion');
  const activeGroup = componentGroups.find((group) => group.id === activeGroupId) ?? componentGroups[0];
  const closeMenu = () => setOpen(false);

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
                <span>{link.number}</span>
                <strong>{link.label}</strong>
                <b aria-hidden="true">→</b>
              </a>
            ))}
          </nav>

          <section aria-labelledby="mobile-catalogue-title" className="mobile-menu__catalogue">
            <div className="mobile-menu__catalogue-heading">
              <span><b>Product</b><strong id="mobile-catalogue-title">Component catalogue</strong></span>
              <small>189 components</small>
            </div>

            <div aria-label="Filter components by category" className="mobile-menu__filters">
              {componentGroups.map((group) => (
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
              {activeGroup.components.map(([slug, name], index) => (
                <a href={`/components/${getPublicComponentSlug(name)}`} key={slug} onClick={closeMenu}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
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
