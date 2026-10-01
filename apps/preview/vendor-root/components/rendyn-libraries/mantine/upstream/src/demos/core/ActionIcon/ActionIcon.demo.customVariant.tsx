"use client";

import { HeartIcon } from '@phosphor-icons/react';

import { ActionIcon, createTheme, Group, MantineThemeProvider } from '@mantine/core';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/ActionIcon/ActionIcon.demo.customVariant.module.css';

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
        <ActionIcon size="xl" variant="danger" aria-label="Danger variant">
          <HeartIcon />
        </ActionIcon>
        <ActionIcon size="xl" variant="primary" aria-label="Primary variant">
          <HeartIcon />
        </ActionIcon>
      </Group>
    </MantineThemeProvider>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
