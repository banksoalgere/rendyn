'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/motion/tabs';
import styles from './pricing.module.css';

const plans = [
  {
    name: 'Pro',
    description: 'For individual builders shipping polished product interfaces regularly.',
    monthlyPrice: '15',
    yearlyPrice: '150',
    recommended: true,
    planPrefix: 'pro',
    features: [
      'Unlimited component searches',
      'Complete React and TypeScript source',
      'Dependencies and exact install steps',
      'Unlimited personal collections',
      'New catalogue drops every month',
    ],
  },
  {
    name: 'Team',
    description: 'A shared component discovery workflow for teams building together.',
    monthlyPrice: '20',
    yearlyPrice: '200',
    perUser: true,
    planPrefix: 'team',
    features: [
      'Everything in Pro',
      'Shared team collections',
      'Centralised team billing',
      'Priority catalogue requests',
      'Priority product support',
    ],
  },
  {
    name: 'Enterprise',
    description: 'A tailored Rendyn rollout for larger product and engineering organisations.',
    monthlyPrice: null,
    yearlyPrice: null,
    wide: true,
    planPrefix: null,
    features: [
      'Everything in Team',
      'Flexible workspace and seat arrangements',
      'Procurement and onboarding support',
      'Custom catalogue guidance',
      'Dedicated account support',
    ],
  },
];

function Check() {
  return <span className={styles.check} aria-hidden="true">✓</span>;
}

export default function PricingPlans({ returnTo }: { returnTo: string }) {
  const [yearly, setYearly] = useState(false);

  function changeBillingPeriod(value: string) {
    if (value === 'monthly' || value === 'yearly') {
      setYearly(value === 'yearly');
    }
  }

  return (
    <>
      <Tabs
        className={styles.billingTabs}
        value={yearly ? 'yearly' : 'monthly'}
        onValueChange={changeBillingPeriod}
        variant="pill"
      >
        <TabsList className={styles.billingToggle}>
          <TabsTrigger
            className={styles.billingTrigger}
            indicatorClassName={styles.billingIndicator}
            value="monthly"
          >
            Monthly
          </TabsTrigger>
          <TabsTrigger
            className={styles.billingTrigger}
            indicatorClassName={styles.billingIndicator}
            value="yearly"
          >
            Yearly <span className={styles.billingSaving}>Save 17%</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className={styles.trialPromise}>
        <strong>7 days free. Card required.</strong>
        <span>Start with full access today. Your first subscription charge is on day 8 unless you cancel before the trial ends.</span>
      </div>
      <div className={styles.planGrid}>
        {plans.map((plan) => {
          const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
          const cadence = plan.perUser
            ? yearly ? '/ user / year' : '/ user / month'
            : yearly ? '/ year' : '/ month';

          return (
            <article
              className={`${styles.planCard} ${plan.wide ? styles.enterpriseCard : ''} ${plan.recommended ? styles.recommendedCard : ''}`}
              key={plan.name}
            >
              {plan.recommended && <span className={styles.recommendedLabel}>Popular</span>}
              <div className={styles.planCardBody}>
                <h2>{plan.name}</h2>
                <p className={styles.planDescription}>{plan.description}</p>
                <div className={styles.planFooter}>
                  {price === null ? (
                    <p><strong className={styles.customPrice}>Custom</strong></p>
                  ) : (
                    <p><strong>${price}</strong><span>{cadence}</span></p>
                  )}
                  <div className={styles.planActions}>
                    {plan.name === 'Enterprise' ? (
                      <a href="mailto:sales@rendyn.dev">Contact sales</a>
                    ) : (
                      <form action="/api/billing/checkout" method="post">
                        <input
                          name="plan"
                          type="hidden"
                          value={`${plan.planPrefix}_${yearly ? 'yearly' : 'monthly'}`}
                        />
                        <input name="return_to" type="hidden" value={returnTo} />
                        <button type="submit">Start 7-day trial</button>
                      </form>
                    )}
                    {yearly && price !== null && <span>Two months included <b aria-hidden="true">›</b></span>}
                  </div>
                  {price !== null ? (
                    <p className={styles.trialTerms}>
                      Card collected now. No subscription charge today. Cancel before the trial ends to avoid being charged.
                    </p>
                  ) : null}
                </div>
              </div>
              <ul className={styles.planFeatures}>
                {plan.features.map((feature) => (
                  <li key={feature}><Check /><span>{feature}</span></li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </>
  );
}
