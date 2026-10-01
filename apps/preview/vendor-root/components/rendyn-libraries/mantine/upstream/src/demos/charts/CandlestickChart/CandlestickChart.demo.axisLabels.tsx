"use client";

import { CandlestickChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/CandlestickChart/_data';

function Demo() {
  return (
    <CandlestickChart h={300} data={data} dataKey="date" xAxisLabel="Date" yAxisLabel="Price" />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
