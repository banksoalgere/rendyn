"use client";

import { BulletChart } from '@mantine/charts';

import { Stack } from '@mantine/core';

import { ranges, rangesCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/BulletChart/_data';

function Demo() {
  return (
    <Stack>
      <BulletChart
        value={230000}
        target={150000}
        ranges={ranges}
        size={20}
        label="Small"
        valueFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
      />
      <BulletChart
        value={230000}
        target={150000}
        ranges={ranges}
        size={32}
        label="Default"
        valueFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
      />
      <BulletChart
        value={230000}
        target={150000}
        ranges={ranges}
        size={48}
        label="Large"
        valueFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
      />
    </Stack>
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
