"use client";

import { PieChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/PieChart/_data';

function Demo() {
  return (
    <PieChart data={data} withLabelsLine labelsPosition="outside" labelsType="name" withLabels />
  );
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
