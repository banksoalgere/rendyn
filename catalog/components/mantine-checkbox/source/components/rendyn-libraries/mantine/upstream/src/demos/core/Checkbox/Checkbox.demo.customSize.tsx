"use client";

import { Checkbox, createTheme, MantineThemeProvider } from '@mantine/core';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Checkbox/Checkbox.demo.customSize.module.css';

const theme = createTheme({
  components: {
    Checkbox: Checkbox.extend({ classNames: classes }),
  },
});

function Demo() {
  return (
    <MantineThemeProvider theme={theme}>
      <Checkbox size="xxs" label="Extra small checkbox" />
      <Checkbox size="xxl" label="Extra large checkbox" mt="md" />
    </MantineThemeProvider>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
