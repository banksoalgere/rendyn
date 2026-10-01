"use client";

import { GaugeChart } from '@mantine/charts';

import { Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <GaugeChart value={72} thickness={6} size={160} />
      <GaugeChart value={72} thickness={20} size={160} />
    </Group>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
