"use client";

import { createTheme, Input, MantineThemeProvider } from '@mantine/core';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/styles/Styles.demo.dataSize.module.css';

const theme = createTheme({
  components: {
    Input: Input.extend({ classNames: classes }),
  },
});

function Demo() {
  return (
    <MantineThemeProvider theme={theme}>
      <Input placeholder="Size XXL" size="xxl" />
      <Input placeholder="Size XXS" size="xxs" mt="md" />
    </MantineThemeProvider>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
