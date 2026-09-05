import { pageMetadata } from '../../lib/seo';
import styles from './pricing.module.css';
import type { Metadata } from 'next';
import { safeReturnTo } from '@/lib/auth/inputs';
import PricingPlans from './pricing-plans';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';

export const metadata: Metadata = pageMetadata(
  'Pricing for React Components & MCP Access | Rendyn',
  'Explore Rendyn Pro and Team plans. Start a 7-day trial for React component source and MCP access, then choose monthly or yearly billing.',
  '/pricing',
);

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
  rows: Array<[string, FeatureValue, FeatureValue, FeatureValue]>;
};

const comparisonSections: ComparisonSection[] = [
  {
    title: 'Essentials',
    rows: [
      ['Seven-day full-access trial', true, true, 'Custom'],
      ['Card collected when trial starts', true, true, 'Custom'],
      ['First charge on day 8', true, true, 'Custom'],
      ['Component searches', 'Unlimited', 'Unlimited', 'Unlimited'],
      ['Interactive previews', 'Unlimited', 'Unlimited', 'Unlimited'],
      ['Access on web and through MCP', true, true, true],
      ['Personal catalogue history', 'Unlimited', 'Unlimited', 'Unlimited'],
      ['Shared team workspace', false, true, true],
    ],
  },
  {
    title: 'Catalogue quality',
    rows: [
      ['Curated component source', true, true, true],
      ['Complete interaction states', true, true, true],
      ['Responsive implementations', true, true, true],
      ['Keyboard and touch behaviour', true, true, true],
      ['Reduced-motion support', true, true, true],
      ['Accessibility notes', true, true, true],
      ['Fit reasoning for every result', true, true, true],
      ['Regular catalogue updates', true, true, true],
      ['Early access to new drops', true, true, true],
    ],
  },
  {
    title: 'Features',
    rows: [
      ['Ranked shortlists', 'Unlimited', 'Unlimited', 'Unlimited'],
      ['Working component previews', true, true, true],
      ['Search by product intent', true, true, true],
      ['Search by interaction pattern', true, true, true],
      ['Search by visual direction', true, true, true],
      ['Filter by framework', true, true, true],
      ['Filter by dependency', true, true, true],
      ['Compare candidate components', true, true, true],
      ['Save collections', 'Unlimited', 'Shared', 'Custom'],
      ['Share collection links', true, true, true],
      ['Component source access', 'Unlimited', 'Unlimited', 'Unlimited'],
      ['Priority catalogue requests', false, true, true],
      ['Team discovery controls', false, true, true],
    ],
  },
  {
    title: 'Source & delivery',
    rows: [
      ['Complete React source', true, true, true],
      ['Complete TypeScript source', true, true, true],
      ['Styles and design tokens', true, true, true],
      ['Dependencies included', true, true, true],
      ['Exact install steps', true, true, true],
      ['Asset inventory', true, true, true],
      ['Source hashes', true, true, true],
      ['Licence clarity', true, true, true],
      ['Copy from the browser', true, true, true],
      ['Deliver directly to your agent', true, true, true],
    ],
  },
  {
    title: 'Account & support',
    rows: [
      ['Included seats', '1', '2+', 'Custom'],
      ['Billing', 'Individual', 'Centralised', 'Custom'],
      ['Cancel any time', true, true, 'Contract'],
      ['Support', 'Standard', 'Priority', 'Dedicated'],
      ['Catalogue request voting', true, true, true],
      ['Team onboarding', false, true, true],
      ['Procurement support', false, false, true],
      ['Custom catalogue guidance', false, false, true],
    ],
  },
];

