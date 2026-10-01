"use client";

import { AreaChart } from '@mantine/charts';

import { brushData, brushDataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/AreaChart/_data';

function Demo() {
  return (
    <AreaChart
      h={300}
      data={brushData}
      dataKey="date"
      withBrush
      series={[
        { name: 'Apples', color: 'indigo.6' },
        { name: 'Oranges', color: 'blue.6' },
      ]}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
