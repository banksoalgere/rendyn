import { Brand } from './brand';

const navigation = [
  { href: '#product', label: 'Product' },
  { href: '#catalogue', label: 'Components' },
  { href: '#how-it-works', label: 'What you get' },
  { href: '#resources', label: 'Resources' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Brand />
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <a href={item.href} key={item.href}>{item.label}</a>
        ))}
      </nav>
      <div className="header-actions">
        <a className="text-link" href="#docs">View docs</a>
        <a className="button button--small" href="#early-access">
          <span className="desktop-label">Early access</span>
          <span className="mobile-label">Join</span>
        </a>
      </div>
    </header>
  );
}
