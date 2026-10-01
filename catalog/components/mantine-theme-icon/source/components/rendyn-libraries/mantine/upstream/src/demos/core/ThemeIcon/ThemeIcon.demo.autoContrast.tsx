"use client";

import { FingerprintIcon } from '@phosphor-icons/react';

import { Group, ThemeIcon } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <ThemeIcon size="lg" color="lime.4">
        <FingerprintIcon size={20} />
      </ThemeIcon>
      <ThemeIcon size="lg" color="lime.4" autoContrast>
        <FingerprintIcon size={20} />
      </ThemeIcon>
    </Group>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
