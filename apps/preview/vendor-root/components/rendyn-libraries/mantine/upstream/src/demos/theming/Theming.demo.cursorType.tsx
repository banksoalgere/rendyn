"use client";

import { Checkbox, createTheme, MantineThemeProvider } from '@mantine/core';

const theme = createTheme({
  cursorType: 'pointer',
});

function Demo() {
  return (
    <>
      <Checkbox label="Default cursor" />

      <MantineThemeProvider theme={theme}>
        <Checkbox
          label="Pointer cursor"
          mt="md"
          styles={{ input: { cursor: 'pointer' }, label: { cursor: 'pointer' } }}
        />
      </MantineThemeProvider>
    </>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
