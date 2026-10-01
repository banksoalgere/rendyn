"use client";

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from '@/components/rendyn-libraries/mui/upstream/data/material/getting-started/templates/shared-theme/AppTheme';
import AppAppBar from '@/components/rendyn-libraries/mui/upstream/data/material/getting-started/templates/blog/components/AppAppBar';
import MainContent from '@/components/rendyn-libraries/mui/upstream/data/material/getting-started/templates/blog/components/MainContent';
import Latest from '@/components/rendyn-libraries/mui/upstream/data/material/getting-started/templates/blog/components/Latest';
import Footer from '@/components/rendyn-libraries/mui/upstream/data/material/getting-started/templates/blog/components/Footer';

export default function Blog(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <MainContent />
        <Latest />
      </Container>
      <Footer />
    </AppTheme>
  );
}
