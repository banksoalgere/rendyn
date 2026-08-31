/* eslint-disable @next/next/no-html-link-for-pages -- Vinext can hydrate next/link from a second React context; native anchors avoid that runtime failure. */
import { Brand } from './brand';

const navigation = [
  { href: '/#product', id: 'product', label: 'Product' },
  { href: '/components', id: 'catalogue', label: 'Components' },
  { href: '/#how-it-works', id: 'how-it-works', label: 'What you get' },
  { href: '/#resources', id: 'resources', label: 'Resources' },
];

type NavigationId = (typeof navigation)[number]['id'];

interface SiteHeaderProps {
  activeSection?: NavigationId;
}

export function SiteHeader({ activeSection }: SiteHeaderProps = {}) {
  return (
    <header className={`site-header${activeSection ? ' editorial-header' : ''}`}>
      <Brand />
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <a
            aria-current={activeSection === item.id ? 'page' : undefined}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <a className="text-link" href="/#docs">View docs</a>
        <a className="button button--small" href="/#early-access">
          <span className="desktop-label">Early access</span>
          <span className="mobile-label">Join</span>
        </a>
      </div>
    </header>
  );
}
