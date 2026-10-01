"use client";

import { HeartIcon } from '@phosphor-icons/react';

import { ActionIcon, createTheme, Group, MantineThemeProvider } from '@mantine/core';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/ActionIcon/ActionIcon.demo.customSize.module.css';

const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: classes,
    }),
  },
});

function Demo() {
  return (
    <MantineThemeProvider theme={theme}>
      <Group justify="center">
        <ActionIcon size="xxs" aria-label="Custom xxs size">
          <HeartIcon size={10} />
        </ActionIcon>

        <ActionIcon size="xxl" aria-label="Custom xxl size">
          <HeartIcon size={32} />
        </ActionIcon>
      </Group>
    </MantineThemeProvider>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
