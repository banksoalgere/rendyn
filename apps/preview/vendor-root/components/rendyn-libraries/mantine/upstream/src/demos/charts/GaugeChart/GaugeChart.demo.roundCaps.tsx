"use client";

import { GaugeChart } from '@mantine/charts';

import { Group } from '@mantine/core';

function Demo() {
  return (
    <Group>
      <GaugeChart value={72} roundCaps size={160} />
      <GaugeChart value={72} roundCaps={false} size={160} />
      <GaugeChart
        value={72}
        roundCaps
        size={160}
        sections={[
          { value: 60, color: 'teal' },
          { value: 80, color: 'yellow' },
          { value: 100, color: 'red' },
        ]}
      />
    </Group>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
