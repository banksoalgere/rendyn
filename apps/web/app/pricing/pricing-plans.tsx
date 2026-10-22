import styles from './pricing.module.css';

const options = [
  {
    name: 'Browse & copy',
    description: 'Browse components and make it yours. No account needed.',
    href: '/components',
    action: 'Browse components',
    features: ['Every catalogue component', 'Interactive previews', 'Complete source code', 'Dependencies, install steps and licences'],
    recommended: false,
  },
  {
    name: 'Connect your agent',
    description: 'Give your agent taste. The best way to use Rendyn is through MCP.',
    href: '/login?next=%2Fapp%2Fmcp',
    action: 'Connect to MCP',
    features: ['Everything in the catalogue', 'Component search inside your project', 'Preview images for your agent', 'Complete source and dependencies through MCP'],
    recommended: true,
  },
];

export default function PricingPlans() {
  return <div className={styles.planGrid}>{options.map(option => <article className={`${styles.planCard} ${option.recommended ? styles.recommendedCard : ''}`} key={option.name}>
    {option.recommended && <span className={styles.recommendedLabel}>Recommended</span>}
    <h2>{option.name}</h2>
    <p className={styles.planDescription}>{option.description}</p>
    <p className={styles.freePrice}><strong>$0</strong><span>Free. No subscription.</span></p>
    <a className={styles.planAction} href={option.href}>{option.action} <span aria-hidden="true">↗</span></a>
    <ul className={styles.planFeatures}>{option.features.map(feature => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}</ul>
    <p className={styles.accessNote}>{option.recommended ? 'A free account is only needed for MCP.' : 'No sign-up. No card. Just code.'}</p>
  </article>)}</div>;
}
