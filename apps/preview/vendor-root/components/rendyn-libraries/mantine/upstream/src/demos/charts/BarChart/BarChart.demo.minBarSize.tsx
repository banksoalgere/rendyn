"use client";

import { BarChart } from '@mantine/charts';

import { zeroData, zeroDataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/BarChart/_data';

function Demo() {
  return (
    <BarChart
      h={300}
      data={zeroData}
      dataKey="month"
      minBarSize={10}
      series={[
        { name: 'Smartphones', color: 'violet.6' },
        { name: 'Laptops', color: 'blue.6' },
        { name: 'Tablets', color: 'teal.6' },
      ]}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
