"use client";

import { MoonIcon, SunIcon } from '@phosphor-icons/react';

import cx from 'clsx';

import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/theming/Theming.demo.colorSchemeControl.module.css';

function Demo() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      <SunIcon className={cx(classes.icon, classes.light)} />
      <MoonIcon className={cx(classes.icon, classes.dark)} />
    </ActionIcon>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
