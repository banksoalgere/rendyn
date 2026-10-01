"use client";

import { HeartIcon } from '@phosphor-icons/react';

import { ActionIcon } from '@mantine/core';

function Demo() {
  return (
    <ActionIcon size={42} variant="default" aria-label="ActionIcon with size as a number">
      <HeartIcon size={24} />
    </ActionIcon>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
