"use client";

import { createTheme, Input, MantineThemeProvider, NativeSelect, TextInput } from '@mantine/core';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/Input/Input.demo.sharedStyles.module.css';

const theme = createTheme({
  components: {
    Input: Input.extend({
      classNames: {
        input: classes.input,
      },
    }),

    InputWrapper: Input.Wrapper.extend({
      classNames: {
        label: classes.label,
      },
    }),
  },
});

function Demo() {
  return (
    <MantineThemeProvider theme={theme}>
      <TextInput label="Text input" placeholder="Text input" />
      <NativeSelect mt="md" label="Native select" data={['React', 'Angular', 'Vue', 'Svelte']} />
    </MantineThemeProvider>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
