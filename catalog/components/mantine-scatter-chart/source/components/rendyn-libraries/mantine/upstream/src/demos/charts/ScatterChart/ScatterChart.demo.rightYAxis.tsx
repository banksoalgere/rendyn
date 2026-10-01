"use client";

import { ScatterChart } from '@mantine/charts';

import { biaxialData, biaxialDataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/ScatterChart/_data';

function Demo() {
  return (
    <ScatterChart
      h={350}
      data={biaxialData}
      dataKey={{ x: 'month', y: 'value' }}
      withLegend
      withRightYAxis
      xAxisLabel="Month"
      yAxisLabel="Revenue"
      rightYAxisLabel="Conversion rate"
      rightYAxisProps={{ unit: '%' }}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
