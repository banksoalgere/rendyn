"use client";

import { Button, MantineThemeProvider } from '@mantine/core';

function Demo() {
  return (
    <MantineThemeProvider theme={{ activeClassName: '' }}>
      <Button>No active styles</Button>
    </MantineThemeProvider>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