const faqs = [
  {
    question: 'How does Rendyn pricing work?',
    answer: 'Choose Pro or Team, enter a card and get full access free for seven days. Unless you cancel before the trial ends, your first charge is made on day 8. Pro is $15 per month and Team starts at $20 per user per month; yearly billing includes two months.',
  },
  {
    question: 'Will I be charged when I start the trial?',
    answer: 'No subscription charge is made when you start. A valid card is collected up front, and the selected plan is charged automatically on day 8 unless you cancel before the seven-day trial ends.',
  },
  {
    question: 'Can I switch from monthly to yearly?',
    answer: 'Yes. You can move to yearly billing at any time and the change will begin at the end of your current monthly period.',
  },
  {
    question: 'Can I cancel whenever I want?',
    answer: 'Yes. Cancel before the trial ends to avoid the first charge. After billing starts, your access continues until the end of the period you already paid for, with no additional cancellation fee.',
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
    answer: 'Rendyn works with modern MCP-compatible coding agents and can also be used directly from the browser.',
  },
  {
    question: 'Can I use the source in commercial projects?',
    answer: 'Yes. Source delivered through your subscription can be adapted for your own commercial products, subject to any clearly listed third-party licence.',
  },
  {
    question: 'Is payment secure?',
    answer: 'Payments are handled by a dedicated payment provider. Rendyn does not store your full card details.',
  },
];

function ComparisonValue({ value }: { value: FeatureValue }) {
  if (value === true) return <span className={styles.tableCheck} aria-label="Included">✓</span>;
  if (value === false) return <span className={styles.tableDash} aria-label="Not included">—</span>;
  return <span>{value}</span>;
}

interface PricingPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const pricingErrors: Record<string, string> = {
  checkout: 'Checkout could not be started. Please try again.',
  configuration: 'Billing is temporarily unavailable. Please try again shortly.',
  trial_used: 'This account has already used its trial. Manage or restore billing from your account.',
  no_subscription: 'No existing subscription was found. Start a trial below.',
};

export default async function PricingPage({ searchParams }: PricingPageProps) {
  const query = await searchParams;
  const errorCode = Array.isArray(query.error) ? query.error[0] : query.error;
  const message = errorCode ? pricingErrors[errorCode] : null;
  const nextValue = Array.isArray(query.next) ? query.next[0] : query.next;
  const returnTo = safeReturnTo(nextValue, '/account');
  const billingState = Array.isArray(query.billing) ? query.billing[0] : query.billing;
  return (
    <div className={styles.pricingPage} id="top">
      <div className={styles.headerShell}><SiteHeader activeSection="pricing" /></div>

      <main className={styles.main}>
        <section className={styles.pricingHero} aria-labelledby="pricing-title">
          <p className={styles.eyebrow}>Rendyn</p>
          <h1 id="pricing-title">Pricing</h1>
          {message ? <p className={styles.pricingNotice} role="alert">{message}</p> : null}
          {billingState === 'cancelled' ? (
            <p className={styles.pricingNotice} role="status">Checkout was cancelled. No subscription was started.</p>
          ) : null}
          <PricingPlans returnTo={returnTo} />
        </section>

        <section className={styles.trustedSection} aria-label="Compatible coding agents">
          <h2>Works with the agents you use</h2>
          <div className={styles.trustedLogos}>
            {trustedAgents.map((agent) => (
              <span key={agent.name}><img src={agent.logo} alt="" />{agent.name}</span>
            ))}
          </div>
        </section>

        <section className={styles.compareSection} id="compare" aria-labelledby="compare-title">
          <h2 id="compare-title">Compare features across plans</h2>
          <div className={styles.comparisonTable} role="table" aria-label="Rendyn plan comparison">
            <div className={`${styles.comparisonRow} ${styles.comparisonPlans}`} role="row">
              <span role="columnheader" />
              <div role="columnheader"><strong>Pro</strong><a href="#top">Start trial</a></div>
              <div role="columnheader"><strong>Team</strong><a href="#top">Start trial</a></div>
              <div role="columnheader"><strong>Enterprise</strong><a href="#top">Contact</a></div>
            </div>
            {comparisonSections.map((section) => (
              <div className={styles.comparisonGroup} key={section.title} role="rowgroup">
                <h3>{section.title}</h3>
                {section.rows.map(([label, pro, team, enterprise]) => (
                  <div className={styles.comparisonRow} role="row" key={label}>
                    <strong role="rowheader">{label}</strong>
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


      </main>
      <SiteFooter />
    </div>
  );
}
