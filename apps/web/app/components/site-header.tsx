import Link from 'next/link';
import { Brand } from './brand';

const navigation = [
  { href: '/#product', label: 'Product' },
  { href: '/#catalogue', label: 'Components' },
  { href: '/#how-it-works', label: 'What you get' },
  { href: '/#resources', label: 'Resources' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Brand href="/" />
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <Link href={item.href} key={item.href}>{item.label}</Link>
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
