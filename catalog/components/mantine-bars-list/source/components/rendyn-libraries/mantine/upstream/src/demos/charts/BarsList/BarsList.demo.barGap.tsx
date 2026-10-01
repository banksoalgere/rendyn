"use client";

import { BarsList } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/BarsList/_data';

function Demo() {
  return (
    <BarsList data={data} barGap="xl" valueFormatter={(value) => value.toLocaleString('en-US')} />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
