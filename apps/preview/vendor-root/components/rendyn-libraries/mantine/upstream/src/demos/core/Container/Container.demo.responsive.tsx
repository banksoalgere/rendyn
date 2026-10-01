"use client";

import cx from 'clsx';

import { Container, createTheme, MantineThemeProvider } from '@mantine/core';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Container/Container.demo.responsive.module.css';

const theme = createTheme({
  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
      }),
    }),
  },
});

function Demo() {
  return (
    <MantineThemeProvider theme={theme}>
      <Container size="responsive" bg="var(--mantine-color-blue-light)">
        Container with responsive size
      </Container>
    </MantineThemeProvider>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
