/* eslint-disable @next/next/no-html-link-for-pages */
import styles from './pricing.module.css';
import type { Metadata } from 'next';
import PricingPlans from './pricing-plans';

export const metadata: Metadata = {
  title: 'Pricing | DesignMCP',
  description: 'Simple monthly or yearly access to DesignMCP.',
};

const trustedAgents = [
  { name: 'Codex', logo: '/agent-logos/codex.svg' },
  { name: 'Claude Code', logo: '/agent-logos/claude-code.svg' },
  { name: 'Cursor', logo: '/agent-logos/cursor.svg' },
  { name: 'GitHub Copilot', logo: '/agent-logos/github-copilot.svg' },
  { name: 'Gemini CLI', logo: '/agent-logos/gemini-cli.svg' },
];

type FeatureValue = string | boolean;
type ComparisonSection = {
  title: string;
  rows: Array<[string, FeatureValue, FeatureValue, FeatureValue, FeatureValue]>;
};

const comparisonSections: ComparisonSection[] = [
  {
    title: 'Essentials',
    rows: [
      ['Component searches', 'Limited', 'Unlimited', 'Unlimited', 'Unlimited'],
      ['Interactive previews', '4', 'Unlimited', 'Unlimited', 'Unlimited'],
      ['Access on web and through MCP', 'Web only', true, true, true],
      ['Personal catalogue history', '30 days', 'Unlimited', 'Unlimited', 'Unlimited'],
      ['Shared team workspace', false, false, true, true],
    ],
  },
  {
    title: 'Catalogue quality',
    rows: [
      ['Curated component source', true, true, true, true],
      ['Complete interaction states', '4 unlocks', true, true, true],
      ['Responsive implementations', '4 unlocks', true, true, true],
      ['Keyboard and touch behaviour', '4 unlocks', true, true, true],
      ['Reduced-motion support', '4 unlocks', true, true, true],
      ['Accessibility notes', true, true, true, true],
      ['Fit reasoning for every result', true, true, true, true],
      ['Regular catalogue updates', true, true, true, true],
      ['Early access to new drops', false, true, true, true],
    ],
  },
  {
    title: 'Features',
    rows: [
      ['Ranked shortlists', 'Limited', 'Unlimited', 'Unlimited', 'Unlimited'],
      ['Working component previews', true, true, true, true],
      ['Search by product intent', true, true, true, true],
      ['Search by interaction pattern', true, true, true, true],
      ['Search by visual direction', true, true, true, true],
      ['Filter by framework', true, true, true, true],
      ['Filter by dependency', true, true, true, true],
      ['Compare candidate components', false, true, true, true],
      ['Save collections', 'Up to 3', 'Unlimited', 'Shared', 'Custom'],
      ['Share collection links', false, true, true, true],
      ['Component unlocks', '4 total', 'Unlimited', 'Unlimited', 'Unlimited'],
      ['Priority catalogue requests', false, false, true, true],
      ['Team discovery controls', false, false, true, true],
    ],
  },
  {
    title: 'Source & delivery',
    rows: [
      ['Complete React source', '4 unlocks', true, true, true],
      ['Complete TypeScript source', '4 unlocks', true, true, true],
      ['Styles and design tokens', '4 unlocks', true, true, true],
      ['Dependencies included', true, true, true, true],
      ['Exact install steps', true, true, true, true],
      ['Asset inventory', true, true, true, true],
      ['Source hashes', true, true, true, true],
      ['Licence clarity', true, true, true, true],
      ['Copy from the browser', true, true, true, true],
      ['Deliver directly to your agent', false, true, true, true],
    ],
  },
  {
    title: 'Account & support',
    rows: [
      ['Included seats', '1', '1', '2+', 'Custom'],
      ['Billing', 'None', 'Individual', 'Centralised', 'Custom'],
      ['Cancel any time', true, true, true, 'Contract'],
      ['Support', 'Community', 'Standard', 'Priority', 'Dedicated'],
      ['Catalogue request voting', false, true, true, true],
      ['Team onboarding', false, false, true, true],
      ['Procurement support', false, false, false, true],
      ['Custom catalogue guidance', false, false, false, true],
    ],
  },
];

const faqs = [
  {
    question: 'How does DesignMCP pricing work?',
    answer: 'Start free, choose Pro for $15 per month, or use Team from $20 per user per month. Pro and Team can be billed yearly with two months included, while Enterprise pricing is tailored to the organisation.',
  },
  {
    question: 'Can I switch from monthly to yearly?',
    answer: 'Yes. You can move to yearly billing at any time and the change will begin at the end of your current monthly period.',
  },
  {
    question: 'Can I cancel whenever I want?',
    answer: 'Yes. Your access continues until the end of the period you already paid for, with no additional cancellation fee.',
  },
  {
    question: 'Is Team pricing charged per user?',
    answer: 'Yes. Team is $20 per user each month or $200 per user when billed yearly. It adds shared collections, centralised billing and priority support.',
  },
  {
    question: 'What do I receive with each component?',
    answer: 'Each result includes the complete implementation, all relevant states, dependencies, assets, installation steps and the context your coding agent needs to use it well.',
  },
  {
    question: 'Which coding agents are supported?',
    answer: 'DesignMCP works with modern MCP-compatible coding agents and can also be used directly from the browser.',
  },
  {
    question: 'Can I use the source in commercial projects?',
    answer: 'Yes. Source delivered through your subscription can be adapted for your own commercial products, subject to any clearly listed third-party licence.',
  },
  {
    question: 'Is payment secure?',
    answer: 'Payments are handled by a dedicated payment provider. DesignMCP does not store your full card details.',
  },
];

