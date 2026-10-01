"use client";

import { BulletChart } from '@mantine/charts';

import { ranges, rangesCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/BulletChart/_data';

function Demo() {
  return (
    <BulletChart
      value={230000}
      target={150000}
      ranges={ranges}
      withTooltip
      valueFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
