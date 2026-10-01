"use client";

import { DonutChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/DonutChart/_data';

function Demo() {
  return <DonutChart data={data} chartLabel="Users by country" />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
