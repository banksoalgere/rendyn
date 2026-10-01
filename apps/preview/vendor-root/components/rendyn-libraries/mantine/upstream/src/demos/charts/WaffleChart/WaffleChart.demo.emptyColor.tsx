"use client";

import { WaffleChart } from '@mantine/charts';

function Demo() {
  return (
    <WaffleChart
      data={[{ name: 'Completed', value: 68, color: 'teal' }]}
      total={100}
      emptyColor="gray.3"
    />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
