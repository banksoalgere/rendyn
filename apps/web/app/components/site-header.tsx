import { Brand } from './brand';
import { MobileMenu } from './mobile-menu';
import styles from './site-shell.module.css';

const navigation = [
  { href: '/', id: 'product', label: 'Overview' },
  { href: '/components', id: 'catalogue', label: 'Components' },
  { href: '/#how-it-works', id: 'how-it-works', label: 'How it works' },
  { href: '/pricing', id: 'pricing', label: 'Free access' },
  { href: '/guides', id: 'resources', label: 'Guides' },
];

type NavigationId = (typeof navigation)[number]['id'];

interface SiteHeaderProps {
  activeSection?: NavigationId;
}

export function SiteHeader({ activeSection }: SiteHeaderProps = {}) {
  return (
    <header className={styles.header}>
      <Brand />
      <nav className={styles.navigation} aria-label="Primary navigation">
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
      <div className={styles.actions}>
        <a className={styles.signIn} href="/login?next=%2Fapp%2Fmcp">Sign in</a>
        <a className={styles.trial} href="/login?next=%2Fapp%2Fmcp">Connect to MCP</a>
        <MobileMenu activeSection={activeSection} />
      </div>
    </header>
  );
}
