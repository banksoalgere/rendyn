import { AgentIntegration } from './components/agent-integration';
import { CatalogueShowcase } from './components/catalogue-showcase';
import { Comparison } from './components/comparison';
import { FeatureShowcase } from './components/feature-showcase';
import { Hero } from './components/hero';
import { Resources } from './components/resources';
import { FinalCallToAction, SiteFooter } from './components/site-footer';
import { SiteHeader } from './components/site-header';
import { ResultIncludesStrip, ValueProposition } from './components/value-proposition';

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <ResultIncludesStrip />
      <CatalogueShowcase />
      <ValueProposition />
      <FeatureShowcase />
      <AgentIntegration />
      <Comparison />
      <Resources />
      <FinalCallToAction />
      <SiteFooter />
    </main>
  );
}
