"use client";

import { createTheme, Loader, MantineThemeProvider } from '@mantine/core';

import { RingLoader, ringLoaderCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Loader/_RingLoader';

const theme = createTheme({
  components: {
    Loader: Loader.extend({
      defaultProps: {
        loaders: { ...Loader.defaultLoaders, ring: RingLoader },
        type: 'ring',
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
