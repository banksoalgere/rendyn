"use client";

import { HeartIcon } from '@phosphor-icons/react';

import { ActionIcon } from '@mantine/core';

import classes from '@/components/rendyn-libraries/mantine/upstream/src/demos/core/ActionIcon/ActionIcon.demo.disabledStyles.module.css';

function Demo() {
  return (
    <ActionIcon size="xl" className={classes.button} disabled aria-label="Disabled with styles">
      <HeartIcon />
    </ActionIcon>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
