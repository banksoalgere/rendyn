"use client";

import { createTheme, Loader, MantineThemeProvider } from '@mantine/core';

import { CssLoader, cssLoaderModuleCssCode, cssLoaderTsxCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Loader/_CssLoader';

const theme = createTheme({
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, custom: CssLoader },
        type: 'custom',
      },
    }),
  },
});

function Demo() {
  return (
    <MantineThemeProvider theme={theme}>
      <Loader />
    </MantineThemeProvider>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
