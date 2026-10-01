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
      brushProps={{ startIndex: 3, endIndex: 10, height: 30 }}
      series={[{ name: 'Apples', color: 'indigo.6' }]}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
