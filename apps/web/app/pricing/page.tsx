import '../globals.css';
import { pageMetadata } from '../../lib/seo';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import PricingPlans from './pricing-plans';
import styles from './pricing.module.css';

export const metadata = pageMetadata(
  'Free React Components & MCP Access | Rendyn',
  'Every Rendyn component and its source code is free without login. Connect your coding agent to the free MCP with a free account. No card or subscription needed.',
  '/pricing',
);

const faqs = [
  { question: 'What is free?', answer: 'Every component, live preview, source file, dependency list, installation instruction and MCP tool. There is no paid plan or expiry date.' },
  { question: 'Do I need to sign up?', answer: 'Only to connect your coding agent to MCP. You can browse, preview and copy component code without an account. Saved components stay in this browser.' },
  { question: 'Why use MCP?', answer: 'MCP is the best way to use Rendyn with a coding agent. Your agent can search for components, compare previews and retrieve complete source and dependencies inside your project.' },
  { question: 'Do I need a card?', answer: 'No. Creating a free account does not start a trial, checkout or subscription.' },
  { question: 'Can I use the code commercially?', answer: 'Follow the licence included with each component and retain its copyright and licence notices. You can find the licence alongside the source and installation instructions.' },
  { question: 'What if I previously subscribed?', answer: 'Free access does not automatically cancel an existing subscription or change its billing schedule. Manage or cancel previous billing from Account in your workspace.' },
];

export default function PricingPage() {
  return <div className={styles.pricingPage}>
    <div className={styles.headerShell}><SiteHeader activeSection="pricing" /></div>
    <main className={styles.main}>
      <section className={styles.pricingHero} aria-labelledby="pricing-title">
        <p className={styles.eyebrow}>Free for every builder</p>
        <h1 id="pricing-title">Everything is free.</h1>
        <p className={styles.freeSubtitle}>Copy a component. Or give your agent taste with MCP.<br />Sign up only to connect your agent.</p>
        <PricingPlans />
      </section>
      <section className={styles.faqSection} aria-labelledby="faq-title">
        <h2 id="faq-title">A few useful details.</h2>
        <div className={styles.faqList}>{faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
      </section>
    </main>
    <SiteFooter />
  </div>;
}
