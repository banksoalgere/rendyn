import { isFreeAccessActive } from '../../../../packages/catalog/src/free-access';
import { Brand } from './brand';
import { MobileMenu, type MobileComponentGroup } from './mobile-menu';
import { catalogueEntries } from '../../lib/catalogue';
import styles from './site-shell.module.css';

const navigation = [
  { href: '/', id: 'product', label: 'Overview' },
  { href: '/components', id: 'catalogue', label: 'Components' },
  { href: '/mcp', id: 'mcp', label: 'MCP' },
  { href: '/#how-it-works', id: 'how-it-works', label: 'How it works' },
  { href: '/pricing', id: 'pricing', label: 'Pricing' },
  { href: '/guides', id: 'resources', label: 'Guides' },
];

type NavigationId = (typeof navigation)[number]['id'];

const mobileGroups: MobileComponentGroup[] = [
  { id: 'motion', label: 'Interaction', detail: 'Interaction and animation' },
  { id: 'agents', label: 'Agent UI', detail: 'Interfaces for AI products' },
  { id: 'blocks', label: 'Components & blocks', detail: 'Controls and product patterns' },
].map((group) => ({
  ...group,
  components: catalogueEntries.filter((entry) => entry.category === group.id)
    .map(({ publicSlug, name }) => ({ publicSlug, name })),
}));

interface SiteHeaderProps {
  activeSection?: NavigationId;
}

export function SiteHeader({ activeSection }: SiteHeaderProps = {}) {
  const freeAccess = isFreeAccessActive();
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
        <a className={styles.signIn} href="/login?next=%2Fapp">Sign in</a>
        <a className={styles.trial} href={freeAccess ? '/login?next=%2Fapp' : '/pricing'}>{freeAccess ? 'Get started free' : 'Start trial'} <span aria-hidden="true">↗</span></a>
        <MobileMenu groups={mobileGroups} />
      </div>
    </header>
  );
}
