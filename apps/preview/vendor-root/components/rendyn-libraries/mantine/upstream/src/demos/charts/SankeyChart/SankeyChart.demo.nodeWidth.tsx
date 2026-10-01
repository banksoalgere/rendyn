"use client";

import { SankeyChart } from '@mantine/charts';

import { data, dataCode } from '@/components/rendyn-libraries/mantine/upstream/src/demos/charts/SankeyChart/_data';

function Demo() {
  return <SankeyChart data={data} nodeWidth={20} nodePadding={20} />;
}
const RendynExampleComponent = Demo;
export function RendynExample() { return <RendynExampleComponent  />; }
