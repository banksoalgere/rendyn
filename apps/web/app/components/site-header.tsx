import Link from 'next/link';
import { Brand } from './brand';

const navigation = [
  { href: '/#product', id: 'product', label: 'Product' },
  { href: '/#catalogue', id: 'catalogue', label: 'Components' },
  { href: '/#how-it-works', id: 'how-it-works', label: 'What you get' },
  { href: '/#resources', id: 'resources', label: 'Resources' },
];

type NavigationId = (typeof navigation)[number]['id'];

interface SiteHeaderProps {
  activeSection?: NavigationId;
  homeHref?: string;
}

export function SiteHeader({ activeSection, homeHref = '#top' }: SiteHeaderProps = {}) {
  return (
    <header className={`site-header${activeSection ? ' editorial-header' : ''}`}>
      <Brand href={homeHref} />
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <Link
            aria-current={activeSection === item.id ? 'page' : undefined}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <Link className="text-link" href="/#docs">View docs</Link>
        <Link className="button button--small" href="/#early-access">
          <span className="desktop-label">Early access</span>
          <span className="mobile-label">Join</span>
        </Link>
      </div>
    </header>
  );
}