const footerGroups = [
  ['Product', ['Components', 'How it works', 'For teams', 'Pricing']],
  ['Developers', ['Documentation', 'MCP connection', 'Component format', 'Changelog']],
  ['Resources', ['Component guide', 'Agent workflows', 'Catalogue policy', 'Status']],
  ['Company', ['About', 'Contact', 'Privacy', 'Terms']],
];

function ComparisonValue({ value }: { value: FeatureValue }) {
  if (value === true) return <span className={styles.tableCheck} aria-label="Included">✓</span>;
  if (value === false) return <span className={styles.tableDash} aria-label="Not included">—</span>;
  return <span>{value}</span>;
}

export default function PricingPage() {
  return (
    <div className={styles.pricingPage} id="top">
      <header className={styles.topbar}>
        <a className={styles.brand} href="/" aria-label="DesignMCP home">
          <span className={styles.brandMark}>D</span>
          <strong>DesignMCP</strong>
          <span className={styles.brandMenu} aria-hidden="true">◧</span>
        </a>
        <div className={styles.topActions}>
          <button type="button" aria-label="Search"><span aria-hidden="true">⌕</span></button>
          <a href="/login?next=%2Faccount">Log in</a>
        </div>
      </header>

      <aside className={styles.sidebar} aria-label="Site navigation">
        <nav>
          <a className={styles.backLink} href="/"><span aria-hidden="true">←</span> Home</a>
          <a href="/#components">Explore components</a>
          <a href="/#how-it-works">How it works</a>
          <a href="/#for-teams">For teams</a>
          <a href="/#docs">Documentation</a>
          <a className={styles.activeLink} href="/pricing" aria-current="page">Pricing</a>
          <a href="/#get-started">Get started</a>
        </nav>
        <span className={styles.sidebarGlyph} aria-hidden="true">⌜⌟</span>
      </aside>

      <main className={styles.main}>
        <section className={styles.pricingHero} aria-labelledby="pricing-title">
          <p className={styles.eyebrow}>DesignMCP</p>
          <h1 id="pricing-title">Pricing</h1>
          <PricingPlans />
        </section>

        <section className={styles.trustedSection} aria-label="Compatible coding agents">
          <h2>Trusted by builders using</h2>
          <div className={styles.trustedLogos}>
            {trustedAgents.map((agent) => (
              <span key={agent.name}><img src={agent.logo} alt="" />{agent.name}</span>
            ))}
          </div>
        </section>

        <section className={styles.compareSection} id="compare" aria-labelledby="compare-title">
          <h2 id="compare-title">Compare features across plans</h2>
          <div className={styles.comparisonTable} role="table" aria-label="DesignMCP plan comparison">
            <div className={`${styles.comparisonRow} ${styles.comparisonPlans}`} role="row">
              <span role="columnheader" />
              <div role="columnheader"><strong>Free</strong><a href="#top">Get Free</a></div>
              <div role="columnheader"><strong>Pro</strong><a href="#top">Get Pro</a></div>
              <div role="columnheader"><strong>Team</strong><a href="#top">Get Team</a></div>
              <div role="columnheader"><strong>Enterprise</strong><a href="#top">Contact</a></div>
            </div>
            {comparisonSections.map((section) => (
              <div className={styles.comparisonGroup} key={section.title} role="rowgroup">
                <h3>{section.title}</h3>
                {section.rows.map(([label, free, pro, team, enterprise]) => (
                  <div className={styles.comparisonRow} role="row" key={label}>
                    <strong role="rowheader">{label}</strong>
                    <div role="cell"><ComparisonValue value={free} /></div>
                    <div role="cell"><ComparisonValue value={pro} /></div>
                    <div role="cell"><ComparisonValue value={team} /></div>
                    <div role="cell"><ComparisonValue value={enterprise} /></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p className={styles.comparisonNote}>*Catalogue availability evolves as new components are added.</p>
        </section>

        <section className={styles.faqSection} aria-labelledby="faq-title">
          <h2 id="faq-title">FAQ</h2>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerGrid}>
            {footerGroups.map(([title, links]) => (
              <div key={title}>
                <strong>{title}</strong>
                {(links as string[]).map((link) => <a href={link === 'Pricing' ? '/pricing' : '/'} key={link}>{link}</a>)}
              </div>
            ))}
          </div>
          <div className={styles.footerBottom}>
            <div className={styles.socials} aria-label="Social links"><a href="#top">X</a><a href="#top">in</a><a href="#top">◉</a><a href="#top">◌</a></div>
            <p>DesignMCP © 2026 <a href="/">Manage cookies</a></p>
            <span>English&nbsp;&nbsp; United Kingdom</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
