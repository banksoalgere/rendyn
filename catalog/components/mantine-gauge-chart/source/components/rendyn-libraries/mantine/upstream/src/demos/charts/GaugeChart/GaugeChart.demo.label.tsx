"use client";

import { GaugeChart } from '@mantine/charts';

import { Text } from '@mantine/core';

function Demo() {
  return (
    <GaugeChart
      value={72}
      label={
        <div>
          <Text ta="center" fz="xl" fw={700}>
            72%
          </Text>
          <Text ta="center" fz="xs" c="dimmed">
            CPU Usage
          </Text>
        </div>
      }
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
