"use client";

import { Button, createTheme, MantineThemeProvider } from '@mantine/core';

const theme = createTheme({
  defaultGradient: {
    from: 'orange',
    to: 'red',
    deg: 45,
  },
});

function Demo() {
  return (
    <MantineThemeProvider theme={theme}>
      <Button variant="gradient">Button with custom default gradient</Button>
    </MantineThemeProvider>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
