'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';
import { Drawer } from '@/components/motion/drawer';
import { Brand } from './brand';

const primaryLinks = [
  { href: '/components', id: 'catalogue', label: 'Components', description: 'Explore the full library' },
] as const;

const exploreLinks = [
  { href: '/#how-it-works', id: 'how-it-works', label: 'How it works' },
  { href: '/pricing', id: 'pricing', label: 'Free access' },
  { href: '/#for-teams', id: 'teams', label: 'For teams' },
  { href: '/guides', id: 'resources', label: 'Guides' },
] as const;

export function MobileMenu({ activeSection }: { activeSection?: string }) {
  const [open, setOpen] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia('(min-width: 951px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, [open]);

  return (
    <div className="mobile-menu">
      <button
        aria-controls="mobile-site-menu"
        aria-expanded={open}
        aria-label="Open site menu"
        className="mobile-menu__trigger"
        onClick={() => {
          // Keep the existing drawer outside sticky, blurred page headers.
          setPortalTarget(document.body);
          setOpen(true);
        }}
        type="button"
      >
        <span>Menu</span>
        <Menu aria-hidden="true" />
      </button>

      {portalTarget && createPortal(
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
            <Brand />
            <button aria-label="Close site menu" onClick={closeMenu} type="button">
              <X aria-hidden="true" />
            </button>
          </div>

          <div className="mobile-menu__body">
            <nav aria-label="Main pages" className="mobile-menu__links">
              {primaryLinks.map(link => (
                <a aria-current={activeSection === link.id ? 'page' : undefined} href={link.href} key={link.href} onClick={closeMenu}>
                  <span><strong>{link.label}</strong><small>{link.description}</small></span>
                </a>
              ))}
            </nav>
            <nav aria-label="Explore Rendyn" className="mobile-menu__explore">
              {exploreLinks.map(link => (
                <a aria-current={activeSection === link.id ? 'page' : undefined} href={link.href} key={link.href} onClick={closeMenu}>{link.label}</a>
              ))}
            </nav>
          </div>

          <div className="mobile-menu__actions">
            <a className="button" href="/login?next=%2Fapp%2Fmcp" onClick={closeMenu}>Connect to MCP</a>
            <a className="mobile-menu__sign-in" href="/login?next=%2Fapp%2Fmcp" onClick={closeMenu}>Sign in to your account</a>
          </div>
        </Drawer>,
        portalTarget,
      )}
    </div>
  );
}
