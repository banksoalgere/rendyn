import { Brand } from './brand';

const navigation = [
  { href: '#product', label: 'Product' },
  { href: '#catalogue', label: 'Components' },
  { href: '#how-it-works', label: 'What you get' },
  { href: '#resources', label: 'Resources' },
];

interface SiteHeaderProps {
  homeHref?: string;
  navPrefix?: string;
}

export function SiteHeader({ homeHref = '#top', navPrefix = '' }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <Brand href={homeHref} />
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <a href={`${navPrefix}${item.href}`} key={item.href}>{item.label}</a>
        ))}
      </nav>
      <div className="header-actions">
        <a className="text-link" href={`${navPrefix}#docs`}>View docs</a>
        <a className="button button--small" href={`${navPrefix}#early-access`}>
          <span className="desktop-label">Early access</span>
          <span className="mobile-label">Join</span>
        </a>
      </div>
    </header>
  );
}
