"use client";

import { RadarChart } from '@mantine/charts';

import { multiData, multiDataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/RadarChart/_data';

function Demo() {
  return (
    <RadarChart
      h={300}
      data={multiData}
      dataKey="product"
      withPolarRadiusAxis
      withLegend
      series={[
        { name: 'Sales January', color: 'blue.6', opacity: 0.2 },
        { name: 'Sales February', color: 'orange.6', opacity: 0.2 },
      ]}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
