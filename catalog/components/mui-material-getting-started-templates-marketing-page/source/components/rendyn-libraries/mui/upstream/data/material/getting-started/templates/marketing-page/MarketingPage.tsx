"use client";

import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '@/components/rendyn-libraries/mui/upstream/data/material/getting-started/templates/shared-theme/AppTheme';
import AppAppBar from '@/components/rendyn-libraries/mui/upstream/data/material/getting-started/templates/marketing-page/components/AppAppBar';
import Hero from '@/components/rendyn-libraries/mui/upstream/data/material/getting-started/templates/marketing-page/components/Hero';
import LogoCollection from '@/components/rendyn-libraries/mui/upstream/data/material/getting-started/templates/marketing-page/components/LogoCollection';
import Highlights from '@/components/rendyn-libraries/mui/upstream/data/material/getting-started/templates/marketing-page/components/Highlights';
import Pricing from '@/components/rendyn-libraries/mui/upstream/data/material/getting-started/templates/marketing-page/components/Pricing';
import Features from '@/components/rendyn-libraries/mui/upstream/data/material/getting-started/templates/marketing-page/components/Features';
import Testimonials from '@/components/rendyn-libraries/mui/upstream/data/material/getting-started/templates/marketing-page/components/Testimonials';
import FAQ from '@/components/rendyn-libraries/mui/upstream/data/material/getting-started/templates/marketing-page/components/FAQ';
import Footer from '@/components/rendyn-libraries/mui/upstream/data/material/getting-started/templates/marketing-page/components/Footer';

export default function MarketingPage(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Hero />
      <div>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
