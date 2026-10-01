"use client";

import { MoonStarsIcon, SunIcon } from '@phosphor-icons/react';

import { Switch } from '@mantine/core';

function Demo() {
  return (
    <Switch
      size="md"
      color="dark.4"
      onLabel={<SunIcon size={16} color="var(--mantine-color-yellow-4)" />}
      offLabel={<MoonStarsIcon size={16} color="var(--mantine-color-blue-6)" />}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
