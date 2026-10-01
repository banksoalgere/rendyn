"use client";

import { CandlestickChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/CandlestickChart/_data';

function Demo() {
  return (
    <CandlestickChart
      h={300}
      data={data}
      dataKey="date"
      referenceLines={[
        { y: 160, label: 'Resistance', color: 'red.6' },
        { y: 128, label: 'Support', color: 'teal.6' },
      ]}
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
